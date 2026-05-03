import database from './src/config/database.js';
import { User } from './src/models/User.js';

async function check() {
  await database.connect();
  const users = await User.find({});
  console.log(`Total users in DB: ${users.length}`);
  console.log(
    users.map((u) => ({
      email: u.email,
      isActive: u.isActive,
      clerkId: u.clerkId,
    }))
  );
  process.exit(0);
}

check();
