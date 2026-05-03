import universityRepository from '../repositories/universityRepository.js';

class UniversityService {
  async list(query = {}, pagination) {
    const filter = {};

    // Filter by active status (default: only active unless 'all' is specified)
    if (query.isActive === 'false' || query.isActive === false) {
      filter.isActive = false;
    } else if (query.isActive !== 'all') {
      filter.isActive = true;
    }

    // Support searching by name or short name
    if (query.search) {
      const searchRegex = { $regex: query.search, $options: 'i' };
      filter.$or = [{ name: searchRegex }, { shortName: searchRegex }];
    }

    // Filter by location
    if (query.state) {
      filter.state = { $regex: query.state, $options: 'i' };
    }
    if (query.country) {
      filter.country = { $regex: query.country, $options: 'i' };
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

  async update(id, data) {
    return universityRepository.update(id, data);
  }

  async delete(id) {
    return universityRepository.delete(id);
  }
}

export const universityService = new UniversityService();
export default universityService;
