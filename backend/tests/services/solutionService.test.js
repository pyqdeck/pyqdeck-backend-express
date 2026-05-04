import { describe, it, expect, beforeEach, vi } from 'vitest';
import { solutionService } from '../../src/services/solutionService.js';
import solutionRepository from '../../src/repositories/solutionRepository.js';

vi.mock('../../src/repositories/solutionRepository.js', () => ({
  default: {
    findByQuestion: vi.fn(),
    findWithAuthor: vi.fn(),
    findByAuthor: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateStatus: vi.fn(),
    vote: vi.fn(),
    delete: vi.fn(),
    deleteByQuestion: vi.fn(),
  },
}));

describe('SolutionService', () => {
  const sampleSolution = {
    _id: 'sol_1',
    questionId: 'q_1',
    content: 'The answer is...',
    status: 'pending',
  };

  beforeEach(() => vi.clearAllMocks());

  describe('listByQuestion', () => {
    it('should filter by status:approved for non-admins and use aggregation', async () => {
      solutionRepository.findWithAuthor.mockResolvedValue({ items: [] });
      await solutionService.listByQuestion('q_1', { page: 1 }, false);
      expect(solutionRepository.findWithAuthor).toHaveBeenCalledWith(
        'q_1',
        { page: 1 },
        { status: 'approved' }
      );
    });

    it('should NOT filter by status for admins and use aggregation', async () => {
      solutionRepository.findWithAuthor.mockResolvedValue({ items: [] });
      await solutionService.listByQuestion('q_1', { page: 1 }, true);
      expect(solutionRepository.findWithAuthor).toHaveBeenCalledWith(
        'q_1',
        { page: 1 },
        {}
      );
    });
  });

  describe('create', () => {
    it('should create solution with authorId', async () => {
      solutionRepository.create.mockResolvedValue(sampleSolution);
      const data = { content: 'New' };
      await solutionService.create(data, 'user_1');
      expect(solutionRepository.create).toHaveBeenCalledWith({
        ...data,
        authorId: 'user_1',
      });
    });
  });

  describe('vote', () => {
    it('should call vote on repository', async () => {
      solutionRepository.vote.mockResolvedValue(sampleSolution);
      await solutionService.vote('sol_1', 'up');
      expect(solutionRepository.vote).toHaveBeenCalledWith('sol_1', 'up');
    });
  });

  describe('updateStatus', () => {
    it('should call updateStatus on repository', async () => {
      solutionRepository.updateStatus.mockResolvedValue(sampleSolution);
      await solutionService.updateStatus('sol_1', 'approved');
      expect(solutionRepository.updateStatus).toHaveBeenCalledWith(
        'sol_1',
        'approved'
      );
    });
  });

  describe('listByAuthor', () => {
    it('should call findByAuthor on repository', async () => {
      solutionRepository.findByAuthor.mockResolvedValue({ items: [] });
      await solutionService.listByAuthor('user_1', { page: 1 });
      expect(solutionRepository.findByAuthor).toHaveBeenCalledWith('user_1', {
        page: 1,
      });
    });
  });

  describe('getById', () => {
    it('should call findById on repository', async () => {
      solutionRepository.findById.mockResolvedValue(sampleSolution);
      await solutionService.getById('sol_1');
      expect(solutionRepository.findById).toHaveBeenCalledWith('sol_1');
    });
  });

  describe('update', () => {
    it('should call update on repository', async () => {
      solutionRepository.update.mockResolvedValue(sampleSolution);
      await solutionService.update('sol_1', { content: 'Updated' });
      expect(solutionRepository.update).toHaveBeenCalledWith('sol_1', {
        content: 'Updated',
      });
    });
  });

  describe('delete', () => {
    it('should call delete on repository', async () => {
      solutionRepository.delete.mockResolvedValue(sampleSolution);
      await solutionService.delete('sol_1');
      expect(solutionRepository.delete).toHaveBeenCalledWith('sol_1');
    });
  });

  describe('deleteByQuestion', () => {
    it('should call deleteByQuestion on repository', async () => {
      solutionRepository.deleteByQuestion.mockResolvedValue({
        deletedCount: 1,
      });
      await solutionService.deleteByQuestion('q_1');
      expect(solutionRepository.deleteByQuestion).toHaveBeenCalledWith('q_1');
    });
  });
});
