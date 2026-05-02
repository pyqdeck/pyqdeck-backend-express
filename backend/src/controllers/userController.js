import { successFormatter } from '../utils/index.js';
import userRepository from '../repositories/userRepository.js';

/**
 * GET /api/v1/users/me
 */
export async function getMe(req, res, next) {
  try {
    const user = req.dbUser;

    if (!user) {
      return res.status(401).json({
        success: false,
        error: { message: 'User profile not synced yet', code: 'UNAUTHORIZED' },
      });
    }

    // Fetch stats via optimized aggregation
    const stats = await userRepository.getStats(user._id);

    res.json(
      successFormatter.formatSuccess({ user, stats }, 'User profile fetched')
    );
  } catch (error) {
    next(error);
  }
}
