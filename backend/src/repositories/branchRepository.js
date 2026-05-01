import { Branch } from '../models/Branch.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class BranchRepository {
  async create(data) {
    try {
      const branch = new Branch(data);
      await branch.save();
      return branch;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'Branch with this slug already exists for this university'
        );
      }
      throw error;
    }
  }

  async findById(id) {
    const branch = await Branch.findById(id);
    if (!branch) throw new NotFoundError('Branch not found');
    return branch;
  }

  async findBySlug(universityId, slug) {
    const branch = await Branch.findOne({
      universityId,
      $or: [{ slug }, { redirectSlugs: slug }],
    });
    if (!branch) throw new NotFoundError('Branch not found');
    return branch;
  }

  async findByUniversityId(universityId, pagination, filter = {}) {
    return paginate(Branch, { universityId, ...filter }, pagination);
  }

  async update(id, data) {
    const branch = await Branch.findByIdAndUpdate(id, data, { new: true });
    if (!branch) throw new NotFoundError('Branch not found');
    return branch;
  }

  async delete(id) {
    const branch = await Branch.findByIdAndDelete(id);
    if (!branch) throw new NotFoundError('Branch not found');
    return branch;
  }
}

export const branchRepository = new BranchRepository();
export default branchRepository;
