import { SubjectOffering } from '../models/SubjectOffering.js';
import { University } from '../models/University.js';
import { Branch } from '../models/Branch.js';
import { Semester } from '../models/Semester.js';
import { Subject } from '../models/Subject.js';
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
    const result = await paginate(
      SubjectOffering,
      { semesterId, ...filter },
      pagination
    );

    result.items = await SubjectOffering.populate(result.items, [
      { path: 'universityId', select: 'name shortName' },
      { path: 'branchId', select: 'name shortName universityId' },
      { path: 'semesterId', select: 'number' },
      { path: 'subjectId', select: 'name subjectCode slug' },
    ]);

    return result;
  }

  async findByUniversityBranchSemester(
    universityId,
    branchId,
    semesterId,
    pagination,
    filter = {}
  ) {
    const query = { ...filter };
    if (universityId) query.universityId = universityId;
    if (branchId) query.branchId = branchId;
    if (semesterId) query.semesterId = semesterId;

    const result = await paginate(SubjectOffering, query, pagination);

    // Populate relations to show names and metadata in the UI
    result.items = await SubjectOffering.populate(result.items, [
      { path: 'universityId', select: 'name shortName' },
      { path: 'branchId', select: 'name shortName universityId' },
      { path: 'semesterId', select: 'number' },
      { path: 'subjectId', select: 'name subjectCode slug' },
    ]);

    return result;
  }

  async update(id, data) {
    const offering = await SubjectOffering.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
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
