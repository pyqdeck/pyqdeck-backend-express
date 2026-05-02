import { describe, it, expect, beforeEach, vi } from 'vitest';
import { subjectService } from '../../src/services/subjectService.js';
import subjectRepository from '../../src/repositories/subjectRepository.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/repositories/subjectRepository.js', () => ({
  default: {
    findAll: vi.fn(),
    findBySlug: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('SubjectService', () => {
  const sampleSubject = {
    _id: 'sub_1',
    name: 'Compiler Design',
    slug: 'compiler-design',
    shortName: 'CD',
    subjectCode: 'CS101',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('should return paginated subjects', async () => {
      const mockResult = {
        items: [sampleSubject],
        total: 1,
        page: 1,
        limit: 10,
      };
      subjectRepository.findAll.mockResolvedValue(mockResult);

      const result = await subjectService.list({}, { page: 1, limit: 10 });

      expect(subjectRepository.findAll).toHaveBeenCalledWith(
        {},
        { page: 1, limit: 10 }
      );
      expect(result).toEqual(mockResult);
    });

    it('should pass filter to repository', async () => {
      subjectRepository.findAll.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 10,
      });
      await subjectService.list({ isActive: true }, { page: 1, limit: 10 });
      expect(subjectRepository.findAll).toHaveBeenCalledWith(
        { isActive: true },
        { page: 1, limit: 10 }
      );
    });
  });

  describe('getBySlug', () => {
    it('should return subject by slug', async () => {
      subjectRepository.findBySlug.mockResolvedValue(sampleSubject);
      const result = await subjectService.getBySlug('compiler-design');
      expect(subjectRepository.findBySlug).toHaveBeenCalledWith(
        'compiler-design'
      );
      expect(result).toEqual(sampleSubject);
    });

    it('should throw NotFoundError for unknown slug', async () => {
      subjectRepository.findBySlug.mockRejectedValue(
        new NotFoundError('Subject not found')
      );
      await expect(subjectService.getBySlug('unknown')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('getById', () => {
    it('should return subject by id', async () => {
      subjectRepository.findById.mockResolvedValue(sampleSubject);
      const result = await subjectService.getById('sub_1');
      expect(subjectRepository.findById).toHaveBeenCalledWith('sub_1');
      expect(result).toEqual(sampleSubject);
    });

    it('should throw NotFoundError for unknown id', async () => {
      subjectRepository.findById.mockRejectedValue(
        new NotFoundError('Subject not found')
      );
      await expect(subjectService.getById('bad_id')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('create', () => {
    it('should create and return a subject', async () => {
      subjectRepository.create.mockResolvedValue(sampleSubject);
      const result = await subjectService.create(sampleSubject);
      expect(subjectRepository.create).toHaveBeenCalledWith(sampleSubject);
      expect(result).toEqual(sampleSubject);
    });
  });

  describe('update', () => {
    it('should update and return the subject', async () => {
      const updated = { ...sampleSubject, name: 'Updated Subject' };
      subjectRepository.update.mockResolvedValue(updated);
      const result = await subjectService.update('sub_1', {
        name: 'Updated Subject',
      });
      expect(subjectRepository.update).toHaveBeenCalledWith('sub_1', {
        name: 'Updated Subject',
      });
      expect(result.name).toBe('Updated Subject');
    });

    it('should throw NotFoundError for unknown id', async () => {
      subjectRepository.update.mockRejectedValue(
        new NotFoundError('Subject not found')
      );
      await expect(subjectService.update('bad_id', {})).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('delete', () => {
    it('should delete and return the subject', async () => {
      subjectRepository.delete.mockResolvedValue(sampleSubject);
      const result = await subjectService.delete('sub_1');
      expect(subjectRepository.delete).toHaveBeenCalledWith('sub_1');
      expect(result).toEqual(sampleSubject);
    });

    it('should throw NotFoundError for unknown id', async () => {
      subjectRepository.delete.mockRejectedValue(
        new NotFoundError('Subject not found')
      );
      await expect(subjectService.delete('bad_id')).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
