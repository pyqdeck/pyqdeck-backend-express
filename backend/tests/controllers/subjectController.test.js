import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as subjectController from '../../src/controllers/subjectController.js';
import subjectService from '../../src/services/subjectService.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/services/subjectService.js', () => ({
  default: {
    list: vi.fn(),
    getBySlug: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('subjectController', () => {
  let req, res, next;

  const sampleSubject = {
    _id: 'sub_1',
    name: 'Compiler Design',
    slug: 'compiler-design',
    shortName: 'CD',
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
    it('should apply isActive:true filter by default', async () => {
      subjectService.list.mockResolvedValue({
        items: [sampleSubject],
        total: 1,
        page: 1,
        limit: 10,
      });

      await subjectController.list(req, res, next);

      expect(subjectService.list).toHaveBeenCalledWith(
        { isActive: true },
        req.pagination
      );
      expect(res.json).toHaveBeenCalled();
    });

    it('should skip isActive filter when query is "all"', async () => {
      req.query.isActive = 'all';
      subjectService.list.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 10,
      });

      await subjectController.list(req, res, next);

      expect(subjectService.list).toHaveBeenCalledWith({}, req.pagination);
    });

    it('should call next on error', async () => {
      subjectService.list.mockRejectedValue(new Error('DB error'));
      await subjectController.list(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  // ─── getBySlug ───────────────────────────────────────────────────────────────

  describe('getBySlug', () => {
    it('should return subject by slug', async () => {
      req.params.slug = 'compiler-design';
      subjectService.getBySlug.mockResolvedValue(sampleSubject);

      await subjectController.getBySlug(req, res, next);

      expect(subjectService.getBySlug).toHaveBeenCalledWith('compiler-design');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next with NotFoundError if not found', async () => {
      req.params.slug = 'unknown';
      subjectService.getBySlug.mockRejectedValue(
        new NotFoundError('Subject not found')
      );

      await subjectController.getBySlug(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  // ─── create ──────────────────────────────────────────────────────────────────

  describe('create', () => {
    it('should create subject and return 201', async () => {
      req.body = { name: 'Compiler Design', slug: 'compiler-design' };
      subjectService.create.mockResolvedValue(sampleSubject);

      await subjectController.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next on error', async () => {
      subjectService.create.mockRejectedValue(new Error('Conflict'));
      await subjectController.create(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  // ─── update ──────────────────────────────────────────────────────────────────

  describe('update', () => {
    it('should update subject and return 200', async () => {
      req.params.id = 'sub_1';
      req.body = { name: 'Updated Subject' };
      subjectService.update.mockResolvedValue({
        ...sampleSubject,
        name: 'Updated Subject',
      });

      await subjectController.update(req, res, next);

      expect(subjectService.update).toHaveBeenCalledWith('sub_1', {
        name: 'Updated Subject',
      });
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next on error', async () => {
      subjectService.update.mockRejectedValue(new NotFoundError('Not found'));
      await subjectController.update(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  // ─── remove ──────────────────────────────────────────────────────────────────

  describe('remove', () => {
    it('should delete subject and return 204', async () => {
      req.params.id = 'sub_1';
      subjectService.delete.mockResolvedValue(sampleSubject);

      await subjectController.remove(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      subjectService.delete.mockRejectedValue(new NotFoundError('Not found'));
      await subjectController.remove(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });
});
