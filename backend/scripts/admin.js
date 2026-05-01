import { Command } from 'commander';
import chalk from 'chalk';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ora from 'ora';
import enquirer from 'enquirer';
import database from '../src/config/database.js';
import { User } from '../src/models/User.js';
import { Paper } from '../src/models/Paper.js';
import { Question } from '../src/models/Question.js';
import { University } from '../src/models/University.js';
import { Subject } from '../src/models/Subject.js';
import { UserRole } from '../src/utils/constants.js';

const { prompt } = enquirer;

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const program = new Command();

program
  .name('pyqdeck-admin')
  .description('Advanced administrative tools for PYQDeck')
  .version('1.1.0');

/**
 * Helper: Connect to DB with Spinner
 */
async function withDb(callback) {
  const spinner = ora('Connecting to database...').start();
  try {
    await database.connect();
    spinner.succeed('Connected to database');
    await callback(spinner);
  } catch (error) {
    spinner.fail(`Error: ${error.message}`);
    process.exit(1);
  } finally {
    await database.disconnect();
  }
}

/**
 * User Management
 */
const user = program
  .command('user')
  .description('Manage users and access control');

user
  .command('list')
  .description('List all registered users')
  .action(() =>
    withDb(async (spinner) => {
      spinner.start('Fetching users...');
      const users = await User.find().select('name email role clerkId').lean();
      spinner.stop();

      console.log(chalk.blue.bold('\n--- Registered Users ---'));
      if (users.length === 0) {
        console.log(chalk.yellow('No users found.'));
      } else {
        users.forEach((u) => {
          const roleColor =
            u.role === 'admin'
              ? chalk.red
              : u.role === 'editor'
                ? chalk.magenta
                : chalk.white;
          console.log(
            `${chalk.green(u.name.padEnd(20))} | ${u.email.padEnd(30)} | Role: ${roleColor(u.role.padEnd(7))} | ID: ${chalk.gray(u.clerkId)}`
          );
        });
      }
      console.log();
    })
  );

user
  .command('set-role')
  .description('Set user role interactively')
  .argument('[email]', 'User email (optional, will prompt if missing)')
  .action(async (emailArg) => {
    let email = emailArg;

    if (!email) {
      const response = await prompt({
        type: 'input',
        name: 'email',
        message: 'Enter user email:',
      });
      email = response.email;
    }

    const { role } = await prompt({
      type: 'select',
      name: 'role',
      message: `Select role for ${email}:`,
      choices: Object.values(UserRole),
    });

    await withDb(async (spinner) => {
      spinner.start(`Updating ${email} to ${role}...`);
      const result = await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        { role },
        { new: true }
      );

      if (!result) {
        spinner.fail(`User ${email} not found.`);
      } else {
        spinner.succeed(`${result.name}'s role is now ${chalk.bold(role)}`);
      }
    });
  });

/**
 * Database Management
 */
const db = program
  .command('db')
  .description('Database operations (seed, status)');

db.command('stats')
  .description('Show database collection statistics')
  .action(() =>
    withDb(async (spinner) => {
      spinner.start('Calculating statistics...');
      const [userCount, paperCount, questionCount, uniCount, subjectCount] =
        await Promise.all([
          User.countDocuments(),
          Paper.countDocuments(),
          Question.countDocuments(),
          University.countDocuments(),
          Subject.countDocuments(),
        ]);
      spinner.stop();

      console.log(chalk.cyan.bold('\n--- System Statistics ---'));
      console.log(`Users:       ${chalk.yellow(userCount)}`);
      console.log(`Universities:${chalk.yellow(uniCount)}`);
      console.log(`Subjects:    ${chalk.yellow(subjectCount)}`);
      console.log(`Papers:      ${chalk.yellow(paperCount)}`);
      console.log(`Questions:   ${chalk.yellow(questionCount)}`);
      console.log();
    })
  );

db.command('seed')
  .description('Seed database with initial data (Universities, Subjects)')
  .action(() =>
    withDb(async (spinner) => {
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
        await Subject.findOneAndUpdate({ slug: sub.slug }, sub, {
          upsert: true,
        });
      }

      spinner.succeed('Database seeded with basic data.');
    })
  );

/**
 * System Check
 */
program
  .command('check-env')
  .description('Verify environment variables')
  .action(() => {
    const required = [
      'MONGODB_URI',
      'CLERK_SECRET_KEY',
      'CLERK_PUBLISHABLE_KEY',
      'UPLOADTHING_TOKEN',
      'RESEND_API_KEY',
    ];

    console.log(chalk.blue.bold('\n--- Environment Check ---'));
    let missing = 0;

    required.forEach((key) => {
      if (process.env[key]) {
        console.log(
          `${chalk.green('✔')} ${key.padEnd(25)}: ${chalk.gray('Configured')}`
        );
      } else {
        console.log(
          `${chalk.red('✘')} ${key.padEnd(25)}: ${chalk.bold.red('MISSING')}`
        );
        missing++;
      }
    });

    if (missing === 0) {
      console.log(
        chalk.green('\nAll essential environment variables are set! 🚀\n')
      );
    } else {
      console.log(
        chalk.yellow(
          `\nWarning: ${missing} variables are missing. Some features may not work.\n`
        )
      );
    }
  });

program.parse();
