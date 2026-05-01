import { SubjectOffering } from '../models/SubjectOffering.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class SubjectOfferingRepository {
  async create(data) {
    try {
      const offering = new SubjectOffering(data);
      await offering.save();
      return offering;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'Subject offering with this combination already exists'
        );
      }
      throw error;
    }
  }

  async findById(id) {
    const offering = await SubjectOffering.findById(id);
    if (!offering) throw new NotFoundError('Subject offering not found');
    return offering;
  }

  async findBySlug(slug) {
    const offering = await SubjectOffering.findOne({ slug });
    if (!offering) throw new NotFoundError('Subject offering not found');
    return offering;
  }

  async findBySemesterId(semesterId, pagination, filter = {}) {
    return paginate(SubjectOffering, { semesterId, ...filter }, pagination);
  }

  async findByUniversityBranchSemester(
    universityId,
    branchId,
    semesterId,
    pagination,
    filter = {}
  ) {
    return paginate(
      SubjectOffering,
      { universityId, branchId, semesterId, ...filter },
      pagination
    );
  }

  async update(id, data) {
    const offering = await SubjectOffering.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!offering) throw new NotFoundError('Subject offering not found');
    return offering;
  }

  async delete(id) {
    const offering = await SubjectOffering.findByIdAndDelete(id);
    if (!offering) throw new NotFoundError('Subject offering not found');
    return offering;
  }
}

export const subjectOfferingRepository = new SubjectOfferingRepository();
export default subjectOfferingRepository;
