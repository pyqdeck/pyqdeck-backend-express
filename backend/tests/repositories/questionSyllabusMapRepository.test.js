import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { questionSyllabusMapRepository } from '../../src/repositories/questionSyllabusMapRepository.js';
import { QuestionSyllabusMap } from '../../src/models/QuestionSyllabusMap.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('QuestionSyllabusMapRepository', () => {
  const questionId = new mongoose.Types.ObjectId();
  const moduleId = new mongoose.Types.ObjectId();
  const topicId = new mongoose.Types.ObjectId();
  const mappingData = {
    questionId,
    moduleId,
    topicId,
    confidenceScore: 0.9,
    mappedBy: 'manual',
  };

  beforeEach(async () => {
    await QuestionSyllabusMap.deleteMany({});
  });

  describe('create', () => {
    it('should create successfully', async () => {
      const mapping = await questionSyllabusMapRepository.create(mappingData);
      expect(mapping.confidenceScore).toBe(0.9);
      expect(mapping.questionId.toString()).toBe(questionId.toString());
    });

    it('should throw ConflictError on duplicate questionId and topicId', async () => {
      await questionSyllabusMapRepository.create(mappingData);
      await expect(
        questionSyllabusMapRepository.create(mappingData)
      ).rejects.toThrow(ConflictError);
    });
  });

  describe('findByQuestion', () => {
    it('should return all mappings for a question', async () => {
      await questionSyllabusMapRepository.create(mappingData);
      const mappings =
        await questionSyllabusMapRepository.findByQuestion(questionId);
      expect(mappings).toHaveLength(1);
    });
  });

  describe('findByModule', () => {
    it('should return paginated mappings for a module', async () => {
      await questionSyllabusMapRepository.create(mappingData);
      const result = await questionSyllabusMapRepository.findByModule(
        moduleId,
        { page: 1, limit: 10 }
      );
      expect(result.items).toHaveLength(1);
    });
  });

  describe('findByTopic', () => {
    it('should return paginated mappings for a topic', async () => {
      await questionSyllabusMapRepository.create(mappingData);
      const result = await questionSyllabusMapRepository.findByTopic(topicId, {
        page: 1,
        limit: 10,
      });
      expect(result.items).toHaveLength(1);
    });
  });

  describe('findByQuestionAndTopic', () => {
    it('should find specific mapping', async () => {
      await questionSyllabusMapRepository.create(mappingData);
      const mapping =
        await questionSyllabusMapRepository.findByQuestionAndTopic(
          questionId,
          topicId
        );
      expect(mapping.confidenceScore).toBe(0.9);
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      const created = await questionSyllabusMapRepository.create(mappingData);
      const updated = await questionSyllabusMapRepository.update(created.id, {
        verified: true,
      });
      expect(updated.verified).toBe(true);
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await questionSyllabusMapRepository.create(mappingData);
      await questionSyllabusMapRepository.delete(created.id);
      await expect(
        questionSyllabusMapRepository.findById(created.id)
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('deleteByQuestion', () => {
    it('should delete all mappings for a question', async () => {
      await questionSyllabusMapRepository.create(mappingData);
      await questionSyllabusMapRepository.deleteByQuestion(questionId);
      const mappings =
        await questionSyllabusMapRepository.findByQuestion(questionId);
      expect(mappings).toHaveLength(0);
    });
  });
});
