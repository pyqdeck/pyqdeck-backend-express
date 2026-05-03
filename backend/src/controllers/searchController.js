import searchService from '../services/searchService.js';
import { successFormatter, catchAsync } from '../utils/index.js';

/**
 * GET /api/v1/search
 * Unified search across questions, subjects, and papers.
 */
export const unifiedSearch = catchAsync(async (req, res, next) => {
  const { q } = req.query;
  if (!q) {
    return res.json(successFormatter.formatSuccess({}, 'No query provided'));
  }

  const results = await searchService.unifiedSearch(q, req.pagination);
  res.json(successFormatter.formatSuccess(results, 'Search results fetched'));
});
