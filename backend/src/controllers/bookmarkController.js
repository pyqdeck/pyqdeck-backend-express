import bookmarkService from '../services/bookmarkService.js';
import { successFormatter, catchAsync } from '../utils/index.js';

/**
 * GET /api/v1/bookmarks
 */
export const listMine = catchAsync(async (req, res, next) => {
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
});

/**
 * POST /api/v1/bookmarks/toggle
 */
export const toggle = catchAsync(async (req, res, next) => {
  const result = await bookmarkService.toggle(req.dbUser._id, req.body);
  const message = result.bookmarked ? 'Bookmark added' : 'Bookmark removed';
  res.json(successFormatter.formatSuccess(result, message));
});

/**
 * DELETE /api/v1/bookmarks/:id
 */
export const remove = catchAsync(async (req, res, next) => {
  await bookmarkService.remove(req.params.id, req.dbUser._id);
  res.status(204).send();
});
