import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import database from '../src/config/database.js';
import { User } from '../src/models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function fixUser() {
  try {
    await database.connect();

    // Delete the corrupted user with the wrong clerkId
    await User.deleteOne({ email: 'raiyanhasan2006@gmail.com' });
    console.log(
      'Deleted old raiyanhasan2006@gmail.com profile to clear unique constraints.'
    );
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await database.disconnect();
    process.exit(0);
  }
}

fixUser();
