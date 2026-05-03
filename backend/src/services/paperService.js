import paperRepository from '../repositories/paperRepository.js';
import { loggerService } from '../utils/index.js';

const logger = loggerService.getLogger();

class PaperService {
  async list(filter = {}, pagination) {
    return paperRepository.findAll(filter, pagination);
  }

  async getBySlug(slug) {
    return paperRepository.findBySlug(slug);
  }

  async getById(id) {
    return paperRepository.findById(id);
  }

  async create(data, uploadedBy) {
    return paperRepository.create({ ...data, uploadedBy });
  }

  async update(id, data) {
    return paperRepository.update(id, data);
  }

  async updateStatus(id, status) {
    logger.info('Paper status updated', { id, status });
    return paperRepository.updateStatus(id, status);
  }

  async delete(id) {
    return paperRepository.delete(id);
  }
}

export const paperService = new PaperService();
export default paperService;
