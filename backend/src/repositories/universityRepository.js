import { University } from '../models/University.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class UniversityRepository {
  async create(data) {
    try {
      const university = new University(data);
      await university.save();
      return university;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError('University with this slug already exists');
      }
      throw error;
    }
  }

  async findById(id) {
    const university = await University.findById(id);
    if (!university) throw new NotFoundError('University not found');
    return university;
  }

  async findBySlug(slug) {
    const university = await University.findOne({
      $or: [{ slug }, { redirectSlugs: slug }],
    });
    if (!university) throw new NotFoundError('University not found');
    return university;
  }

  async findAll(filter = {}, pagination) {
    return paginate(University, filter, pagination);
  }

  async update(id, data) {
    const university = await University.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    });
    if (!university) throw new NotFoundError('University not found');
    return university;
  }

  async delete(id) {
    const university = await University.findByIdAndDelete(id);
    if (!university) throw new NotFoundError('University not found');
    return university;
  }

  async existsBySlug(slug) {
    const count = await University.countDocuments({ slug });
    return count > 0;
  }
}

export const universityRepository = new UniversityRepository();
export default universityRepository;
