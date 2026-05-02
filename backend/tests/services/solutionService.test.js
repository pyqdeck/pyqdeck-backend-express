import { describe, it, expect, beforeEach, vi } from 'vitest';
import { solutionService } from '../../src/services/solutionService.js';
import solutionRepository from '../../src/repositories/solutionRepository.js';

vi.mock('../../src/repositories/solutionRepository.js', () => ({
  default: {
    findByQuestion: vi.fn(),
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
    it('should filter by status:approved for non-admins', async () => {
      solutionRepository.findByQuestion.mockResolvedValue({ items: [] });
      await solutionService.listByQuestion('q_1', { page: 1 }, false);
      expect(solutionRepository.findByQuestion).toHaveBeenCalledWith(
        'q_1',
        { page: 1 },
        { status: 'approved' }
      );
    });

    it('should NOT filter by status for admins', async () => {
      solutionRepository.findByQuestion.mockResolvedValue({ items: [] });
      await solutionService.listByQuestion('q_1', { page: 1 }, true);
      expect(solutionRepository.findByQuestion).toHaveBeenCalledWith(
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
});
