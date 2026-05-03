import mongoose from 'mongoose';
import { Solution, solutionZodSchema } from '../models/Solution.js';
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
    return paginate(
      Solution,
      { questionId: String(questionId), ...filter },
      pagination,
      {
        sort: { upvotes: -1 },
      }
    );
  }

  async findByAuthor(authorId, pagination, filter = {}) {
    return paginate(
      Solution,
      { authorId: String(authorId), ...filter },
      pagination
    );
  }

  async vote(id, type) {
    const field = type === 'up' ? 'upvotes' : 'downvotes';
    const solution = await Solution.findByIdAndUpdate(
      id,
      { $inc: { [field]: 1 } },
      { returnDocument: 'after', runValidators: true }
    );
    if (!solution) throw new NotFoundError('Solution not found');
    return solution;
  }

  async updateStatus(id, status) {
    const solution = await Solution.findByIdAndUpdate(
      id,
      { status: String(status) },
      { returnDocument: 'after', runValidators: true }
    );
    if (!solution) throw new NotFoundError('Solution not found');
    return solution;
  }

  async update(id, data) {
    // Sanitize data using the Zod schema to prevent NoSQL injection
    // and ensure only allowed fields are updated.
    const sanitizedData = solutionZodSchema.partial().parse(data);

    const solution = await Solution.findByIdAndUpdate(
      id,
      { $set: sanitizedData },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );
    if (!solution) throw new NotFoundError('Solution not found');
    return solution;
  }

  async delete(id) {
    const solution = await Solution.findByIdAndDelete(id);
    if (!solution) throw new NotFoundError('Solution not found');
    return solution;
  }

  async findWithAuthor(questionId, pagination = {}, filter = {}) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const pipeline = [
      {
        $match: {
          questionId: new mongoose.Types.ObjectId(questionId),
          ...filter,
        },
      },
      { $sort: { upvotes: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'author',
        },
      },
      { $unwind: { path: '$author', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          questionId: 1,
          type: 1,
          content: 1,
          latexContent: 1,
          images: 1,
          videoLinks: 1,
          upvotes: 1,
          downvotes: 1,
          isVerified: 1,
          status: 1,
          createdAt: 1,
          author: {
            name: 1,
            email: 1,
            role: 1,
          },
        },
      },
    ];

    const [items, total] = await Promise.all([
      Solution.aggregate(pipeline),
      Solution.countDocuments({ questionId, ...filter }),
    ]);

    return { items, total, page, limit };
  }

  async deleteByQuestion(questionId) {
    return Solution.deleteMany({ questionId });
  }
}

export const solutionRepository = new SolutionRepository();
export default solutionRepository;
