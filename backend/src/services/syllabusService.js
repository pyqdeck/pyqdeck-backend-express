import syllabusRepository from '../repositories/syllabusRepository.js';
import moduleRepository from '../repositories/moduleRepository.js';
import topicRepository from '../repositories/topicRepository.js';
import questionSyllabusMapRepository from '../repositories/questionSyllabusMapRepository.js';

class SyllabusService {
  async getBySubjectOffering(subjectOfferingId) {
    return syllabusRepository.getHierarchy(subjectOfferingId);
  }

  async getModuleQuestions(moduleId, pagination) {
    return questionSyllabusMapRepository.findByModule(moduleId, pagination);
  }

  async getTopicQuestions(topicId, pagination) {
    return questionSyllabusMapRepository.findByTopic(topicId, pagination);
  }
}

export const syllabusService = new SyllabusService();
export default syllabusService;
