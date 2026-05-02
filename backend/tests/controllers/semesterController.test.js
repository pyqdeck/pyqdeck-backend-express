import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as semesterController from '../../src/controllers/semesterController.js';
import semesterService from '../../src/services/semesterService.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/services/semesterService.js', () => ({
  default: {
    listByBranch: vi.fn(),
    getByBranchAndNumber: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('semesterController', () => {
  let req, res, next;

  const sampleSemester = {
    _id: 'sem_1',
    branchId: 'branch_1',
    number: 5,
    slug: 'semester-5',
    title: 'Semester 5',
  };

  beforeEach(() => {
    req = {
      query: {},
      params: { branchId: 'branch_1' },
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
    it('should return all semesters for a branch', async () => {
      semesterService.listByBranch.mockResolvedValue([sampleSemester]);

      await semesterController.list(req, res, next);

      expect(semesterService.listByBranch).toHaveBeenCalledWith('branch_1');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next on error', async () => {
      semesterService.listByBranch.mockRejectedValue(new Error('DB error'));
      await semesterController.list(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getByNumber', () => {
    it('should return semester by branch and number', async () => {
      req.params.number = '5';
      semesterService.getByBranchAndNumber.mockResolvedValue(sampleSemester);

      await semesterController.getByNumber(req, res, next);

      // number is coerced to integer
      expect(semesterService.getByBranchAndNumber).toHaveBeenCalledWith(
        'branch_1',
        5
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next with NotFoundError if not found', async () => {
      req.params.number = '9';
      semesterService.getByBranchAndNumber.mockRejectedValue(
        new NotFoundError('Semester not found')
      );
      await semesterController.getByNumber(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  describe('create', () => {
    it('should merge branchId from params and return 201', async () => {
      req.body = { number: 5, slug: 'semester-5' };
      semesterService.create.mockResolvedValue(sampleSemester);

      await semesterController.create(req, res, next);

      expect(semesterService.create).toHaveBeenCalledWith({
        number: 5,
        slug: 'semester-5',
        branchId: 'branch_1',
      });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should call next on error', async () => {
      semesterService.create.mockRejectedValue(new Error('Conflict'));
      await semesterController.create(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('update', () => {
    it('should update semester and return 200', async () => {
      req.params.id = 'sem_1';
      req.body = { title: 'Fifth Semester' };
      semesterService.update.mockResolvedValue({
        ...sampleSemester,
        title: 'Fifth Semester',
      });

      await semesterController.update(req, res, next);

      expect(semesterService.update).toHaveBeenCalledWith('sem_1', {
        title: 'Fifth Semester',
      });
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next on error', async () => {
      semesterService.update.mockRejectedValue(new NotFoundError('Not found'));
      await semesterController.update(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  describe('remove', () => {
    it('should delete semester and return 204', async () => {
      req.params.id = 'sem_1';
      semesterService.delete.mockResolvedValue(sampleSemester);

      await semesterController.remove(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      semesterService.delete.mockRejectedValue(new NotFoundError('Not found'));
      await semesterController.remove(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });
});
