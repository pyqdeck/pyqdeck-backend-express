import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { moduleRepository } from '../../src/repositories/moduleRepository.js';
import { Module } from '../../src/models/Module.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('ModuleRepository', () => {
  const syllabusId = new mongoose.Types.ObjectId();
  const moduleData = {
    syllabusId,
    moduleNumber: 1,
    title: 'Test Module',
    slug: 'test-module',
    order: 1,
  };

  beforeEach(async () => {
    await Module.deleteMany({});
  });

  describe('create', () => {
    it('should create a new module successfully', async () => {
      const module = await moduleRepository.create(moduleData);
      expect(module.title).toBe(moduleData.title);
      expect(module.syllabusId.toString()).toBe(syllabusId.toString());
    });

    it('should throw ConflictError on duplicate module number for same syllabus', async () => {
      await moduleRepository.create(moduleData);
      await expect(moduleRepository.create({
        ...moduleData,
        slug: 'different-slug'
      })).rejects.toThrow(ConflictError);
    });

    it('should throw ConflictError on duplicate slug for same syllabus', async () => {
      await moduleRepository.create(moduleData);
      await expect(moduleRepository.create({
        ...moduleData,
        moduleNumber: 2
      })).rejects.toThrow(ConflictError);
    });
  });

  describe('findById', () => {
    it('should find a module by id', async () => {
      const created = await moduleRepository.create(moduleData);
      const module = await moduleRepository.findById(created.id);
      expect(module.id).toBe(created.id);
    });
  });

  describe('findBySyllabus', () => {
    it('should return paginated modules for a syllabus sorted by order', async () => {
      await moduleRepository.create({ ...moduleData, moduleNumber: 2, slug: 'm2', order: 2 });
      await moduleRepository.create(moduleData);
      const result = await moduleRepository.findBySyllabus(syllabusId, { page: 1, limit: 10 });
      expect(result.items).toHaveLength(2);
      expect(result.items[0].moduleNumber).toBe(1);
      expect(result.items[1].moduleNumber).toBe(2);
    });
  });

  describe('findBySyllabusAndSlug', () => {
    it('should find a module by syllabus and slug', async () => {
      await moduleRepository.create(moduleData);
      const module = await moduleRepository.findBySyllabusAndSlug(syllabusId, moduleData.slug);
      expect(module.slug).toBe(moduleData.slug);
    });

    it('should find by redirectSlugs', async () => {
      await moduleRepository.create({ ...moduleData, redirectSlugs: ['old-slug'] });
      const module = await moduleRepository.findBySyllabusAndSlug(syllabusId, 'old-slug');
      expect(module.slug).toBe(moduleData.slug);
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      const created = await moduleRepository.create(moduleData);
      const updated = await moduleRepository.update(created.id, { title: 'Updated Title' });
      expect(updated.title).toBe('Updated Title');
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await moduleRepository.create(moduleData);
      await moduleRepository.delete(created.id);
      await expect(moduleRepository.findById(created.id)).rejects.toThrow(NotFoundError);
    });
  });
});
