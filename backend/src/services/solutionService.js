import solutionRepository from '../repositories/solutionRepository.js';

class SolutionService {
  /**
   * List solutions for a question, sorted by upvotes desc.
   * Public users only see approved solutions.
   */
  async listByQuestion(questionId, pagination, isAdmin = false) {
    const filter = isAdmin ? {} : { status: 'approved' };
    return solutionRepository.findWithAuthor(questionId, pagination, filter);
  }

  async listByAuthor(authorId, pagination) {
    return solutionRepository.findByAuthor(authorId, pagination);
  }

  async getById(id) {
    return solutionRepository.findById(id);
  }

  async create(data, authorId) {
    return solutionRepository.create({ ...data, authorId });
  }

  async update(id, data) {
    return solutionRepository.update(id, data);
  }

  async updateStatus(id, status) {
    return solutionRepository.updateStatus(id, status);
  }

  async vote(id, type) {
    return solutionRepository.vote(id, type);
  }

  async delete(id) {
    return solutionRepository.delete(id);
  }

  async deleteByQuestion(questionId) {
    return solutionRepository.deleteByQuestion(questionId);
  }
}

export const solutionService = new SolutionService();
export default solutionService;
