import bookmarkService from '../services/bookmarkService.js';
import { successFormatter } from '../utils/index.js';

/**
 * GET /api/v1/bookmarks
 */
export async function listMine(req, res, next) {
  try {
    const { items, total } = await bookmarkService.listMine(
      req.dbUser._id,
      req.pagination,
      req.query.type
    );
    res.json(
      successFormatter.formatList(
        items,
        total,
        req.pagination.page,
        req.pagination.limit,
        'Bookmarks fetched'
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/bookmarks/toggle
 */
export async function toggle(req, res, next) {
  try {
    const result = await bookmarkService.toggle(req.dbUser._id, req.body);
    const message = result.bookmarked ? 'Bookmark added' : 'Bookmark removed';
    res.json(successFormatter.formatSuccess(result, message));
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/v1/bookmarks/:id
 */
export async function remove(req, res, next) {
  try {
    await bookmarkService.remove(req.params.id, req.dbUser._id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
