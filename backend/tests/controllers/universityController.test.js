import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as universityController from '../../src/controllers/universityController.js';
import universityService from '../../src/services/universityService.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/services/universityService.js', () => ({
  default: {
    list: vi.fn(),
    getBySlug: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('universityController', () => {
  let req, res, next;

  const sampleUniversity = {
    _id: 'uni_1',
    name: 'CSVTU',
    slug: 'csvtu',
    shortName: 'CSVTU',
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
      universityService.list.mockResolvedValue({
        items: [sampleUniversity],
        total: 1,
        page: 1,
        limit: 10,
      });

      await universityController.list(req, res, next);

      expect(universityService.list).toHaveBeenCalledWith(
        { isActive: true },
        req.pagination
      );
      expect(res.json).toHaveBeenCalled();
    });

    it('should skip isActive filter when query is "all"', async () => {
      req.query.isActive = 'all';
      universityService.list.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 10,
      });

      await universityController.list(req, res, next);

      expect(universityService.list).toHaveBeenCalledWith({}, req.pagination);
    });

    it('should call next on error', async () => {
      universityService.list.mockRejectedValue(new Error('DB error'));
      await universityController.list(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  // ─── getBySlug ───────────────────────────────────────────────────────────────

  describe('getBySlug', () => {
    it('should return university by slug', async () => {
      req.params.slug = 'csvtu';
      universityService.getBySlug.mockResolvedValue(sampleUniversity);

      await universityController.getBySlug(req, res, next);

      expect(universityService.getBySlug).toHaveBeenCalledWith('csvtu');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next with NotFoundError if not found', async () => {
      req.params.slug = 'unknown';
      universityService.getBySlug.mockRejectedValue(
        new NotFoundError('University not found')
      );

      await universityController.getBySlug(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  // ─── create ──────────────────────────────────────────────────────────────────

  describe('create', () => {
    it('should create university and return 201', async () => {
      req.body = { name: 'CSVTU', slug: 'csvtu', shortName: 'CSVTU' };
      universityService.create.mockResolvedValue(sampleUniversity);

      await universityController.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next on error', async () => {
      universityService.create.mockRejectedValue(new Error('Conflict'));
      await universityController.create(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  // ─── update ──────────────────────────────────────────────────────────────────

  describe('update', () => {
    it('should update university and return 200', async () => {
      req.params.id = 'uni_1';
      req.body = { name: 'Updated' };
      universityService.update.mockResolvedValue({
        ...sampleUniversity,
        name: 'Updated',
      });

      await universityController.update(req, res, next);

      expect(universityService.update).toHaveBeenCalledWith('uni_1', {
        name: 'Updated',
      });
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next on error', async () => {
      universityService.update.mockRejectedValue(
        new NotFoundError('Not found')
      );
      await universityController.update(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  // ─── remove ──────────────────────────────────────────────────────────────────

  describe('remove', () => {
    it('should delete university and return 204', async () => {
      req.params.id = 'uni_1';
      universityService.delete.mockResolvedValue(sampleUniversity);

      await universityController.remove(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      universityService.delete.mockRejectedValue(
        new NotFoundError('Not found')
      );
      await universityController.remove(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });
});
