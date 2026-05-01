import { Command } from 'commander';
import chalk from 'chalk';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import ora from 'ora';
import enquirer from 'enquirer';
import Table from 'cli-table3';
import database from '../src/config/database.js';
import { User } from '../src/models/User.js';
import { Paper } from '../src/models/Paper.js';
import { Question } from '../src/models/Question.js';
import { University } from '../src/models/University.js';
import { Subject } from '../src/models/Subject.js';
import { Upload } from '../src/models/Upload.js';
import { Bookmark } from '../src/models/Bookmark.js';
import { Branch } from '../src/models/Branch.js';
import { Module } from '../src/models/Module.js';
import { QuestionPaperMap } from '../src/models/QuestionPaperMap.js';
import { QuestionSyllabusMap } from '../src/models/QuestionSyllabusMap.js';
import { Semester } from '../src/models/Semester.js';
import { Solution } from '../src/models/Solution.js';
import { SubjectOffering } from '../src/models/SubjectOffering.js';
import { Syllabus } from '../src/models/Syllabus.js';
import { Tag } from '../src/models/Tag.js';
import { Topic } from '../src/models/Topic.js';
import { UserRole } from '../src/utils/constants.js';

const { Select, AutoComplete, Confirm, Input } = enquirer;

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const program = new Command();

program
  .name('pyqdeck-admin')
  .description('Pro-level administrative tools for PYQDeck')
  .version('1.2.0');

/**
 * Helper: Connect to DB with Spinner
 */
async function withDb(callback) {
  const spinner = ora('Connecting to database...').start();
  try {
    await database.connect();
    spinner.succeed('Connected to database');
    return await callback(spinner);
  } catch (error) {
    spinner.fail(`Error: ${error.message}`);
    process.exit(1);
  } finally {
    await database.disconnect();
  }
}

/**
 * Interactive Main Menu
 */
async function mainMenu() {
  console.log(chalk.blue.bold('\n🚀 PYQDeck Control Center'));

  const prompt = new Select({
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      { name: 'users', message: '👤 Manage Users' },
      { name: 'stats', message: '📊 View Statistics' },
      { name: 'insights', message: '🔬 Aggregation Insights' },
      { name: 'seed', message: '🌱 Seed Initial Data' },
      { name: 'clean', message: chalk.red('☢️  Clean Database (Wipe All)') },
      { name: 'env', message: '🔑 Check Environment' },
      { name: 'logs', message: '📋 View System Logs' },
      { name: 'exit', message: '❌ Exit' },
    ],
  });

  const choice = await prompt.run();

  switch (choice) {
    case 'users':
      await manageUsersInteractive();
      break;
    case 'stats':
      await showStats();
      break;
    case 'insights':
      await showInsights();
      break;
    case 'seed':
      await seedData();
      break;
    case 'clean':
      await cleanDatabase();
      break;
    case 'env':
      checkEnv();
      break;
    case 'logs':
      await manageLogs();
      break;
    case 'exit':
      console.log(chalk.gray('Goodbye!'));
      process.exit(0);
  }

  // Return to main menu after action (except exit)
  await mainMenu();
}

/**
 * User Management - Interactive
 */
