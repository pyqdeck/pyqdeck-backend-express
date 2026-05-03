import { describe, it, expect, beforeEach, vi } from 'vitest';
import { bookmarkService } from '../../src/services/bookmarkService.js';
import bookmarkRepository from '../../src/repositories/bookmarkRepository.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/repositories/bookmarkRepository.js', () => ({
  default: {
    findByUser: vi.fn(),
    findByUserAndTarget: vi.fn(),
    create: vi.fn(),
    deleteByUserAndTarget: vi.fn(),
    findById: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('BookmarkService', () => {
  const userId = 'user_1';
  const targetId = 'target_1';
  const targetType = 'question';

  beforeEach(() => vi.clearAllMocks());

  describe('toggle', () => {
    it('should remove bookmark if it already exists', async () => {
      bookmarkRepository.findByUserAndTarget.mockResolvedValue({ id: 'b1' });
      const result = await bookmarkService.toggle(userId, {
        targetId,
        targetType,
      });

      expect(bookmarkRepository.deleteByUserAndTarget).toHaveBeenCalledWith(
        userId,
        targetId,
        targetType
      );
      expect(result.bookmarked).toBe(false);
    });

    it('should throw error if repository throws non-NotFoundError', async () => {
      const unexpectedError = new Error('DB Error');
      bookmarkRepository.findByUserAndTarget.mockRejectedValue(unexpectedError);

      await expect(
        bookmarkService.toggle(userId, { targetId, targetType })
      ).rejects.toThrow('DB Error');
    });

    it('should create bookmark if it does not exist', async () => {
      bookmarkRepository.findByUserAndTarget.mockRejectedValue(
        new NotFoundError('Not found')
      );
      bookmarkRepository.create.mockResolvedValue({ id: 'b2' });

      const result = await bookmarkService.toggle(userId, {
        targetId,
        targetType,
      });

      expect(bookmarkRepository.create).toHaveBeenCalled();
      expect(result.bookmarked).toBe(true);
    });
  });

  describe('remove', () => {
    it('should throw NotFoundError if bookmark belongs to another user', async () => {
      bookmarkRepository.findById.mockResolvedValue({ userId: 'other_user' });

      await expect(bookmarkService.remove('b1', userId)).rejects.toThrow(
        NotFoundError
      );
    });

    it('should delete bookmark if it belongs to user', async () => {
      bookmarkRepository.findById.mockResolvedValue({ userId: userId });
      bookmarkRepository.delete.mockResolvedValue({ id: 'b1' });

      await bookmarkService.remove('b1', userId);

      expect(bookmarkRepository.delete).toHaveBeenCalledWith('b1');
    });
  });
});
