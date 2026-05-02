import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as userController from '../../src/controllers/userController.js';
import bookmarkRepository from '../../src/repositories/bookmarkRepository.js';
import solutionRepository from '../../src/repositories/solutionRepository.js';

vi.mock('../../src/repositories/bookmarkRepository.js', () => ({
  default: {
    findByUser: vi.fn(),
  },
}));

vi.mock('../../src/repositories/solutionRepository.js', () => ({
  default: {
    findByAuthor: vi.fn(),
  },
}));

describe('userController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      dbUser: { _id: 'user_1', name: 'Test' },
    };
    res = {
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  describe('getMe', () => {
    it('should return user info and stats', async () => {
      bookmarkRepository.findByUser.mockResolvedValue({ total: 5 });
      solutionRepository.findByAuthor.mockResolvedValue({ total: 10 });

      await userController.getMe(req, res, next);

      expect(bookmarkRepository.findByUser).toHaveBeenCalled();
      expect(solutionRepository.findByAuthor).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User profile fetched',
          data: {
            user: req.dbUser,
            stats: {
              bookmarksCount: 5,
              solutionsCount: 10,
            },
          },
        })
      );
    });

    it('should call next on error', async () => {
      bookmarkRepository.findByUser.mockRejectedValue(new Error('err'));
      await userController.getMe(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
