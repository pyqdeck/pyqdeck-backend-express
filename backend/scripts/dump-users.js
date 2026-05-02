import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import database from '../src/config/database.js';
import { User } from '../src/models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function dumpUsers() {
  try {
    await database.connect();
    const users = await User.find({}, 'email clerkId role').lean();
    console.log('=== USERS IN DB ===');
    console.table(users);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await database.disconnect();
    process.exit(0);
  }
}

dumpUsers();
