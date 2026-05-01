import { Semester } from '../models/Semester.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';

class SemesterRepository {
  async create(data) {
    try {
      const semester = new Semester(data);
      await semester.save();
      return semester;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'Semester with this number or slug already exists for this branch'
        );
      }
      throw error;
    }
  }

  async findById(id) {
    const semester = await Semester.findById(id);
    if (!semester) throw new NotFoundError('Semester not found');
    return semester;
  }

  async findByBranchId(branchId) {
    return Semester.find({ branchId }).sort({ number: 1 });
  }

  async findByBranchAndNumber(branchId, number) {
    const semester = await Semester.findOne({ branchId, number });
    if (!semester) throw new NotFoundError('Semester not found');
    return semester;
  }

  async findByBranchAndSlug(branchId, slug) {
    const semester = await Semester.findOne({ branchId, slug });
    if (!semester) throw new NotFoundError('Semester not found');
    return semester;
  }

  async update(id, data) {
    const semester = await Semester.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    });
    if (!semester) throw new NotFoundError('Semester not found');
    return semester;
  }

  async delete(id) {
    const semester = await Semester.findByIdAndDelete(id);
    if (!semester) throw new NotFoundError('Semester not found');
    return semester;
  }
}

export const semesterRepository = new SemesterRepository();
export default semesterRepository;
