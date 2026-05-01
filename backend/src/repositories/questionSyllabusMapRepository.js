import { QuestionSyllabusMap } from '../models/QuestionSyllabusMap.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class QuestionSyllabusMapRepository {
  async create(data) {
    try {
      const mapping = new QuestionSyllabusMap(data);
      await mapping.save();
      return mapping;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'This question is already mapped to this topic'
        );
      }
      throw error;
    }
  }

  async findById(id) {
    const mapping = await QuestionSyllabusMap.findById(id);
    if (!mapping)
      throw new NotFoundError('Question-syllabus mapping not found');
    return mapping;
  }

  async findByQuestion(questionId) {
    return QuestionSyllabusMap.find({ questionId });
  }

  async findByModule(moduleId, pagination) {
    return paginate(QuestionSyllabusMap, { moduleId }, pagination);
  }

  async findByTopic(topicId, pagination) {
    return paginate(QuestionSyllabusMap, { topicId }, pagination);
  }

  async findByQuestionAndTopic(questionId, topicId) {
    const mapping = await QuestionSyllabusMap.findOne({ questionId, topicId });
    if (!mapping)
      throw new NotFoundError('Question-syllabus mapping not found');
    return mapping;
  }

  async update(id, data) {
    const mapping = await QuestionSyllabusMap.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!mapping)
      throw new NotFoundError('Question-syllabus mapping not found');
    return mapping;
  }

  async delete(id) {
    const mapping = await QuestionSyllabusMap.findByIdAndDelete(id);
    if (!mapping)
      throw new NotFoundError('Question-syllabus mapping not found');
    return mapping;
  }

  async deleteByQuestion(questionId) {
    return QuestionSyllabusMap.deleteMany({ questionId });
  }
}

export const questionSyllabusMapRepository =
  new QuestionSyllabusMapRepository();
export default questionSyllabusMapRepository;
