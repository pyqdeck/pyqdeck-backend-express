import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/pyqdeck';

async function checkCollections() {
  try {
    await mongoose.connect(MONGODB_URI);
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log('Collections in DB:');
    collections.forEach((c) => console.log(` - ${c.name}`));
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkCollections();
