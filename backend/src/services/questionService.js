import questionRepository from '../repositories/questionRepository.js';
import questionPaperMapRepository from '../repositories/questionPaperMapRepository.js';

class QuestionService {
  /**
   * List all questions in a paper (via QuestionPaperMap), paginated.
   */
  async listByPaper(paperId, pagination) {
    return questionPaperMapRepository.findByPaper(paperId, pagination);
  }

  async getById(id) {
    return questionRepository.findById(id);
  }

  async getBySlug(slug) {
    return questionRepository.findBySlug(slug);
  }

  async search(filter = {}, pagination) {
    return questionRepository.findAll(filter, pagination);
  }

  async create(data, createdBy) {
    return questionRepository.create({ ...data, createdBy });
  }

  /**
   * Create a question and immediately link it to a paper.
   */
  async createForPaper(paperId, data, createdBy) {
    const question = await questionRepository.create({ ...data, createdBy });
    const mapping = await questionPaperMapRepository.create({
      paperId,
      questionId: question._id || question.id,
      questionNumber: data.questionNumber,
      order: data.order,
      marks: data.marks,
      section: data.section,
    });
    return { question, mapping };
  }

  /**
   * Link an existing question to a paper.
   */
  async linkToPaper(paperId, questionId, meta = {}) {
    return questionPaperMapRepository.create({ paperId, questionId, ...meta });
  }

  async update(id, data) {
    return questionRepository.update(id, data);
  }

  async delete(id) {
    return questionRepository.delete(id);
  }
}

export const questionService = new QuestionService();
export default questionService;
