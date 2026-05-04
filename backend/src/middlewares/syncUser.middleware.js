import https from 'https';
import userRepository from '../repositories/userRepository.js';
import { NotFoundError } from '../utils/errors/index.js';
import { loggerService } from '../utils/index.js';
import { getAuth } from '@clerk/express';

const logger = loggerService.getLogger();

function fetchClerkUser(userId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.clerk.com',
      path: `/v1/users/${userId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
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
          reject(new Error(`Clerk API returned ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

export async function syncUser(req, res, next) {
  try {
    const authState = getAuth(req);
    const userId = authState?.userId;

    if (!userId) return next();

    // 1. Performance check: If user is in DB, use them and move on
    let user = await userRepository.findByClerkId(userId).catch(() => null);

    if (user) {
      req.dbUser = user;
      return next();
    }

    // 2. User not found -> Fetch full profile from Clerk API
    // We use a manual fetch to bypass Node 20 IPv6 resolution issues with Clerk
    const clerkUser = await fetchClerkUser(userId);

    const primaryEmail =
      clerkUser.email_addresses?.find(
        (e) => e.id === clerkUser.primary_email_address_id
      )?.email_address || clerkUser.email_addresses?.[0]?.email_address;

    const name =
      [clerkUser.first_name, clerkUser.last_name].filter(Boolean).join(' ') ||
      primaryEmail ||
      'Unknown';

    // Role priority: Clerk Public Metadata > Default 'normal'
    // This allows you to set roles via Clerk Dashboard if you want,
    // but defaults to normal for new web users.
    const initialRole = clerkUser.public_metadata?.role || 'normal';

    user = await userRepository.upsertByClerkOrEmail(userId, {
      clerkId: userId,
      name,
      email: primaryEmail,
      avatarUrl: clerkUser.image_url,
      role: initialRole,
    });

    logger.info('User provisioned from Clerk session', {
      clerkId: userId,
      email: primaryEmail,
      role: initialRole,
    });

    req.dbUser = user;
    next();
  } catch (err) {
    logger.error('Failed to sync user from Clerk', {
      userId: getAuth(req)?.userId,
      error: err.message,
    });
    next(err);
  }
}
