import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as subjectOfferingController from '../../src/controllers/subjectOfferingController.js';
import subjectOfferingService from '../../src/services/subjectOfferingService.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/services/subjectOfferingService.js', () => ({
  default: {
    list: vi.fn(),
    getBySlug: vi.fn(),
    getById: vi.fn(),
    listBySemester: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('subjectOfferingController', () => {
  let req, res, next;

  const sampleOffering = {
    _id: 'offering_1',
    universityId: 'uni_1',
    branchId: 'branch_1',
    semesterId: 'sem_1',
    subjectId: 'sub_1',
    slug: 'csvtu-cse-sem5-compiler-design',
  };

  beforeEach(() => {
    req = {
      query: {},
      params: {},
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

  // ─── list ────────────────────────────────────────────────────────────────────

  describe('list', () => {
    it('should use full-filter path when universityId+branchId+semesterId all provided', async () => {
      req.query = {
        universityId: 'uni_1',
        branchId: 'branch_1',
        semesterId: 'sem_1',
      };
      subjectOfferingService.list.mockResolvedValue({
        items: [sampleOffering],
        total: 1,
        page: 1,
        limit: 10,
      });

      await subjectOfferingController.list(req, res, next);

      expect(subjectOfferingService.list).toHaveBeenCalledWith(
        { universityId: 'uni_1', branchId: 'branch_1', semesterId: 'sem_1' },
        req.pagination
      );
      expect(res.json).toHaveBeenCalled();
    });

    it('should use semesterId-only path when only semesterId provided', async () => {
      req.query = { semesterId: 'sem_1' };
      subjectOfferingService.listBySemester.mockResolvedValue({
        items: [sampleOffering],
        total: 1,
        page: 1,
        limit: 10,
      });

      await subjectOfferingController.list(req, res, next);

      expect(subjectOfferingService.listBySemester).toHaveBeenCalledWith(
        'sem_1',
        req.pagination,
        { isActive: true }
      );
    });

    it('should skip isActive filter on semesterId-only path when isActive=all', async () => {
      req.query = { semesterId: 'sem_1', isActive: 'all' };
      subjectOfferingService.listBySemester.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 10,
      });

      await subjectOfferingController.list(req, res, next);

      expect(subjectOfferingService.listBySemester).toHaveBeenCalledWith(
        'sem_1',
        req.pagination,
        {}
      );
    });

    it('should use general list when no filters are given', async () => {
      req.query = {};
      subjectOfferingService.list.mockResolvedValue({
        items: [sampleOffering],
        total: 1,
        page: 1,
        limit: 10,
      });

      await subjectOfferingController.list(req, res, next);

      expect(subjectOfferingService.list).toHaveBeenCalledWith(
        { universityId: undefined, branchId: undefined, semesterId: undefined },
        req.pagination
      );
      expect(res.json).toHaveBeenCalled();
    });

    it('should use general list when only universityId is given', async () => {
      req.query = { universityId: 'uni_1' };
      subjectOfferingService.list.mockResolvedValue({
        items: [sampleOffering],
        total: 1,
        page: 1,
        limit: 10,
      });

      await subjectOfferingController.list(req, res, next);

      expect(subjectOfferingService.list).toHaveBeenCalledWith(
        { universityId: 'uni_1', branchId: undefined, semesterId: undefined },
        req.pagination
      );
      expect(res.json).toHaveBeenCalled();
    });

    it('should use general list when universityId+branchId given without semesterId', async () => {
      req.query = { universityId: 'uni_1', branchId: 'branch_1' };
      subjectOfferingService.list.mockResolvedValue({
        items: [sampleOffering],
        total: 1,
        page: 1,
        limit: 10,
      });

      await subjectOfferingController.list(req, res, next);

      expect(subjectOfferingService.list).toHaveBeenCalledWith(
        { universityId: 'uni_1', branchId: 'branch_1', semesterId: undefined },
        req.pagination
      );
      expect(res.json).toHaveBeenCalled();
    });

    it('should call next on service error', async () => {
      req.query = { semesterId: 'sem_1' };
      subjectOfferingService.listBySemester.mockRejectedValue(
        new Error('DB error')
      );
      await subjectOfferingController.list(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  // ─── getBySlug ───────────────────────────────────────────────────────────────

  describe('getBySlug', () => {
    it('should return offering by slug', async () => {
      req.params.slug = 'csvtu-cse-sem5-compiler-design';
      subjectOfferingService.getBySlug.mockResolvedValue(sampleOffering);

      await subjectOfferingController.getBySlug(req, res, next);

      expect(subjectOfferingService.getBySlug).toHaveBeenCalledWith(
        'csvtu-cse-sem5-compiler-design'
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next with NotFoundError if not found', async () => {
      req.params.slug = 'unknown';
      subjectOfferingService.getBySlug.mockRejectedValue(
        new NotFoundError('Subject offering not found')
      );
      await subjectOfferingController.getBySlug(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  // ─── getById ─────────────────────────────────────────────────────────────────

  describe('getById', () => {
    it('should return offering by id', async () => {
      req.params.id = 'offering_1';
      subjectOfferingService.getById.mockResolvedValue(sampleOffering);

      await subjectOfferingController.getById(req, res, next);

      expect(subjectOfferingService.getById).toHaveBeenCalledWith('offering_1');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next with NotFoundError if not found', async () => {
      req.params.id = 'bad_id';
      subjectOfferingService.getById.mockRejectedValue(
        new NotFoundError('Subject offering not found')
      );
      await subjectOfferingController.getById(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  // ─── create ──────────────────────────────────────────────────────────────────

  describe('create', () => {
    it('should create offering and return 201', async () => {
      req.body = { ...sampleOffering };
      subjectOfferingService.create.mockResolvedValue(sampleOffering);

      await subjectOfferingController.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next on error', async () => {
      subjectOfferingService.create.mockRejectedValue(new Error('Conflict'));
      await subjectOfferingController.create(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  // ─── update ──────────────────────────────────────────────────────────────────

  describe('update', () => {
    it('should update offering and return 200', async () => {
      req.params.id = 'offering_1';
      req.body = { regulation: '2022' };
      subjectOfferingService.update.mockResolvedValue({
        ...sampleOffering,
        regulation: '2022',
      });

      await subjectOfferingController.update(req, res, next);

      expect(subjectOfferingService.update).toHaveBeenCalledWith('offering_1', {
        regulation: '2022',
      });
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next on error', async () => {
      subjectOfferingService.update.mockRejectedValue(
        new NotFoundError('Not found')
      );
      await subjectOfferingController.update(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  // ─── remove ──────────────────────────────────────────────────────────────────

  describe('remove', () => {
    it('should delete offering and return 204', async () => {
      req.params.id = 'offering_1';
      subjectOfferingService.delete.mockResolvedValue(sampleOffering);

      await subjectOfferingController.remove(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      subjectOfferingService.delete.mockRejectedValue(
        new NotFoundError('Not found')
      );
      await subjectOfferingController.remove(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });
});
