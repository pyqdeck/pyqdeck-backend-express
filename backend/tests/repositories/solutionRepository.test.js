import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { solutionRepository } from '../../src/repositories/solutionRepository.js';
import { Solution } from '../../src/models/Solution.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

describe('SolutionRepository', () => {
  const questionId = new mongoose.Types.ObjectId();
  const authorId = new mongoose.Types.ObjectId();
  const solutionData = {
    questionId,
    authorId,
    type: 'teacher',
    content: 'Test Solution',
  };

  beforeEach(async () => {
    await Solution.deleteMany({});
  });

  describe('create', () => {
    it('should create successfully', async () => {
      const solution = await solutionRepository.create(solutionData);
      expect(solution.content).toBe(solutionData.content);
      expect(solution.questionId.toString()).toBe(questionId.toString());
    });
  });

  describe('findById', () => {
    it('should find by id', async () => {
      const created = await solutionRepository.create(solutionData);
      const solution = await solutionRepository.findById(created.id);
      expect(solution.id).toBe(created.id);
    });
  });

  describe('findByQuestion', () => {
    it('should return paginated solutions sorted by upvotes', async () => {
      await solutionRepository.create({ ...solutionData, upvotes: 10 });
      await solutionRepository.create({ ...solutionData, upvotes: 20 });
      const result = await solutionRepository.findByQuestion(questionId, {
        page: 1,
        limit: 10,
      });
      expect(result.items).toHaveLength(2);
      expect(result.items[0].upvotes).toBe(20);
    });
  });

  describe('findByAuthor', () => {
    it('should return paginated solutions for author', async () => {
      await solutionRepository.create(solutionData);
      const result = await solutionRepository.findByAuthor(authorId, {
        page: 1,
        limit: 10,
      });
      expect(result.items).toHaveLength(1);
    });
  });

  describe('vote', () => {
    it('should increment upvotes', async () => {
      const created = await solutionRepository.create(solutionData);
      const updated = await solutionRepository.vote(created.id, 'up');
      expect(updated.upvotes).toBe(1);
    });

    it('should increment downvotes', async () => {
      const created = await solutionRepository.create(solutionData);
      const updated = await solutionRepository.vote(created.id, 'down');
      expect(updated.downvotes).toBe(1);
    });
  });

  describe('updateStatus', () => {
    it('should update status successfully', async () => {
      const created = await solutionRepository.create(solutionData);
      const updated = await solutionRepository.updateStatus(
        created.id,
        'approved'
      );
      expect(updated.status).toBe('approved');
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      const created = await solutionRepository.create(solutionData);
      const updated = await solutionRepository.update(created.id, {
        content: 'Updated Content',
      });
      expect(updated.content).toBe('Updated Content');
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await solutionRepository.create(solutionData);
      await solutionRepository.delete(created.id);
      await expect(solutionRepository.findById(created.id)).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('deleteByQuestion', () => {
    it('should delete all solutions for a question', async () => {
      await solutionRepository.create(solutionData);
      await solutionRepository.deleteByQuestion(questionId);
      const result = await solutionRepository.findByQuestion(questionId, {
        page: 1,
        limit: 10,
      });
      expect(result.items).toHaveLength(0);
    });
  });
});
