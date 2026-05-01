import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { bookmarkRepository } from '../../src/repositories/bookmarkRepository.js';
import { Bookmark } from '../../src/models/Bookmark.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('BookmarkRepository', () => {
  const userId = new mongoose.Types.ObjectId();
  const targetId = new mongoose.Types.ObjectId();
  const bookmarkData = {
    userId,
    targetType: 'question',
    targetId,
    note: 'Test note',
  };

  beforeEach(async () => {
    await Bookmark.deleteMany({});
  });

  describe('create', () => {
    it('should create successfully', async () => {
      const bookmark = await bookmarkRepository.create(bookmarkData);
      expect(bookmark.userId.toString()).toBe(userId.toString());
      expect(bookmark.targetId.toString()).toBe(targetId.toString());
    });

    it('should throw ConflictError on duplicate bookmark', async () => {
      await bookmarkRepository.create(bookmarkData);
      await expect(bookmarkRepository.create(bookmarkData)).rejects.toThrow(
        ConflictError
      );
    });
  });

  describe('findById', () => {
    it('should find by id', async () => {
      const created = await bookmarkRepository.create(bookmarkData);
      const bookmark = await bookmarkRepository.findById(created.id);
      expect(bookmark.id).toBe(created.id);
    });
  });

  describe('findByUser', () => {
    it('should return paginated bookmarks for a user', async () => {
      await bookmarkRepository.create(bookmarkData);
      const result = await bookmarkRepository.findByUser(userId, {
        page: 1,
        limit: 10,
      });
      expect(result.items).toHaveLength(1);
    });
  });

  describe('findByUserAndTarget', () => {
    it('should find specific bookmark', async () => {
      await bookmarkRepository.create(bookmarkData);
      const bookmark = await bookmarkRepository.findByUserAndTarget(
        userId,
        targetId,
        'question'
      );
      expect(bookmark.note).toBe('Test note');
    });
  });

  describe('deleteByUserAndTarget', () => {
    it('should delete successfully', async () => {
      await bookmarkRepository.create(bookmarkData);
      await bookmarkRepository.deleteByUserAndTarget(
        userId,
        targetId,
        'question'
      );
      await expect(
        bookmarkRepository.findByUserAndTarget(userId, targetId, 'question')
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('delete', () => {
    it('should delete by id successfully', async () => {
      const created = await bookmarkRepository.create(bookmarkData);
      await bookmarkRepository.delete(created.id);
      await expect(bookmarkRepository.findById(created.id)).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
