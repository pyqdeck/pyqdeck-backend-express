import { clerkClient } from '@clerk/express';
import userRepository from '../repositories/userRepository.js';
import { NotFoundError } from '../utils/errors/index.js';
import { loggerService } from '../utils/index.js';

const logger = loggerService.getLogger();

export async function syncUser(req, res, next) {
  const { userId } = req.auth ?? {};
  if (!userId) return next();

  try {
    let user;
    try {
      user = await userRepository.findByClerkId(userId);
    } catch (err) {
      if (!(err instanceof NotFoundError)) throw err;

      const clerkUser = await clerkClient.users.getUser(userId);
      const primaryEmail = clerkUser.emailAddresses.find(
        (e) => e.id === clerkUser.primaryEmailAddressId
      )?.emailAddress;
      const name =
        [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') ||
        primaryEmail ||
        'Unknown';

      user = await userRepository.create({ clerkId: userId, name, email: primaryEmail });
      logger.info('User provisioned on-demand', { clerkId: userId });
    }

    req.dbUser = user;
  } catch (err) {
    logger.error('Failed to sync user', { clerkId: userId, error: err.message });
  }

  next();
}
