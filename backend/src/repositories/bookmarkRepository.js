import { Bookmark, bookmarkZodSchema } from '../models/Bookmark.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class BookmarkRepository {
  async create(data) {
    try {
      const bookmark = new Bookmark(data);
      await bookmark.save();
      return bookmark;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError('This item is already bookmarked');
      }
      throw error;
    }
  }

  async findById(id) {
    const bookmark = await Bookmark.findById(id);
    if (!bookmark) throw new NotFoundError('Bookmark not found');
    return bookmark;
  }

  async findByUser(userId, pagination, filter = {}) {
    return paginate(
      Bookmark,
      { userId: String(userId), ...filter },
      pagination
    );
  }

  async findByUserAndTarget(userId, targetId, targetType) {
    const bookmark = await Bookmark.findOne({
      userId: String(userId),
      targetId: String(targetId),
      targetType: String(targetType),
    });
    if (!bookmark) throw new NotFoundError('Bookmark not found');
    return bookmark;
  }

  async deleteByUserAndTarget(userId, targetId, targetType) {
    const bookmark = await Bookmark.findOneAndDelete({
      userId: String(userId),
      targetId: String(targetId),
      targetType: String(targetType),
    });
    if (!bookmark) throw new NotFoundError('Bookmark not found');
    return bookmark;
  }

  async delete(id) {
    const bookmark = await Bookmark.findByIdAndDelete(id);
    if (!bookmark) throw new NotFoundError('Bookmark not found');
    return bookmark;
  }
}

export const bookmarkRepository = new BookmarkRepository();
export default bookmarkRepository;
