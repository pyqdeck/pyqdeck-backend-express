import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as userController from '../../src/controllers/userController.js';
import userRepository from '../../src/repositories/userRepository.js';

vi.mock('../../src/repositories/userRepository.js', () => ({
  default: {
    getStats: vi.fn(),
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
      userRepository.getStats.mockResolvedValue({
        bookmarksCount: 5,
        solutionsCount: 10,
      });

      await userController.getMe(req, res, next);

      expect(userRepository.getStats).toHaveBeenCalledWith('user_1');
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
      userRepository.getStats.mockRejectedValue(new Error('err'));
      await userController.getMe(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
