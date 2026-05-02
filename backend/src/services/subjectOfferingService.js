import subjectOfferingRepository from '../repositories/subjectOfferingRepository.js';

class SubjectOfferingService {
  async list(filter = {}, pagination) {
    return subjectOfferingRepository.findByUniversityBranchSemester(
      filter.universityId,
      filter.branchId,
      filter.semesterId,
      pagination,
      filter.extra || {}
    );
  }

  async getBySlug(slug) {
    return subjectOfferingRepository.findBySlug(slug);
  }

  async getById(id) {
    return subjectOfferingRepository.findById(id);
  }

  async listBySemester(semesterId, pagination, filter = {}) {
    return subjectOfferingRepository.findBySemesterId(
      semesterId,
      pagination,
      filter
    );
  }

  async create(data) {
    return subjectOfferingRepository.create(data);
  }

  async update(id, data) {
    return subjectOfferingRepository.update(id, data);
  }

  async delete(id) {
    return subjectOfferingRepository.delete(id);
  }
}

export const subjectOfferingService = new SubjectOfferingService();
export default subjectOfferingService;
