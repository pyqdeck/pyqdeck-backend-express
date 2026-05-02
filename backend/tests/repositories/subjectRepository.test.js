import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { subjectRepository } from '../../src/repositories/subjectRepository.js';
import { Subject } from '../../src/models/Subject.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('SubjectRepository', () => {
  const subjectData = {
    name: 'Mathematics I',
    slug: 'maths-1',
    subjectCode: 'MA101',
  };

  beforeAll(async () => {
    await Subject.syncIndexes();
  });

  beforeEach(async () => {
    await Subject.deleteMany({});
  });

  describe('create', () => {
    it('should create successfully', async () => {
      const subject = await subjectRepository.create(subjectData);
      expect(subject.name).toBe(subjectData.name);
    });

    it('should throw ConflictError on duplicate slug or code', async () => {
      await subjectRepository.create(subjectData);
      await expect(subjectRepository.create(subjectData)).rejects.toThrow(
        ConflictError
      );
    });
  });

  describe('findBySlug', () => {
    it('should find by slug', async () => {
      await subjectRepository.create(subjectData);
      const subject = await subjectRepository.findBySlug(subjectData.slug);
      expect(subject.slug).toBe(subjectData.slug);
    });
  });

  describe('findAll', () => {
    it('should return paginated subjects', async () => {
      await subjectRepository.create(subjectData);
      const result = await subjectRepository.findAll(
        {},
        { page: 1, limit: 10 }
      );
      expect(result.items).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      const created = await subjectRepository.create(subjectData);
      const updated = await subjectRepository.update(created.id, {
        name: 'Maths',
      });
      expect(updated.name).toBe('Maths');
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await subjectRepository.create(subjectData);
      await subjectRepository.delete(created.id);
      await expect(subjectRepository.findById(created.id)).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
