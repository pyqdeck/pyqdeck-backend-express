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

    let user;
    try {
      user = await userRepository.findByClerkId(userId);
    } catch (err) {
      if (!(err instanceof NotFoundError)) throw err;

      // Use the native https fetch to bypass Node 20 fetch bugs
      const clerkUser = await fetchClerkUser(userId);

      const primaryEmail =
        clerkUser.email_addresses?.find(
          (e) => e.id === clerkUser.primary_email_address_id
        )?.email_address || clerkUser.email_addresses?.[0]?.email_address;

      const name =
        [clerkUser.first_name, clerkUser.last_name].filter(Boolean).join(' ') ||
        primaryEmail ||
        'Unknown';

      user = await userRepository.create({
        clerkId: userId,
        name,
        email: primaryEmail,
      });
      logger.info('User provisioned on-demand', { clerkId: userId });
    }

    req.dbUser = user;
    next();
  } catch (err) {
    logger.error('Failed to sync user', {
      error: err.message,
      stack: err.stack,
    });
    // For non-critical failures in sync, we might want to continue
    // but the report suggested propagating errors.
    // If it's a getAuth error, we should definitely know.
    next(err);
  }
}
