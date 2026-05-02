import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as syllabusController from '../../src/controllers/syllabusController.js';
import syllabusService from '../../src/services/syllabusService.js';

vi.mock('../../src/services/syllabusService.js', () => ({
  default: {
    getBySubjectOffering: vi.fn(),
    getModuleQuestions: vi.fn(),
    getTopicQuestions: vi.fn(),
  },
}));

describe('syllabusController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {},
      pagination: { page: 1, limit: 10 },
    };
    res = {
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  describe('getBySubjectOffering', () => {
    it('should return syllabus', async () => {
      req.params.subjectOfferingId = 'so1';
      syllabusService.getBySubjectOffering.mockResolvedValue({});
      await syllabusController.getBySubjectOffering(req, res, next);
      expect(syllabusService.getBySubjectOffering).toHaveBeenCalledWith('so1');
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('getModuleQuestions', () => {
    it('should return paginated questions', async () => {
      req.params.id = 'm1';
      syllabusService.getModuleQuestions.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
      await syllabusController.getModuleQuestions(req, res, next);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
