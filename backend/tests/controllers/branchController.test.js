import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as branchController from '../../src/controllers/branchController.js';
import branchService from '../../src/services/branchService.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/services/branchService.js', () => ({
  default: {
    listByUniversity: vi.fn(),
    getBySlug: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    getStructure: vi.fn(),
  },
}));

describe('branchController', () => {
  let req, res, next;

  const sampleBranch = {
    _id: 'branch_1',
    universityId: 'uni_1',
    name: 'Computer Science & Engineering',
    shortName: 'CSE',
    slug: 'cse',
  };

  beforeEach(() => {
    req = {
      query: {},
      params: { universityId: 'uni_1' },
      body: {},
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

  describe('list', () => {
    it('should apply isActive:true filter by default', async () => {
      branchService.listByUniversity.mockResolvedValue({
        items: [sampleBranch],
        total: 1,
        page: 1,
        limit: 10,
      });

      await branchController.list(req, res, next);

      expect(branchService.listByUniversity).toHaveBeenCalledWith(
        'uni_1',
        req.pagination,
        { isActive: 'true' }
      );
      expect(res.json).toHaveBeenCalled();
    });

    it('should skip isActive filter when query is "all"', async () => {
      req.query.isActive = 'all';
      branchService.listByUniversity.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 10,
      });

      await branchController.list(req, res, next);

      expect(branchService.listByUniversity).toHaveBeenCalledWith(
        'uni_1',
        req.pagination,
        { isActive: 'all' }
      );
    });

    it('should call next on error', async () => {
      branchService.listByUniversity.mockRejectedValue(new Error('DB error'));
      await branchController.list(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getStructure', () => {
    it('should return branch structure', async () => {
      req.params.id = 'branch_1';
      branchService.getStructure.mockResolvedValue({
        id: 'branch_1',
        semesters: [],
      });

      await branchController.getStructure(req, res, next);

      expect(branchService.getStructure).toHaveBeenCalledWith('branch_1');
      expect(res.json).toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      req.params.id = 'branch_1';
      branchService.getStructure.mockRejectedValue(new Error('err'));
      await branchController.getStructure(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getBySlug', () => {
    it('should return branch by universityId and slug', async () => {
      req.params.slug = 'cse';
      branchService.getBySlug.mockResolvedValue(sampleBranch);

      await branchController.getBySlug(req, res, next);

      expect(branchService.getBySlug).toHaveBeenCalledWith('uni_1', 'cse');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next with NotFoundError if not found', async () => {
      req.params.slug = 'unknown';
      branchService.getBySlug.mockRejectedValue(
        new NotFoundError('Branch not found')
      );
      await branchController.getBySlug(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  describe('create', () => {
    it('should merge universityId from params and return 201', async () => {
      req.body = { name: 'CSE', shortName: 'CSE', slug: 'cse' };
      branchService.create.mockResolvedValue(sampleBranch);

      await branchController.create(req, res, next);

      expect(branchService.create).toHaveBeenCalledWith({
        name: 'CSE',
        shortName: 'CSE',
        slug: 'cse',
        universityId: 'uni_1',
      });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should call next on error', async () => {
      branchService.create.mockRejectedValue(new Error('Conflict'));
      await branchController.create(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('update', () => {
    it('should update branch and return 200', async () => {
      req.params.id = 'branch_1';
      req.body = { name: 'Updated CSE' };
      branchService.update.mockResolvedValue({
        ...sampleBranch,
        name: 'Updated CSE',
      });

      await branchController.update(req, res, next);

      expect(branchService.update).toHaveBeenCalledWith('branch_1', {
        name: 'Updated CSE',
      });
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next on error', async () => {
      branchService.update.mockRejectedValue(new NotFoundError('Not found'));
      await branchController.update(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  describe('remove', () => {
    it('should delete branch and return 204', async () => {
      req.params.id = 'branch_1';
      branchService.delete.mockResolvedValue(sampleBranch);

      await branchController.remove(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      branchService.delete.mockRejectedValue(new NotFoundError('Not found'));
      await branchController.remove(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });
});
