import searchService from '../services/searchService.js';
import { successFormatter } from '../utils/index.js';

/**
 * GET /api/v1/search
 * Unified search across questions, subjects, and papers.
 */
export async function unifiedSearch(req, res, next) {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json(successFormatter.formatSuccess({}, 'No query provided'));
    }

    const results = await searchService.unifiedSearch(q, req.pagination);
    res.json(successFormatter.formatSuccess(results, 'Search results fetched'));
  } catch (error) {
    next(error);
  }
}
