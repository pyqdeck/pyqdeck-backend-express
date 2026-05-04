import universityRepository from '../repositories/universityRepository.js';
import { escapeRegExp } from '../utils/index.js';

class UniversityService {
  async list(query = {}, pagination) {
    const filter = {};

    // Filter by active status if explicitly requested
    if (query.isActive !== undefined && query.isActive !== 'all') {
      filter.isActive = query.isActive === 'true' || query.isActive === true;
    }

    // Support searching by name or short name
    if (query.search && typeof query.search === 'string') {
      const searchRegex = {
        $regex: escapeRegExp(query.search),
        $options: 'i',
      };
      filter.$or = [{ name: searchRegex }, { shortName: searchRegex }];
    }

    // Filter by location
    if (query.state && typeof query.state === 'string') {
      filter.state = { $regex: escapeRegExp(query.state), $options: 'i' };
    }
    if (query.country && typeof query.country === 'string') {
      filter.country = { $regex: escapeRegExp(query.country), $options: 'i' };
    }

    return universityRepository.findAll(filter, pagination);
  }

  async getBySlug(slug) {
    return universityRepository.findBySlug(slug);
  }

  async getById(id) {
    return universityRepository.findById(id);
  }

  async create(data) {
    return universityRepository.create(data);
  }

  async bulkCreate(data) {
    return universityRepository.createMany(data);
  }

  async update(id, data) {
    return universityRepository.update(id, data);
  }

  async delete(id) {
    return universityRepository.delete(id);
  }
}

export const universityService = new UniversityService();
export default universityService;
