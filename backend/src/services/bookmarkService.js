import bookmarkRepository from '../repositories/bookmarkRepository.js';
import { NotFoundError } from '../utils/errors/index.js';

class BookmarkService {
  async listMine(userId, pagination, targetType) {
    const filter = targetType ? { targetType } : {};
    return bookmarkRepository.findByUser(userId, pagination, filter);
  }

  async toggle(userId, targetData) {
    const { targetId, targetType, note } = targetData;

    try {
      await bookmarkRepository.findByUserAndTarget(
        userId,
        targetId,
        targetType
      );
      // If we are here, it exists, so we remove it
      await bookmarkRepository.deleteByUserAndTarget(
        userId,
        targetId,
        targetType
      );
      return { bookmarked: false };
    } catch (error) {
      if (!(error instanceof NotFoundError)) throw error;

      // If NotFoundError, it doesn't exist, so we create it
      const bookmark = await bookmarkRepository.create({
        userId,
        targetId,
        targetType,
        note,
      });
      return { bookmarked: true, bookmark };
    }
  }

  async remove(id, userId) {
    const bookmark = await bookmarkRepository.findById(id);
    if (bookmark.userId.toString() !== userId.toString()) {
      throw new NotFoundError('Bookmark not found');
    }
    return bookmarkRepository.delete(id);
  }
}

export const bookmarkService = new BookmarkService();
export default bookmarkService;
