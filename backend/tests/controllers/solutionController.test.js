import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as solutionController from '../../src/controllers/solutionController.js';
import solutionService from '../../src/services/solutionService.js';

vi.mock('../../src/services/solutionService.js', () => ({
  default: {
    listByQuestion: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateStatus: vi.fn(),
    vote: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('solutionController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      query: {},
      params: {},
      body: {},
      dbUser: { _id: 'user_1', role: 'student' },
      pagination: { page: 1, limit: 10 },
    };
    res = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  describe('listByQuestion', () => {
    it('should pass isAdmin:false for students', async () => {
      req.params.questionId = 'q1';
      solutionService.listByQuestion.mockResolvedValue({ items: [] });
      await solutionController.listByQuestion(req, res, next);
      expect(solutionService.listByQuestion).toHaveBeenCalledWith(
        'q1',
        req.pagination,
        false
      );
    });

    it('should pass isAdmin:true for admins', async () => {
      req.dbUser.role = 'admin';
      req.params.questionId = 'q1';
      solutionService.listByQuestion.mockResolvedValue({ items: [] });
      await solutionController.listByQuestion(req, res, next);
      expect(solutionService.listByQuestion).toHaveBeenCalledWith(
        'q1',
        req.pagination,
        true
      );
    });
  });

  describe('vote', () => {
    it('should return 400 for invalid vote type', async () => {
      req.body = { type: 'invalid' };
      await solutionController.vote(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should call vote service for valid type', async () => {
      req.params.id = 's1';
      req.body = { type: 'up' };
      solutionService.vote.mockResolvedValue({});
      await solutionController.vote(req, res, next);
      expect(solutionService.vote).toHaveBeenCalledWith('s1', 'up');
    });
  });

  describe('updateStatus', () => {
    it('should call updateStatus service', async () => {
      req.params.id = 's1';
      req.body = { status: 'approved' };
      solutionService.updateStatus.mockResolvedValue({});
      await solutionController.updateStatus(req, res, next);
      expect(solutionService.updateStatus).toHaveBeenCalledWith(
        's1',
        'approved'
      );
    });
  });
});
