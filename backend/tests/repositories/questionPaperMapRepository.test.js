import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { questionPaperMapRepository } from '../../src/repositories/questionPaperMapRepository.js';
import { QuestionPaperMap } from '../../src/models/QuestionPaperMap.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('QuestionPaperMapRepository', () => {
  const paperId = new mongoose.Types.ObjectId();
  const questionId = new mongoose.Types.ObjectId();
  const mappingData = {
    paperId,
    questionId,
    section: 'A',
    questionNumber: 1,
    marks: 5,
    order: 1,
  };

  beforeEach(async () => {
    await QuestionPaperMap.deleteMany({});
  });

  describe('create', () => {
    it('should create successfully', async () => {
      const mapping = await questionPaperMapRepository.create(mappingData);
      expect(mapping.section).toBe('A');
      expect(mapping.paperId.toString()).toBe(paperId.toString());
    });

    it('should throw ConflictError on duplicate paperId and questionId', async () => {
      await questionPaperMapRepository.create(mappingData);
      await expect(questionPaperMapRepository.create(mappingData)).rejects.toThrow(ConflictError);
    });
  });

  describe('findByPaper', () => {
    it('should return paginated mappings for a paper', async () => {
      await questionPaperMapRepository.create({ ...mappingData, questionId: new mongoose.Types.ObjectId(), questionNumber: 2, order: 2 });
      await questionPaperMapRepository.create(mappingData);
      const result = await questionPaperMapRepository.findByPaper(paperId, { page: 1, limit: 10 });
      expect(result.items).toHaveLength(2);
      expect(result.items[0].questionNumber).toBe(1);
    });
  });

  describe('findByQuestion', () => {
    it('should return mappings for a question', async () => {
      await questionPaperMapRepository.create(mappingData);
      const result = await questionPaperMapRepository.findByQuestion(questionId, { page: 1, limit: 10 });
      expect(result.items).toHaveLength(1);
    });
  });

  describe('findByPaperAndQuestion', () => {
    it('should find specific mapping', async () => {
      await questionPaperMapRepository.create(mappingData);
      const mapping = await questionPaperMapRepository.findByPaperAndQuestion(paperId, questionId);
      expect(mapping.section).toBe('A');
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      const created = await questionPaperMapRepository.create(mappingData);
      const updated = await questionPaperMapRepository.update(created.id, { marks: 10 });
      expect(updated.marks).toBe(10);
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await questionPaperMapRepository.create(mappingData);
      await questionPaperMapRepository.delete(created.id);
      await expect(questionPaperMapRepository.findById(created.id)).rejects.toThrow(NotFoundError);
    });
  });

  describe('deleteByPaper', () => {
    it('should delete all mappings for a paper', async () => {
      await questionPaperMapRepository.create(mappingData);
      await questionPaperMapRepository.deleteByPaper(paperId);
      const result = await questionPaperMapRepository.findByPaper(paperId, { page: 1, limit: 10 });
      expect(result.items).toHaveLength(0);
    });
  });
});
