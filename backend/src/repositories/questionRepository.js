import { Question } from '../models/Question.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class QuestionRepository {
  async create(data) {
    try {
      const question = new Question(data);
      await question.save();
      return question;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError('Question with this slug already exists');
      }
      throw error;
    }
  }

  async findById(id) {
    const question = await Question.findById(id);
    if (!question) throw new NotFoundError('Question not found');
    return question;
  }

  async findBySlug(slug) {
    const question = await Question.findOne({ slug });
    if (!question) throw new NotFoundError('Question not found');
    return question;
  }

  async findAll(filter = {}, pagination) {
    return paginate(Question, filter, pagination);
  }

  async findByTags(tagIds, pagination, extraFilter = {}) {
    return paginate(
      Question,
      { tags: { $in: tagIds }, ...extraFilter },
      pagination
    );
  }

  async update(id, data) {
    const question = await Question.findByIdAndUpdate(id, data, { new: true });
    if (!question) throw new NotFoundError('Question not found');
    return question;
  }

  async delete(id) {
    const question = await Question.findByIdAndDelete(id);
    if (!question) throw new NotFoundError('Question not found');
    return question;
  }
}

export const questionRepository = new QuestionRepository();
export default questionRepository;
