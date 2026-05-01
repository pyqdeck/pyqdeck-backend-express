import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { topicRepository } from '../../src/repositories/topicRepository.js';
import { Topic } from '../../src/models/Topic.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('TopicRepository', () => {
  const moduleId = new mongoose.Types.ObjectId();
  const topicData = {
    moduleId,
    title: 'Test Topic',
    slug: 'test-topic',
    order: 1,
  };

  beforeEach(async () => {
    await Topic.deleteMany({});
  });

  describe('create', () => {
    it('should create a new topic successfully', async () => {
      const topic = await topicRepository.create(topicData);
      expect(topic.title).toBe(topicData.title);
      expect(topic.moduleId.toString()).toBe(moduleId.toString());
    });

    it('should throw ConflictError on duplicate slug for same module', async () => {
      await topicRepository.create(topicData);
      await expect(topicRepository.create(topicData)).rejects.toThrow(
        ConflictError
      );
    });
  });

  describe('findById', () => {
    it('should find a topic by id', async () => {
      const created = await topicRepository.create(topicData);
      const topic = await topicRepository.findById(created.id);
      expect(topic.id).toBe(created.id);
    });

    it('should throw NotFoundError if not found', async () => {
      await expect(
        topicRepository.findById(new mongoose.Types.ObjectId())
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('findByModule', () => {
    it('should return paginated topics for a module sorted by order', async () => {
      await topicRepository.create({ ...topicData, slug: 't2', order: 2 });
      await topicRepository.create(topicData);
      const result = await topicRepository.findByModule(moduleId, {
        page: 1,
        limit: 10,
      });
      expect(result.items).toHaveLength(2);
      expect(result.items[0].order).toBe(1);
      expect(result.items[1].order).toBe(2);
    });
  });

  describe('findByModuleAndSlug', () => {
    it('should find a topic by module and slug', async () => {
      await topicRepository.create(topicData);
      const topic = await topicRepository.findByModuleAndSlug(
        moduleId,
        topicData.slug
      );
      expect(topic.slug).toBe(topicData.slug);
    });

    it('should find by redirectSlugs', async () => {
      await topicRepository.create({
        ...topicData,
        redirectSlugs: ['old-topic-slug'],
      });
      const topic = await topicRepository.findByModuleAndSlug(
        moduleId,
        'old-topic-slug'
      );
      expect(topic.slug).toBe(topicData.slug);
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      const created = await topicRepository.create(topicData);
      const updated = await topicRepository.update(created.id, {
        title: 'Updated Topic',
      });
      expect(updated.title).toBe('Updated Topic');
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await topicRepository.create(topicData);
      await topicRepository.delete(created.id);
      await expect(topicRepository.findById(created.id)).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
