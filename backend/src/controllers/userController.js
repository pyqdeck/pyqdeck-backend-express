import { successFormatter, catchAsync } from '../utils/index.js';
import userRepository from '../repositories/userRepository.js';
import { ForbiddenError } from '../utils/errors/index.js';
import { getAuth } from '@clerk/express';

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

/**
 * GET /api/v1/users
 */
export const listUsers = catchAsync(async (req, res) => {
  const { role, search, page = 1, limit = 10 } = req.query;
  const { userId: requesterClerkId } = getAuth(req);

  const result = await userRepository.list(
    { role, search },
    { page: parseInt(page), limit: parseInt(limit) }
  );

  // Inject isMe flag into each user record based on the authenticated session
  const itemsWithMe = result.items.map((item) => ({
    ...item,
    isMe: item.clerkId === requesterClerkId,
  }));

  res.json(
    successFormatter.formatSuccess(
      { ...result, items: itemsWithMe },
      'Users list fetched'
    )
  );
});

/**
 * PATCH /api/v1/users/:clerkId
 */
export const updateUser = catchAsync(async (req, res) => {
  const { clerkId } = req.params;
  const { role } = req.body;
  const { userId: requesterClerkId } = getAuth(req);

  // Prevent users from changing their own role (self-demotion)
  if (clerkId === requesterClerkId && role) {
    throw new ForbiddenError(
      'You cannot change your own role to prevent administrative lockout.'
    );
  }

  const user = await userRepository.update(clerkId, { role });

  res.json(
    successFormatter.formatSuccess({ user }, 'User updated successfully')
  );
});
