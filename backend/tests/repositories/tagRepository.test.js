import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { tagRepository } from '../../src/repositories/tagRepository.js';
import { Tag } from '../../src/models/Tag.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('TagRepository', () => {
  const tagData = {
    name: 'Test Tag',
    slug: 'test-tag',
    description: 'A test tag description',
  };

  beforeEach(async () => {
    await Tag.deleteMany({});
  });

  describe('create', () => {
    it('should create a new tag successfully', async () => {
      const tag = await tagRepository.create(tagData);
      expect(tag.name).toBe(tagData.name);
      expect(tag.slug).toBe(tagData.slug);
    });

    it('should throw ConflictError on duplicate name', async () => {
      await tagRepository.create(tagData);
      await expect(
        tagRepository.create({ ...tagData, slug: 'other' })
      ).rejects.toThrow(ConflictError);
    });

    it('should throw ConflictError on duplicate slug', async () => {
      await tagRepository.create(tagData);
      await expect(
        tagRepository.create({ ...tagData, name: 'other' })
      ).rejects.toThrow(ConflictError);
    });
  });

  describe('findById', () => {
    it('should find a tag by id', async () => {
      const created = await tagRepository.create(tagData);
      const tag = await tagRepository.findById(created.id);
      expect(tag.id).toBe(created.id);
    });
  });

  describe('findBySlug', () => {
    it('should find by slug', async () => {
      await tagRepository.create(tagData);
      const tag = await tagRepository.findBySlug(tagData.slug);
      expect(tag.slug).toBe(tagData.slug);
    });

    it('should find by redirectSlugs', async () => {
      await tagRepository.create({
        ...tagData,
        redirectSlugs: ['old-tag-slug'],
      });
      const tag = await tagRepository.findBySlug('old-tag-slug');
      expect(tag.slug).toBe(tagData.slug);
    });
  });

  describe('findByIds', () => {
    it('should return multiple tags by ids', async () => {
      const t1 = await tagRepository.create(tagData);
      const t2 = await tagRepository.create({ name: 'T2', slug: 't2' });
      const tags = await tagRepository.findByIds([t1.id, t2.id]);
      expect(tags).toHaveLength(2);
    });
  });

  describe('findAll', () => {
    it('should return paginated tags sorted by usageCount', async () => {
      await tagRepository.create({ ...tagData, usageCount: 10 });
      await tagRepository.create({ name: 'T2', slug: 't2', usageCount: 20 });
      const result = await tagRepository.findAll({}, { page: 1, limit: 10 });
      expect(result.items[0].slug).toBe('t2');
      expect(result.items[1].slug).toBe('test-tag');
    });
  });

  describe('incrementUsage / decrementUsage', () => {
    it('should increment usageCount', async () => {
      const tag = await tagRepository.create(tagData);
      const updated = await tagRepository.incrementUsage(tag.id);
      expect(updated.usageCount).toBe(1);
    });

    it('should decrement usageCount', async () => {
      const tag = await tagRepository.create({ ...tagData, usageCount: 5 });
      const updated = await tagRepository.decrementUsage(tag.id);
      expect(updated.usageCount).toBe(4);
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      const created = await tagRepository.create(tagData);
      const updated = await tagRepository.update(created.id, {
        name: 'Updated Tag',
      });
      expect(updated.name).toBe('Updated Tag');
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await tagRepository.create(tagData);
      await tagRepository.delete(created.id);
      await expect(tagRepository.findById(created.id)).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
