import { describe, it, expect, vi, beforeEach } from 'vitest';
import syllabusService from '../../src/services/syllabusService.js';
import syllabusRepository from '../../src/repositories/syllabusRepository.js';
import moduleRepository from '../../src/repositories/moduleRepository.js';
import topicRepository from '../../src/repositories/topicRepository.js';
import questionSyllabusMapRepository from '../../src/repositories/questionSyllabusMapRepository.js';

vi.mock('../../src/repositories/syllabusRepository.js', () => ({
  default: { findBySubjectOffering: vi.fn() },
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
    it('should return full syllabus hierarchy', async () => {
      const mockSyllabus = { _id: 's1', toJSON: () => ({ id: 's1' }) };
      const mockModule = { _id: 'm1', toJSON: () => ({ id: 'm1' }) };
      const mockTopic = { id: 't1' };

      syllabusRepository.findBySubjectOffering.mockResolvedValue(mockSyllabus);
      moduleRepository.findBySyllabus.mockResolvedValue({
        items: [mockModule],
      });
      topicRepository.findByModule.mockResolvedValue({ items: [mockTopic] });

      const result = await syllabusService.getBySubjectOffering('so1');

      expect(syllabusRepository.findBySubjectOffering).toHaveBeenCalledWith(
        'so1'
      );
      expect(result.modules[0].topics).toContain(mockTopic);
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
