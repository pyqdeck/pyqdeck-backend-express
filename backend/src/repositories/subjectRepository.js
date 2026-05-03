import mongoose from 'mongoose';
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
    const { page = 1, limit = 20 } = pagination || {};
    const skip = (page - 1) * limit;

    // Extract university/branch filters before applying to subject match
    const { universityId, branchId, ...subjectFilter } = filter;

    const aggregate = [
      // Apply subject-level filters (like isActive)
      { $match: subjectFilter },
      // Lookup subject offerings for this subject
      {
        $lookup: {
          from: 'subjectofferings',
          localField: '_id',
          foreignField: 'subjectId',
          as: 'offerings',
        },
      },
      // Filter offerings by university/branch if specified
      ...(universityId || branchId
        ? [
            {
              $addFields: {
                offerings: {
                  $filter: {
                    input: '$offerings',
                    as: 'offering',
                    cond: {
                      $and: [
                        ...(universityId
                          ? [
                              {
                                $eq: [
                                  '$$offering.universityId',
                                  new mongoose.Types.ObjectId(universityId),
                                ],
                              },
                            ]
                          : []),
                        ...(branchId
                          ? [
                              {
                                $eq: [
                                  '$$offering.branchId',
                                  new mongoose.Types.ObjectId(branchId),
                                ],
                              },
                            ]
                          : []),
                      ],
                    },
                  },
                },
              },
            },
            // Only keep subjects that have matching offerings
            { $match: { 'offerings.0': { $exists: true } } },
          ]
        : []),
      // Lookup syllabuses for those offerings
      {
        $lookup: {
          from: 'syllabuses',
          localField: 'offerings._id',
          foreignField: 'subjectOfferingId',
          as: 'syllabuses',
        },
      },
      // Lookup modules for those syllabuses
      {
        $lookup: {
          from: 'modules',
          localField: 'syllabuses._id',
          foreignField: 'syllabusId',
          as: 'allModules',
        },
      },
      // Create a dummy 'units' array with the length of unique modules to satisfy the frontend
      {
        $addFields: {
          id: { $toString: '$_id' },
          units: {
            $map: {
              input: { $range: [0, { $size: '$allModules' }] },
              as: 'i',
              in: {},
            },
          },
        },
      },
      {
        $project: {
          offerings: 0,
          syllabi: 0,
          allModules: 0,
        },
      },
      { $sort: { createdAt: -1 } },
    ];

    // For filtered queries, we need to count after filtering
    const [items, totalCount] = await Promise.all([
      Subject.aggregate([...aggregate, { $skip: skip }, { $limit: limit }]),
      universityId || branchId
        ? Subject.aggregate([...aggregate, { $count: 'total' }]).then(
            (result) => result[0]?.total || 0
          )
        : Subject.countDocuments(subjectFilter),
    ]);

    return {
      items,
      pagination: {
        total: totalCount,
        limit,
        page,
        pages: Math.ceil(totalCount / limit),
      },
    };
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
