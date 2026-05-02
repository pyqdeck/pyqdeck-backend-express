import mongoose from 'mongoose';
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

  async getHierarchy(subjectOfferingId) {
    const results = await Syllabus.aggregate([
      {
        $match: {
          subjectOfferingId: new mongoose.Types.ObjectId(subjectOfferingId),
        },
      },
      {
        $lookup: {
          from: 'modules',
          localField: '_id',
          foreignField: 'syllabusId',
          as: 'modules',
        },
      },
      { $unwind: { path: '$modules', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'topics',
          localField: 'modules._id',
          foreignField: 'moduleId',
          as: 'modules.topics',
        },
      },
      {
        $group: {
          _id: '$_id',
          subjectOfferingId: { $first: '$subjectOfferingId' },
          description: { $first: '$description' },
          modules: { $push: '$modules' },
        },
      },
    ]);

    if (!results.length) throw new NotFoundError('Syllabus not found');
    return results[0];
  }
}

export const syllabusRepository = new SyllabusRepository();
export default syllabusRepository;
