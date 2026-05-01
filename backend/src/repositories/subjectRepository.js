import { Subject } from '../models/Subject.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class SubjectRepository {
  async create(data) {
    try {
      const subject = new Subject(data);
      await subject.save();
      return subject;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'Subject with this slug or subject code already exists'
        );
      }
      throw error;
    }
  }

  async findById(id) {
    const subject = await Subject.findById(id);
    if (!subject) throw new NotFoundError('Subject not found');
    return subject;
  }

  async findBySlug(slug) {
    const subject = await Subject.findOne({
      $or: [{ slug }, { redirectSlugs: slug }],
    });
    if (!subject) throw new NotFoundError('Subject not found');
    return subject;
  }

  async findAll(filter = {}, pagination) {
    return paginate(Subject, filter, pagination);
  }

  async update(id, data) {
    const subject = await Subject.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    });
    if (!subject) throw new NotFoundError('Subject not found');
    return subject;
  }

  async delete(id) {
    const subject = await Subject.findByIdAndDelete(id);
    if (!subject) throw new NotFoundError('Subject not found');
    return subject;
  }
}

export const subjectRepository = new SubjectRepository();
export default subjectRepository;
