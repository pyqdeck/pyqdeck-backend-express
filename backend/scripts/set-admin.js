import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import database from '../src/config/database.js';
import { User } from '../src/models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function setAdmin() {
  const email = 'raiyanhasan2006@gmail.com';

  try {
    await database.connect();

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User ${email} not found in the database.`);
      console.log(`\n🛑 IMPORTANT: You must sign in to the website first!`);
      console.log(`1. Go to http://localhost:3000/dashboard`);
      console.log(`2. Sign in with ${email}`);
      console.log(`3. This automatically creates your database profile.`);
      console.log(`4. Run this script again.`);
      process.exit(1);
    }

    user.role = 'admin';
    await user.save();

    console.log(`Success! User ${email} has been promoted to admin. 🚀`);
    console.log(`Refresh your dashboard to see the Admin layout!`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await database.disconnect();
    process.exit(0);
  }
}

setAdmin();
