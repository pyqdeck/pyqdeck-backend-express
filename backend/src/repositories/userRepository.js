import { User } from '../models/User.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';

class UserRepository {
  async create(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'User with this email or Clerk ID already exists'
        );
      }
      throw error;
    }
  }

  async findById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async findByClerkId(clerkId) {
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async update(clerkId, updateData) {
    const user = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async existsByEmail(email) {
    const count = await User.countDocuments({ email });
    return count > 0;
  }

  async existsByClerkId(clerkId) {
    const count = await User.countDocuments({ clerkId });
    return count > 0;
  }
}

export const userRepository = new UserRepository();
export default userRepository;
