import syllabusRepository from '../repositories/syllabusRepository.js';
import moduleRepository from '../repositories/moduleRepository.js';
import topicRepository from '../repositories/topicRepository.js';
import questionSyllabusMapRepository from '../repositories/questionSyllabusMapRepository.js';

class SyllabusService {
  async getBySubjectOffering(subjectOfferingId) {
    const syllabus = await syllabusRepository.findBySubjectOffering(subjectOfferingId);
    
    // Fetch all modules for this syllabus
    const { items: modules } = await moduleRepository.findBySyllabus(syllabus._id, { limit: 100, skip: 0 });
    
    // For each module, fetch topics in parallel
    const modulesWithTopics = await Promise.all(
      modules.map(async (module) => {
        const { items: topics } = await topicRepository.findByModule(module._id, { limit: 100, skip: 0 });
        return { ...module.toJSON(), topics };
      })
    );

    return { ...syllabus.toJSON(), modules: modulesWithTopics };
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
