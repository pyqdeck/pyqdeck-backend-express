import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { questionRepository } from '../../src/repositories/questionRepository.js';
import { Question } from '../../src/models/Question.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('QuestionRepository', () => {
  const questionData = {
    text: 'What is a compiler?',
    type: 'short',
    slug: 'what-is-compiler',
  };

  beforeEach(async () => {
    await Question.deleteMany({});
  });

  describe('create', () => {
    it('should create successfully', async () => {
      const question = await questionRepository.create(questionData);
      expect(question.text).toBe(questionData.text);
      expect(question.slug).toBe(questionData.slug);
    });

    it('should throw ConflictError on duplicate slug', async () => {
      await questionRepository.create(questionData);
      await expect(
        questionRepository.create({
          ...questionData,
          text: 'different text',
        })
      ).rejects.toThrow(ConflictError);
    });
  });

  describe('findById', () => {
    it('should find by id', async () => {
      const created = await questionRepository.create(questionData);
      const question = await questionRepository.findById(created.id);
      expect(question.id).toBe(created.id);
    });
  });

  describe('findBySlug', () => {
    it('should find by slug', async () => {
      await questionRepository.create(questionData);
      const question = await questionRepository.findBySlug(questionData.slug);
      expect(question.slug).toBe(questionData.slug);
    });
  });

  describe('findAll', () => {
    it('should return paginated questions', async () => {
      await questionRepository.create(questionData);
      const result = await questionRepository.findAll(
        {},
        { page: 1, limit: 10 }
      );
      expect(result.items).toHaveLength(1);
    });
  });

  describe('findByTags', () => {
    it('should find questions by tags', async () => {
      const tagId = new mongoose.Types.ObjectId();
      await questionRepository.create({ ...questionData, tags: [tagId] });
      const result = await questionRepository.findByTags([tagId], {
        page: 1,
        limit: 10,
      });
      expect(result.items).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      const created = await questionRepository.create(questionData);
      const updated = await questionRepository.update(created.id, {
        text: 'Updated Text',
      });
      expect(updated.text).toBe('Updated Text');
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await questionRepository.create(questionData);
      await questionRepository.delete(created.id);
      await expect(questionRepository.findById(created.id)).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