async function manageUsersInteractive() {
  await withDb(async (spinner) => {
    spinner.start('Fetching users...');
    const users = await User.find().select('name email role isActive').lean();
    spinner.stop();

    if (users.length === 0) {
      console.log(chalk.yellow('No users found in database.'));
      return;
    }

    const userPrompt = new AutoComplete({
      name: 'user',
      message: 'Search/Pick a user to manage:',
      limit: 10,
      choices: users.map((u) => ({
        name: u.email,
        message: `${chalk.bold(u.name)} (${u.email}) [${u.role}]`,
        value: u,
      })),
    });

    const selectedEmail = await userPrompt.run();
    const selectedUser = users.find((u) => u.email === selectedEmail);

    const actionPrompt = new Select({
      name: 'action',
      message: `Manage ${chalk.bold(selectedUser.name)}:`,
      choices: [
        { name: 'set-role', message: '🔑 Change Role' },
        {
          name: 'toggle-status',
          message: selectedUser.isActive ? '🚫 Deactivate' : '✅ Activate',
        },
        { name: 'back', message: '⬅️ Back to list' },
      ],
    });

    const action = await actionPrompt.run();

    if (action === 'set-role') {
      const { role } = await new Select({
        name: 'role',
        message: 'Select new role:',
        choices: Object.values(UserRole),
      }).run();

      spinner.start(`Updating role to ${role}...`);
      await User.updateOne({ email: selectedEmail }, { role });
      spinner.succeed(`Role updated to ${role}`);
    } else if (action === 'toggle-status') {
      const newStatus = !selectedUser.isActive;
      spinner.start(`${newStatus ? 'Activating' : 'Deactivating'} user...`);
      await User.updateOne({ email: selectedEmail }, { isActive: newStatus });
      spinner.succeed(`User ${newStatus ? 'activated' : 'deactivated'}`);
    }
  });
}

/**
 * Stats - Beautiful Table
 */
async function showStats() {
  await withDb(async (spinner) => {
    spinner.start('Calculating stats...');
    const [userCount, paperCount, questionCount, uniCount, subjectCount] =
      await Promise.all([
        User.countDocuments(),
        Paper.countDocuments(),
        Question.countDocuments(),
        University.countDocuments(),
        Subject.countDocuments(),
      ]);
    spinner.stop();

    const table = new Table({
      head: [chalk.cyan('Collection'), chalk.cyan('Count')],
      colWidths: [20, 10],
    });

    table.push(
      ['Users', userCount],
      ['Universities', uniCount],
      ['Subjects', subjectCount],
      ['Papers', paperCount],
      ['Questions', questionCount]
    );

    console.log(chalk.bold('\n--- System Overview ---'));
    console.log(table.toString());
    console.log();
  });
}

/**
 * Seeding Data
 */
async function seedData() {
  const confirm = await new Confirm({
    message:
      'Are you sure you want to seed initial data? (Will update existing)',
  }).run();

  if (!confirm) return;

  await withDb(async (spinner) => {
    spinner.start('Seeding Universities...');
    const unis = [
      {
        name: 'Chhattisgarh Swami Vivekanand Technical University',
        shortName: 'CSVTU',
        slug: 'csvtu',
        state: 'Chhattisgarh',
      },
      {
        name: 'Indian Institute of Technology Bombay',
        shortName: 'IITB',
        slug: 'iit-bombay',
        state: 'Maharashtra',
      },
    ];

    for (const uni of unis) {
      await University.findOneAndUpdate({ slug: uni.slug }, uni, {
        upsert: true,
      });
    }

    spinner.start('Seeding Subjects...');
    const subjects = [
      {
        name: 'Compiler Design',
        shortName: 'CD',
        slug: 'compiler-design',
        subjectCode: 'CS101',
      },
      {
        name: 'Operating Systems',
        shortName: 'OS',
        slug: 'operating-systems',
        subjectCode: 'CS102',
      },
      {
        name: 'Computer Networks',
        shortName: 'CN',
        slug: 'computer-networks',
        subjectCode: 'CS103',
      },
    ];

    for (const sub of subjects) {
      await Subject.findOneAndUpdate({ slug: sub.slug }, sub, { upsert: true });
    }

    spinner.succeed('Database seeded successfully!');
  });
}

/**
 * System Cleanup Logic
 */
async function cleanDatabase() {
  const models = {
    User,
    Paper,
    Question,
    University,
    Subject,
    Upload,
    Bookmark,
    Branch,
    Module,
    QuestionPaperMap,
    QuestionSyllabusMap,
    Semester,
    Solution,
    SubjectOffering,
    Syllabus,
    Tag,
    Topic,
  };

  console.log(chalk.red.bold('\n⚠️  DANGER ZONE: DATABASE WIPE ⚠️'));
  console.log(chalk.red('This will delete EVERYTHING from:'));
  Object.keys(models).forEach((m) => console.log(` - ${m}s`));

  const confirm = await new Confirm({
    message: chalk.red('Are you absolutely sure you want to proceed?'),
    default: false,
  }).run();

  if (!confirm) {
    console.log(chalk.gray('Operation cancelled.'));
    return;
  }

  const finalConfirm = await new Input({
    message: `Type ${chalk.bold('WIPE')} to confirm:`,
  }).run();

  if (finalConfirm !== 'WIPE') {
    console.log(chalk.gray('Confirmation failed. Nothing was deleted.'));
    return;
  }

  await withDb(async (spinner) => {
    for (const [name, model] of Object.entries(models)) {
      spinner.start(`Clearing ${name}s...`);
      await model.deleteMany({});
    }
    spinner.succeed(chalk.green('Database is now empty. ✨'));
  });
}

