import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import database from '../src/config/database.js';
import { User } from '../src/models/User.js';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

/**
 * Quick script to promote any user to Admin by email.
 * Usage: node scripts/promote-admin.js <email>
 */
async function promote() {
  const email = process.argv[2];

  if (!email) {
    console.log(chalk.red('Error: Please provide an email address.'));
    console.log(
      chalk.gray('Usage: node scripts/promote-admin.js user@example.com')
    );
    process.exit(1);
  }

  try {
    console.log(chalk.blue(`Connecting to database...`));
    await database.connect();

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log(chalk.red(`\nUser "${email}" not found.`));
      console.log(
        chalk.yellow(
          `IMPORTANT: The user must sign in to the website at least once first!`
        )
      );
      process.exit(1);
    }

    user.role = 'admin';
    await user.save();

    console.log(
      chalk.green(
        `\n✅ Success! ${user.name} (${email}) has been promoted to Admin.`
      )
    );
    console.log(chalk.cyan(`They can now access the Studio at /studio`));
  } catch (error) {
    console.error(chalk.red('Unexpected Error:'), error.message);
  } finally {
    await database.disconnect();
    process.exit(0);
  }
}

promote();
