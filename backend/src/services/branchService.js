import branchRepository from '../repositories/branchRepository.js';

class BranchService {
  async listByUniversity(universityId, pagination, filter = {}) {
    return branchRepository.findByUniversityId(
      universityId,
      pagination,
      filter
    );
  }

  async getBySlug(universityId, slug) {
    return branchRepository.findBySlug(universityId, slug);
  }

  async getById(id) {
    return branchRepository.findById(id);
  }

  async create(data) {
    return branchRepository.create(data);
  }

  async update(id, data) {
    return branchRepository.update(id, data);
  }

  async delete(id) {
    return branchRepository.delete(id);
  }
}

export const branchService = new BranchService();
export default branchService;