/**
 * Check Env
 */
function checkEnv() {
  const required = [
    'MONGODB_URI',
    'CLERK_SECRET_KEY',
    'CLERK_PUBLISHABLE_KEY',
    'UPLOADTHING_TOKEN',
    'RESEND_API_KEY',
  ];

  const table = new Table({
    head: [chalk.cyan('Variable'), chalk.cyan('Status')],
  });

  required.forEach((key) => {
    const isSet = !!process.env[key];
    table.push([
      key,
      isSet ? chalk.green('✔ Configured') : chalk.red('✘ MISSING'),
    ]);
  });

  console.log(chalk.bold('\n--- Environment Status ---'));
  console.log(table.toString());
  console.log();
}

/**
 * Aggregation-powered Insights
 */
async function showInsights() {
  const insightPrompt = new Select({
    name: 'report',
    message: 'Which report would you like to see?',
    choices: [
      { name: 'roles', message: '👥 Users by Role' },
      { name: 'papers_by_year', message: '📅 Papers by Year' },
      { name: 'unsolved', message: '❓ Unsolved Questions' },
      { name: 'top_bookmarked', message: '⭐ Top Bookmarked Papers' },
      { name: 'back', message: '⬅️  Back' },
    ],
  });

  const report = await insightPrompt.run();
  if (report === 'back') return;

  await withDb(async (spinner) => {
    spinner.start('Running aggregation...');

    if (report === 'roles') {
      // --- Report 1: Count users grouped by role ---
      const results = await User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);
      spinner.stop();

      const table = new Table({
        head: [chalk.cyan('Role'), chalk.cyan('User Count')],
        colWidths: [15, 15],
      });
      results.forEach((r) => {
        const roleColor =
          r._id === 'admin'
            ? chalk.red
            : r._id === 'editor'
              ? chalk.magenta
              : chalk.white;
        table.push([roleColor(r._id), r.count]);
      });
      console.log(chalk.bold('\n👥 Users by Role'));
      console.log(table.toString());
    } else if (report === 'papers_by_year') {
      // --- Report 2: Count papers grouped by exam year ---
      const results = await Paper.aggregate([
        { $group: { _id: '$examYear', count: { $sum: 1 } } },
        { $sort: { _id: -1 } },
        { $limit: 10 },
      ]);
      spinner.stop();

      const table = new Table({
        head: [chalk.cyan('Year'), chalk.cyan('Papers')],
        colWidths: [10, 10],
      });
      results.forEach((r) => table.push([r._id ?? 'N/A', r.count]));
      console.log(chalk.bold('\n📅 Papers by Exam Year (Top 10)'));
      console.log(table.toString());
    } else if (report === 'unsolved') {
      // --- Report 3: Questions that have no Solution ---
      const results = await Question.aggregate([
        {
          $lookup: {
            from: 'solutions',
            localField: '_id',
            foreignField: 'questionId',
            as: 'solutions',
          },
        },
        { $match: { solutions: { $size: 0 } } },
        { $count: 'unsolved' },
      ]);
      spinner.stop();

      const count = results[0]?.unsolved ?? 0;
      const total = await Question.countDocuments();
      const pct = total > 0 ? ((count / total) * 100).toFixed(1) : 0;

      const table = new Table({
        head: [chalk.cyan('Metric'), chalk.cyan('Value')],
        colWidths: [25, 15],
      });
      table.push(
        ['Total Questions', total],
        ['Without Solution', chalk.red(count)],
        ['Coverage', chalk.green(`${100 - pct}%`)]
      );
      console.log(chalk.bold('\n❓ Question Solution Coverage'));
      console.log(table.toString());
    } else if (report === 'top_bookmarked') {
      // --- Report 4: Papers sorted by how many times they are bookmarked ---
      const results = await Bookmark.aggregate([
        { $match: { resourceType: 'Paper' } },
        { $group: { _id: '$resourceId', bookmarks: { $sum: 1 } } },
        { $sort: { bookmarks: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: 'papers',
            localField: '_id',
            foreignField: '_id',
            as: 'paper',
          },
        },
        { $unwind: '$paper' },
        {
          $project: {
            title: '$paper.title',
            year: '$paper.examYear',
            bookmarks: 1,
          },
        },
      ]);
      spinner.stop();

      const table = new Table({
        head: [chalk.cyan('Paper'), chalk.cyan('Year'), chalk.cyan('⭐')],
        colWidths: [40, 8, 8],
      });

      if (results.length === 0) {
        console.log(chalk.yellow('\nNo bookmarks found yet.'));
      } else {
        results.forEach((r) =>
          table.push([r.title ?? 'Unknown', r.year ?? '—', r.bookmarks])
        );
        console.log(chalk.bold('\n⭐ Top 5 Bookmarked Papers'));
        console.log(table.toString());
      }
    }
    console.log();
  });
}

