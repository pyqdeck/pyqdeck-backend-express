import { Syllabus } from '../models/Syllabus.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';

class SyllabusRepository {
  async create(data) {
    try {
      const syllabus = new Syllabus(data);
      await syllabus.save();
      return syllabus;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'Syllabus already exists for this subject offering'
        );
      }
      throw error;
    }
  }

  async findById(id) {
    const syllabus = await Syllabus.findById(id);
    if (!syllabus) throw new NotFoundError('Syllabus not found');
    return syllabus;
  }

  async findBySubjectOffering(subjectOfferingId) {
    const syllabus = await Syllabus.findOne({ subjectOfferingId });
    if (!syllabus) throw new NotFoundError('Syllabus not found');
    return syllabus;
  }

  async update(id, data) {
    const syllabus = await Syllabus.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    });
    if (!syllabus) throw new NotFoundError('Syllabus not found');
    return syllabus;
  }

  async delete(id) {
    const syllabus = await Syllabus.findByIdAndDelete(id);
    if (!syllabus) throw new NotFoundError('Syllabus not found');
    return syllabus;
  }
}

export const syllabusRepository = new SyllabusRepository();
export default syllabusRepository;
