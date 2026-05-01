import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { paperRepository } from '../../src/repositories/paperRepository.js';
import { Paper } from '../../src/models/Paper.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('PaperRepository', () => {
  const subjectOfferingId = new mongoose.Types.ObjectId();
  const paperData = {
    subjectOfferingId,
    title: 'Compiler Design 2023',
    examYear: 2023,
    examType: 'regular',
    slug: 'cd-2023-regular',
  };

  beforeEach(async () => {
    await Paper.deleteMany({});
  });

  describe('create', () => {
    it('should create successfully', async () => {
      const paper = await paperRepository.create(paperData);
      expect(paper.title).toBe(paperData.title);
      expect(paper.slug).toBe(paperData.slug);
    });

    it('should throw ConflictError on duplicate slug', async () => {
      await paperRepository.create(paperData);
      await expect(paperRepository.create(paperData)).rejects.toThrow(
        ConflictError
      );
    });
  });

  describe('findById / findBySlug', () => {
    it('should find by id', async () => {
      const created = await paperRepository.create(paperData);
      const paper = await paperRepository.findById(created.id);
      expect(paper.id).toBe(created.id);
    });

    it('should find by slug', async () => {
      await paperRepository.create(paperData);
      const paper = await paperRepository.findBySlug(paperData.slug);
      expect(paper.slug).toBe(paperData.slug);
    });
  });

  describe('findBySubjectOffering', () => {
    it('should return paginated papers sorted by examYear desc', async () => {
      await paperRepository.create({
        ...paperData,
        examYear: 2022,
        slug: 'cd-2022',
      });
      await paperRepository.create(paperData);
      const result = await paperRepository.findBySubjectOffering(
        subjectOfferingId,
        { page: 1, limit: 10 }
      );
      expect(result.items).toHaveLength(2);
      expect(result.items[0].examYear).toBe(2023);
      expect(result.items[1].examYear).toBe(2022);
    });
  });

  describe('updateStatus', () => {
    it('should update status successfully', async () => {
      const created = await paperRepository.create(paperData);
      const updated = await paperRepository.updateStatus(
        created.id,
        'approved'
      );
      expect(updated.status).toBe('approved');
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      const created = await paperRepository.create(paperData);
      const updated = await paperRepository.update(created.id, {
        title: 'Updated Title',
      });
      expect(updated.title).toBe('Updated Title');
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await paperRepository.create(paperData);
      await paperRepository.delete(created.id);
      await expect(paperRepository.findById(created.id)).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
