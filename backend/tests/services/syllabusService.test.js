import { describe, it, expect, vi, beforeEach } from 'vitest';
import syllabusService from '../../src/services/syllabusService.js';
import syllabusRepository from '../../src/repositories/syllabusRepository.js';
import moduleRepository from '../../src/repositories/moduleRepository.js';
import topicRepository from '../../src/repositories/topicRepository.js';
import questionSyllabusMapRepository from '../../src/repositories/questionSyllabusMapRepository.js';

vi.mock('../../src/repositories/syllabusRepository.js', () => ({
  default: { findBySubjectOffering: vi.fn(), getHierarchy: vi.fn() },
}));
vi.mock('../../src/repositories/moduleRepository.js', () => ({
  default: { findBySyllabus: vi.fn() },
}));
vi.mock('../../src/repositories/topicRepository.js', () => ({
  default: { findByModule: vi.fn() },
}));
vi.mock('../../src/repositories/questionSyllabusMapRepository.js', () => ({
  default: { findByModule: vi.fn(), findByTopic: vi.fn() },
}));

describe('SyllabusService', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('getBySubjectOffering', () => {
    it('should return full syllabus hierarchy via repository', async () => {
      const mockResult = { id: 's1', modules: [{ id: 'm1', topics: [] }] };
      syllabusRepository.getHierarchy.mockResolvedValue(mockResult);

      const result = await syllabusService.getBySubjectOffering('so1');

      expect(syllabusRepository.getHierarchy).toHaveBeenCalledWith('so1');
      expect(result).toEqual(mockResult);
    });
  });

  describe('getModuleQuestions', () => {
    it('should call mapping repository', async () => {
      await syllabusService.getModuleQuestions('m1', { page: 1 });
      expect(questionSyllabusMapRepository.findByModule).toHaveBeenCalledWith(
        'm1',
        { page: 1 }
      );
    });
  });
});