/**
 * Log Viewer
 */
async function manageLogs() {
  const logDir = path.join(__dirname, '../logs');

  if (!fs.existsSync(logDir)) {
    console.log(
      chalk.yellow('\nNo logs directory found yet. Start the app first!')
    );
    return;
  }

  const files = fs
    .readdirSync(logDir)
    .filter((f) => f.endsWith('.log'))
    .sort()
    .reverse();

  if (files.length === 0) {
    console.log(chalk.yellow('\nNo log files found in logs/ directory.'));
    return;
  }

  const { file } = await new AutoComplete({
    name: 'file',
    message: 'Select a log file to view:',
    choices: files,
  }).run();

  const { action } = await new Select({
    name: 'action',
    message: `Actions for ${file}:`,
    choices: [
      { name: 'view', message: '📄 View last 50 lines' },
      { name: 'tail', message: '🕒 Tail (Real-time stream)' },
      { name: 'back', message: '⬅️ Back' },
    ],
  }).run();

  const filePath = path.join(logDir, file);

  if (action === 'view') {
    const content = fs.readFileSync(filePath, 'utf8').split('\n');
    const lastLines = content.slice(-50).join('\n');
    console.log(chalk.gray('\n--- Last 50 Lines ---'));
    console.log(lastLines);
    console.log(chalk.gray('--- End of File ---\n'));
  } else if (action === 'tail') {
    console.log(chalk.cyan(`\n👀 Tailing ${file}. Press Ctrl+C to stop...\n`));

    // Show last 10 lines first
    const content = fs.readFileSync(filePath, 'utf8').split('\n');
    console.log(content.slice(-10).join('\n'));

    let lastSize = fs.statSync(filePath).size;

    fs.watch(filePath, (event) => {
      if (event === 'change') {
        const currSize = fs.statSync(filePath).size;
        if (currSize > lastSize) {
          const buffer = Buffer.alloc(currSize - lastSize);
          const fd = fs.openSync(filePath, 'r');
          fs.readSync(fd, buffer, 0, currSize - lastSize, lastSize);
          fs.closeSync(fd);
          process.stdout.write(buffer.toString());
          lastSize = currSize;
        }
      }
    });

    // Keep process alive for watch
    await new Promise(() => {});
  }
}

/**
 * CLI Arguments Support (Legacy/CI)
 */
const userCmd = program.command('user').description('Manage users');
userCmd.command('list').action(() => showStats());

program
  .command('interactive')
  .description('Open interactive dashboard (Default)')
  .action(() => mainMenu());

// Default action: Open Main Menu
if (!process.argv.slice(2).length) {
  mainMenu();
} else {
  program.parse();
}
