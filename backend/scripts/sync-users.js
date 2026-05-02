import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import dns from 'dns';
import database from '../src/config/database.js';
import { User } from '../src/models/User.js';

dns.setDefaultResultOrder('ipv4first');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

function fetchClerkUsers(secretKey) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.clerk.com',
      path: '/v1/users?limit=100',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(
            new Error(`Clerk API returned status ${res.statusCode}: ${data}`)
          );
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

async function syncClerkUsers() {
  console.log('🔄 Starting Clerk to MongoDB User Sync...');

  const clerkSecretKey = process.env.CLERK_SECRET_KEY;
  if (!clerkSecretKey) {
    console.error('❌ CLERK_SECRET_KEY is missing in .env file');
    process.exit(1);
  }

  try {
    // 1. Fetch Users from Clerk REST API
    console.log('📡 Fetching users from Clerk...');
    const clerkUsers = await fetchClerkUsers(clerkSecretKey);
    console.log(`✅ Found ${clerkUsers.length} users in Clerk.`);

    // 2. Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    await database.connect();

    // 3. Upsert each user
    let syncedCount = 0;
    for (const clerkUser of clerkUsers) {
      const primaryEmailObj =
        clerkUser.email_addresses.find(
          (email) => email.id === clerkUser.primary_email_address_id
        ) || clerkUser.email_addresses[0];

      if (!primaryEmailObj) {
        console.warn(
          `⚠️ Skipping user ${clerkUser.id} - No email address found.`
        );
        continue;
      }

      const email = primaryEmailObj.email_address;
      const name =
        [clerkUser.first_name, clerkUser.last_name].filter(Boolean).join(' ') ||
        email;

      await User.findOneAndUpdate(
        { clerkId: clerkUser.id },
        {
          clerkId: clerkUser.id,
          name: name,
          email: email,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`👤 Synced: ${email}`);
      syncedCount++;
    }

    console.log(
      `\n🎉 Successfully synced ${syncedCount} users to the database!`
    );
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
  } finally {
    await database.disconnect();
    process.exit(0);
  }
}

syncClerkUsers();
