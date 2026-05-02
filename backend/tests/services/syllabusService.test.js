import { describe, it, expect, vi, beforeEach } from 'vitest';
import syllabusService from '../../src/services/syllabusService.js';
import syllabusRepository from '../../src/repositories/syllabusRepository.js';
import moduleRepository from '../../src/repositories/moduleRepository.js';
import topicRepository from '../../src/repositories/topicRepository.js';
import questionSyllabusMapRepository from '../../src/repositories/questionSyllabusMapRepository.js';

vi.mock('../../src/repositories/syllabusRepository.js');
vi.mock('../../src/repositories/moduleRepository.js');
vi.mock('../../src/repositories/topicRepository.js');
vi.mock('../../src/repositories/questionSyllabusMapRepository.js');

describe('syllabusService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Syllabus CRUD', () => {
    it('createSyllabus should call repository.create', async () => {
      const mockData = { name: 'Syllabus 1' };
      syllabusRepository.create.mockResolvedValue(mockData);

      const result = await syllabusService.createSyllabus(mockData);
      expect(syllabusRepository.create).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(mockData);
    });

    it('getBySubjectOffering should call repository.getHierarchy', async () => {
      const mockHierarchy = { id: 'syl-1', modules: [] };
      syllabusRepository.getHierarchy.mockResolvedValue(mockHierarchy);

      const result = await syllabusService.getBySubjectOffering('off-1');
      expect(syllabusRepository.getHierarchy).toHaveBeenCalledWith('off-1');
      expect(result).toEqual(mockHierarchy);
    });

    it('updateSyllabus should call repository.update', async () => {
      const mockData = { name: 'Updated Syllabus' };
      syllabusRepository.update.mockResolvedValue(mockData);

      const result = await syllabusService.updateSyllabus('syl-1', mockData);
      expect(syllabusRepository.update).toHaveBeenCalledWith('syl-1', mockData);
      expect(result).toEqual(mockData);
    });

    it('deleteSyllabus should call repository.delete', async () => {
      syllabusRepository.delete.mockResolvedValue(true);

      const result = await syllabusService.deleteSyllabus('syl-1');
      expect(syllabusRepository.delete).toHaveBeenCalledWith('syl-1');
      expect(result).toEqual(true);
    });
  });

  describe('Module CRUD', () => {
    it('createModule should call repository.create', async () => {
      const mockData = { name: 'Module 1' };
      moduleRepository.create.mockResolvedValue(mockData);

      const result = await syllabusService.createModule(mockData);
      expect(moduleRepository.create).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(mockData);
    });

    it('listModules should call repository.findBySyllabus', async () => {
      const mockResponse = { items: [], total: 0 };
      moduleRepository.findBySyllabus.mockResolvedValue(mockResponse);

      const filter = { syllabusId: 'syl-1' };
      const pagination = { page: 1, limit: 10 };

      const result = await syllabusService.listModules(filter, pagination);
      expect(moduleRepository.findBySyllabus).toHaveBeenCalledWith('syl-1', pagination);
      expect(result).toEqual(mockResponse);
    });

    it('updateModule should call repository.update', async () => {
      const mockData = { name: 'Updated Module' };
      moduleRepository.update.mockResolvedValue(mockData);

      const result = await syllabusService.updateModule('mod-1', mockData);
      expect(moduleRepository.update).toHaveBeenCalledWith('mod-1', mockData);
      expect(result).toEqual(mockData);
    });

    it('deleteModule should call repository.delete', async () => {
      moduleRepository.delete.mockResolvedValue(true);

      const result = await syllabusService.deleteModule('mod-1');
      expect(moduleRepository.delete).toHaveBeenCalledWith('mod-1');
      expect(result).toEqual(true);
    });
  });

  describe('Topic CRUD', () => {
    it('createTopic should call repository.create', async () => {
      const mockData = { name: 'Topic 1' };
      topicRepository.create.mockResolvedValue(mockData);

      const result = await syllabusService.createTopic(mockData);
      expect(topicRepository.create).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(mockData);
    });

    it('updateTopic should call repository.update', async () => {
      const mockData = { name: 'Updated Topic' };
      topicRepository.update.mockResolvedValue(mockData);

      const result = await syllabusService.updateTopic('top-1', mockData);
      expect(topicRepository.update).toHaveBeenCalledWith('top-1', mockData);
      expect(result).toEqual(mockData);
    });

    it('deleteTopic should call repository.delete', async () => {
      topicRepository.delete.mockResolvedValue(true);

      const result = await syllabusService.deleteTopic('top-1');
      expect(topicRepository.delete).toHaveBeenCalledWith('top-1');
      expect(result).toEqual(true);
    });
  });

  describe('Questions Mapping', () => {
    it('getModuleQuestions should call repository.findByModule', async () => {
      const mockResponse = { items: [], total: 0 };
      questionSyllabusMapRepository.findByModule.mockResolvedValue(mockResponse);

      const pagination = { page: 1, limit: 10 };
      const result = await syllabusService.getModuleQuestions('mod-1', pagination);

      expect(questionSyllabusMapRepository.findByModule).toHaveBeenCalledWith('mod-1', pagination);
      expect(result).toEqual(mockResponse);
    });

    it('getTopicQuestions should call repository.findByTopic', async () => {
      const mockResponse = { items: [], total: 0 };
      questionSyllabusMapRepository.findByTopic.mockResolvedValue(mockResponse);

      const pagination = { page: 1, limit: 10 };
      const result = await syllabusService.getTopicQuestions('top-1', pagination);

      expect(questionSyllabusMapRepository.findByTopic).toHaveBeenCalledWith('top-1', pagination);
      expect(result).toEqual(mockResponse);
    });
  });
});
