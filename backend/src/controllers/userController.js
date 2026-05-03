import { successFormatter, catchAsync } from '../utils/index.js';
import userRepository from '../repositories/userRepository.js';

/**
 * GET /api/v1/users/me
 */
export const getMe = catchAsync(async (req, res, next) => {
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
});
