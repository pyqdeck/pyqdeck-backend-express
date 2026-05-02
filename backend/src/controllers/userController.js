import { successFormatter } from '../utils/index.js';
import bookmarkRepository from '../repositories/bookmarkRepository.js';
import solutionRepository from '../repositories/solutionRepository.js';

/**
 * GET /api/v1/users/me
 */
export async function getMe(req, res, next) {
  try {
    const user = req.dbUser;

    // Fetch stats in parallel
    const [bookmarks, solutions] = await Promise.all([
      bookmarkRepository.findByUser(user._id, { limit: 0, skip: 0 }),
      solutionRepository.findByAuthor(user._id, { limit: 0, skip: 0 }),
    ]);

    const stats = {
      bookmarksCount: bookmarks.total,
      solutionsCount: solutions.total,
    };

    res.json(
      successFormatter.formatSuccess({ user, stats }, 'User profile fetched')
    );
  } catch (error) {
    next(error);
  }
}
