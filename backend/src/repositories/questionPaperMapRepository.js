import { QuestionPaperMap } from '../models/QuestionPaperMap.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class QuestionPaperMapRepository {
  async create(data) {
    try {
      const mapping = new QuestionPaperMap(data);
      await mapping.save();
      return mapping;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'This question is already mapped to this paper'
        );
      }
      throw error;
    }
  }

  async findById(id) {
    const mapping = await QuestionPaperMap.findById(id);
    if (!mapping) throw new NotFoundError('Question-paper mapping not found');
    return mapping;
  }

  async findByPaper(paperId, pagination) {
    return paginate(QuestionPaperMap, { paperId }, pagination, {
      sort: { order: 1, questionNumber: 1 },
    });
  }

  async findByQuestion(questionId, pagination) {
    return paginate(QuestionPaperMap, { questionId }, pagination);
  }

  async findByPaperAndQuestion(paperId, questionId) {
    const mapping = await QuestionPaperMap.findOne({ paperId, questionId });
    if (!mapping) throw new NotFoundError('Question-paper mapping not found');
    return mapping;
  }

  async update(id, data) {
    const mapping = await QuestionPaperMap.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    });
    if (!mapping) throw new NotFoundError('Question-paper mapping not found');
    return mapping;
  }

  async delete(id) {
    const mapping = await QuestionPaperMap.findByIdAndDelete(id);
    if (!mapping) throw new NotFoundError('Question-paper mapping not found');
    return mapping;
  }

  async deleteByPaper(paperId) {
    return QuestionPaperMap.deleteMany({ paperId });
  }
}

export const questionPaperMapRepository = new QuestionPaperMapRepository();
export default questionPaperMapRepository;
