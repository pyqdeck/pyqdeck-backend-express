import universityRepository from '../repositories/universityRepository.js';

class UniversityService {
  async list(filter = {}, pagination) {
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
