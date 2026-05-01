import subjectRepository from '../repositories/subjectRepository.js';

class SubjectService {
  async list(filter = {}, pagination) {
    return subjectRepository.findAll(filter, pagination);
  }

  async getBySlug(slug) {
    return subjectRepository.findBySlug(slug);
  }

  async getById(id) {
    return subjectRepository.findById(id);
  }

  async create(data) {
    return subjectRepository.create(data);
  }

  async update(id, data) {
    return subjectRepository.update(id, data);
  }

  async delete(id) {
    return subjectRepository.delete(id);
  }
}

export const subjectService = new SubjectService();
export default subjectService;
