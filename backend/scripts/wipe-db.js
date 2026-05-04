import mongoose from 'mongoose';
import chalk from 'chalk';
import readline from 'readline';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import database from '../src/config/database.js';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function wipeDatabase() {
  console.log(chalk.red.bold('\n⚠️  DANGER ZONE: TOTAL DATABASE WIPE ⚠️'));
  console.log(
    chalk.red(
      'This will delete ALL collections (including users) from your database.'
    )
  );
  console.log(chalk.yellow(`Target DB: ${process.env.MONGODB_URI}\n`));

  rl.question(
    chalk.bold('Type "WIPE" to confirm deletion: '),
    async (confirm) => {
      if (confirm !== 'WIPE') {
        console.log(chalk.gray('Operation cancelled. No data was deleted.'));
        process.exit(0);
      }

      try {
        console.log(chalk.cyan('\nConnecting to database...'));
        await database.connect();

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();

        if (collections.length === 0) {
          console.log(chalk.yellow('Database is already empty.'));
        } else {
          for (const col of collections) {
            console.log(chalk.gray(`Dropping collection: ${col.name}`));
            await db.collection(col.name).drop();
          }
          console.log(
            chalk.green.bold('\nSuccess! All collections dropped. ✨')
          );
        }
      } catch (error) {
        console.error(chalk.red(`\n❌ Error: ${error.message}`));
      } finally {
        await database.disconnect();
        rl.close();
        process.exit(0);
      }
    }
  );
}

wipeDatabase();
