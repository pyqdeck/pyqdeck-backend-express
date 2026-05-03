import syllabusRepository from '../repositories/syllabusRepository.js';
import moduleRepository from '../repositories/moduleRepository.js';
import topicRepository from '../repositories/topicRepository.js';
import questionSyllabusMapRepository from '../repositories/questionSyllabusMapRepository.js';

class SyllabusService {
  // Syllabus CRUD
  async createSyllabus(data) {
    return syllabusRepository.create(data);
  }

  async getBySubjectOffering(subjectOfferingId) {
    return syllabusRepository.getHierarchy(subjectOfferingId);
  }

  async updateSyllabus(id, data) {
    return syllabusRepository.update(id, data);
  }

  async deleteSyllabus(id) {
    return syllabusRepository.delete(id);
  }

  // Module CRUD
  async createModule(data) {
    return moduleRepository.create(data);
  }

  async listModules(filter, pagination) {
    return moduleRepository.findBySyllabus(filter.syllabusId, pagination);
  }

  async updateModule(id, data) {
    return moduleRepository.update(id, data);
  }

  async deleteModule(id) {
    return moduleRepository.delete(id);
  }

  // Topic CRUD
  async createTopic(data) {
    return topicRepository.create(data);
  }

  async updateTopic(id, data) {
    return topicRepository.update(id, data);
  }

  async deleteTopic(id) {
    return topicRepository.delete(id);
  }

  // Questions Mapping
  async getModuleQuestions(moduleId, pagination) {
    return questionSyllabusMapRepository.findByModule(moduleId, pagination);
  }

  async getTopicQuestions(topicId, pagination) {
    return questionSyllabusMapRepository.findByTopic(topicId, pagination);
  }
}

export const syllabusService = new SyllabusService();
export default syllabusService;
