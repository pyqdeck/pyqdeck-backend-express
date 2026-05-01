import { Solution } from '../models/Solution.js';
import { NotFoundError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class SolutionRepository {
  async create(data) {
    const solution = new Solution(data);
    await solution.save();
    return solution;
  }

  async findById(id) {
    const solution = await Solution.findById(id);
    if (!solution) throw new NotFoundError('Solution not found');
    return solution;
  }

  async findByQuestion(questionId, pagination, filter = {}) {
    return paginate(Solution, { questionId, ...filter }, pagination, {
      sort: { upvotes: -1 },
    });
  }

  async findByAuthor(authorId, pagination, filter = {}) {
    return paginate(Solution, { authorId, ...filter }, pagination);
  }

  async vote(id, type) {
    const field = type === 'up' ? 'upvotes' : 'downvotes';
    const solution = await Solution.findByIdAndUpdate(
      id,
      { $inc: { [field]: 1 } },
      { new: true }
    );
    if (!solution) throw new NotFoundError('Solution not found');
    return solution;
  }

  async updateStatus(id, status) {
    const solution = await Solution.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!solution) throw new NotFoundError('Solution not found');
    return solution;
  }

  async update(id, data) {
    const solution = await Solution.findByIdAndUpdate(id, data, { new: true });
    if (!solution) throw new NotFoundError('Solution not found');
    return solution;
  }

  async delete(id) {
    const solution = await Solution.findByIdAndDelete(id);
    if (!solution) throw new NotFoundError('Solution not found');
    return solution;
  }

  async deleteByQuestion(questionId) {
    return Solution.deleteMany({ questionId });
  }
}

export const solutionRepository = new SolutionRepository();
export default solutionRepository;
