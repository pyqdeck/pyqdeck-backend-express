import userRepository from '../repositories/userRepository.js';
import { NotFoundError } from '../utils/errors/index.js';
import { loggerService } from '../utils/index.js';

const logger = loggerService.getLogger();

class UserService {
  #extractUserData(data) {
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      primary_email_address_id,
      image_url,
    } = data;

    const email = email_addresses?.find(
      (e) => e.id === primary_email_address_id
    )?.email_address;

    const name =
      [first_name, last_name].filter(Boolean).join(' ') || email || 'Unknown';

    return {
      clerkId: id,
      name,
      email,
      avatarUrl: image_url || null,
    };
  }

  async handleUserCreated(data) {
    const userData = this.#extractUserData(data);
    const exists = await userRepository.existsByClerkId(userData.clerkId);

    if (exists) {
      logger.warn('User already exists, skipping create', {
        clerkId: userData.clerkId,
      });
      return;
    }

    return userRepository.create(userData);
  }

  async handleUserUpdated(data) {
    const { clerkId, name, email, avatarUrl } = this.#extractUserData(data);
    try {
      return await userRepository.update(clerkId, { name, email, avatarUrl });
    } catch (err) {
      if (err instanceof NotFoundError) {
        logger.warn('User not found on update, skipping', { clerkId });
        return;
      }
      throw err;
    }
  }

  async handleUserDeleted(data) {
    try {
      return await userRepository.update(data.id, { isActive: false });
    } catch (err) {
      if (err instanceof NotFoundError) {
        logger.warn('User not found on delete, skipping', { clerkId: data.id });
        return;
      }
      throw err;
    }
  }

  async listUsers(filter, pagination) {
    return userRepository.list(filter, pagination);
  }

  async getUserByClerkId(clerkId) {
    const [user, stats] = await Promise.all([
      userRepository.findByClerkId(clerkId),
      userRepository.getStats(clerkId),
    ]);
    return { user, stats };
  }
}

export const userService = new UserService();
export default userService;
