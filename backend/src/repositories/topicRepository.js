import { Topic } from '../models/Topic.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class TopicRepository {
  async create(data) {
    try {
      const topic = new Topic(data);
      await topic.save();
      return topic;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'Topic with this slug already exists in this module'
        );
      }
      throw error;
    }
  }

  async findById(id) {
    const topic = await Topic.findById(id);
    if (!topic) throw new NotFoundError('Topic not found');
    return topic;
  }

  async findByModule(moduleId, pagination) {
    return paginate(Topic, { moduleId }, pagination, { sort: { order: 1 } });
  }

  async findByModuleAndSlug(moduleId, slug) {
    const topic = await Topic.findOne({
      moduleId,
      $or: [{ slug }, { redirectSlugs: slug }],
    });
    if (!topic) throw new NotFoundError('Topic not found');
    return topic;
  }

  async update(id, data) {
    const topic = await Topic.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    });
    if (!topic) throw new NotFoundError('Topic not found');
    return topic;
  }

  async delete(id) {
    const topic = await Topic.findByIdAndDelete(id);
    if (!topic) throw new NotFoundError('Topic not found');
    return topic;
  }
}

export const topicRepository = new TopicRepository();
export default topicRepository;
