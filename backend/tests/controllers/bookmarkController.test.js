import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as bookmarkController from '../../src/controllers/bookmarkController.js';
import bookmarkService from '../../src/services/bookmarkService.js';

vi.mock('../../src/services/bookmarkService.js', () => ({
  default: {
    listMine: vi.fn(),
    toggle: vi.fn(),
    remove: vi.fn(),
  },
}));

describe('bookmarkController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      query: {},
      params: {},
      body: {},
      dbUser: { _id: 'user_1' },
      pagination: { page: 1, limit: 10 },
    };
    res = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  describe('listMine', () => {
    it('should return bookmarks for current user', async () => {
      bookmarkService.listMine.mockResolvedValue({ items: [], total: 0 });
      await bookmarkController.listMine(req, res, next);
      expect(bookmarkService.listMine).toHaveBeenCalledWith(
        'user_1',
        req.pagination,
        undefined
      );
      expect(res.json).toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      bookmarkService.listMine.mockRejectedValue(new Error('err'));
      await bookmarkController.listMine(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('toggle', () => {
    it('should call toggle service', async () => {
      req.body = { targetId: 't1', targetType: 'question' };
      bookmarkService.toggle.mockResolvedValue({ bookmarked: true });
      await bookmarkController.toggle(req, res, next);
      expect(bookmarkService.toggle).toHaveBeenCalledWith('user_1', req.body);
      expect(res.json).toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      bookmarkService.toggle.mockRejectedValue(new Error('err'));
      await bookmarkController.toggle(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('remove', () => {
    it('should call remove service', async () => {
      req.params.id = 'b1';
      bookmarkService.remove.mockResolvedValue({});
      await bookmarkController.remove(req, res, next);
      expect(bookmarkService.remove).toHaveBeenCalledWith('b1', 'user_1');
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it('should call next on error', async () => {
      bookmarkService.remove.mockRejectedValue(new Error('err'));
      await bookmarkController.remove(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
