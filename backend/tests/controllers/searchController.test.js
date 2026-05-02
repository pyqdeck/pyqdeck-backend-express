import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as searchController from '../../src/controllers/searchController.js';
import searchService from '../../src/services/searchService.js';

vi.mock('../../src/services/searchService.js', () => ({
  default: {
    unifiedSearch: vi.fn(),
  },
}));

describe('searchController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      query: {},
      pagination: { page: 1, limit: 10 },
    };
    res = {
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  describe('unifiedSearch', () => {
    it('should return empty success if no query', async () => {
      await searchController.unifiedSearch(req, res, next);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'No query provided' })
      );
    });

    it('should call search service if query exists', async () => {
      req.query.q = 'calculus';
      searchService.unifiedSearch.mockResolvedValue({ questions: [] });
      await searchController.unifiedSearch(req, res, next);
      expect(searchService.unifiedSearch).toHaveBeenCalledWith(
        'calculus',
        req.pagination
      );
      expect(res.json).toHaveBeenCalled();
    });
  });
});
