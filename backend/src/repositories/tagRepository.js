import { Tag } from '../models/Tag.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class TagRepository {
  async create(data) {
    try {
      const tag = new Tag(data);
      await tag.save();
      return tag;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError('Tag with this name or slug already exists');
      }
      throw error;
    }
  }

  async findById(id) {
    const tag = await Tag.findById(id);
    if (!tag) throw new NotFoundError('Tag not found');
    return tag;
  }

  async findBySlug(slug) {
    const tag = await Tag.findOne({
      $or: [{ slug }, { redirectSlugs: slug }],
    });
    if (!tag) throw new NotFoundError('Tag not found');
    return tag;
  }

  async findByIds(ids) {
    return Tag.find({ _id: { $in: ids } });
  }

  async findAll(filter = {}, pagination) {
    return paginate(Tag, filter, pagination, { sort: { usageCount: -1 } });
  }

  async incrementUsage(id) {
    const tag = await Tag.findByIdAndUpdate(
      id,
      { $inc: { usageCount: 1 } },
      { new: true }
    );
    if (!tag) throw new NotFoundError('Tag not found');
    return tag;
  }

  async decrementUsage(id) {
    const tag = await Tag.findByIdAndUpdate(
      id,
      { $inc: { usageCount: -1 } },
      { new: true }
    );
    if (!tag) throw new NotFoundError('Tag not found');
    return tag;
  }

  async update(id, data) {
    const tag = await Tag.findByIdAndUpdate(id, data, { new: true });
    if (!tag) throw new NotFoundError('Tag not found');
    return tag;
  }

  async delete(id) {
    const tag = await Tag.findByIdAndDelete(id);
    if (!tag) throw new NotFoundError('Tag not found');
    return tag;
  }
}

export const tagRepository = new TagRepository();
export default tagRepository;
