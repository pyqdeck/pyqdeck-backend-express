import { Paper, paperZodSchema } from '../models/Paper.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class PaperRepository {
  async create(data) {
    try {
      const paper = new Paper(data);
      await paper.save();
      return paper;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError('Paper with this slug already exists');
      }
      throw error;
    }
  }

  async findById(id) {
    const paper = await Paper.findById(id);
    if (!paper) throw new NotFoundError('Paper not found');
    return paper;
  }

  async findBySlug(slug) {
    const paper = await Paper.findOne({ slug: String(slug) });
    if (!paper) throw new NotFoundError('Paper not found');
    return paper;
  }

  async findBySubjectOffering(subjectOfferingId, pagination, filter = {}) {
    return paginate(
      Paper,
      { subjectOfferingId: String(subjectOfferingId), ...filter },
      pagination,
      {
        sort: { examYear: -1 },
      }
    );
  }

  async findAll(filter = {}, pagination) {
    return paginate(Paper, filter, pagination, { sort: { examYear: -1 } });
  }

  async updateStatus(id, status) {
    const paper = await Paper.findByIdAndUpdate(
      id,
      { status: String(status) },
      { returnDocument: 'after', runValidators: true }
    );
    if (!paper) throw new NotFoundError('Paper not found');
    return paper;
  }

  async update(id, data) {
    // Sanitize data using the Zod schema to prevent NoSQL injection
    // and ensure only allowed fields are updated.
    const sanitizedData = paperZodSchema.partial().parse(data);

    const paper = await Paper.findByIdAndUpdate(
      id,
      { $set: sanitizedData },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );
    if (!paper) throw new NotFoundError('Paper not found');
    return paper;
  }

  async delete(id) {
    const paper = await Paper.findByIdAndDelete(id);
    if (!paper) throw new NotFoundError('Paper not found');
    return paper;
  }
}

export const paperRepository = new PaperRepository();
export default paperRepository;
