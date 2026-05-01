import { describe, it, expect, beforeEach } from 'vitest';
import { universityRepository } from '../../src/repositories/universityRepository.js';
import { University } from '../../src/models/University.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('UniversityRepository', () => {
  const universityData = {
    name: 'Test University',
    shortName: 'TU',
    slug: 'test-university',
  };

  beforeEach(async () => {
    await University.deleteMany({});
  });

  describe('create', () => {
    it('should create a new university successfully', async () => {
      const university = await universityRepository.create(universityData);
      expect(university.name).toBe(universityData.name);
      expect(university.slug).toBe(universityData.slug);
    });

    it('should throw ConflictError if university with same slug exists', async () => {
      await universityRepository.create(universityData);
      await expect(universityRepository.create(universityData)).rejects.toThrow(
        ConflictError
      );
    });
  });

  describe('findById', () => {
    it('should find a university by id', async () => {
      const created = await universityRepository.create(universityData);
      const university = await universityRepository.findById(created.id);
      expect(university.id).toBe(created.id);
    });

    it('should throw NotFoundError if not found', async () => {
      await expect(
        universityRepository.findById('507f1f77bcf86cd799439011')
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('findBySlug', () => {
    it('should find a university by slug', async () => {
      await universityRepository.create(universityData);
      const university = await universityRepository.findBySlug(
        universityData.slug
      );
      expect(university.slug).toBe(universityData.slug);
    });

    it('should find a university by redirectSlugs', async () => {
      await universityRepository.create({
        ...universityData,
        redirectSlugs: ['old-slug'],
      });
      const university = await universityRepository.findBySlug('old-slug');
      expect(university.slug).toBe(universityData.slug);
    });

    it('should throw NotFoundError if not found', async () => {
      await expect(
        universityRepository.findBySlug('non-existent')
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('findAll', () => {
    it('should return paginated universities', async () => {
      await universityRepository.create(universityData);
      const result = await universityRepository.findAll(
        {},
        { page: 1, limit: 10 }
      );
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      const created = await universityRepository.create(universityData);
      const updated = await universityRepository.update(created.id, {
        name: 'Updated name',
      });
      expect(updated.name).toBe('Updated name');
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await universityRepository.create(universityData);
      await universityRepository.delete(created.id);
      await expect(universityRepository.findById(created.id)).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('existsBySlug', () => {
    it('should return true if exists', async () => {
      await universityRepository.create(universityData);
      const exists = await universityRepository.existsBySlug(
        universityData.slug
      );
      expect(exists).toBe(true);
    });

    it('should return false if does not exist', async () => {
      const exists = await universityRepository.existsBySlug('none');
      expect(exists).toBe(false);
    });
  });
});
