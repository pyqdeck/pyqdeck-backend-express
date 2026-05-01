import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { syllabusRepository } from '../../src/repositories/syllabusRepository.js';
import { Syllabus } from '../../src/models/Syllabus.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('SyllabusRepository', () => {
  const subjectOfferingId = new mongoose.Types.ObjectId();
  const syllabusData = {
    subjectOfferingId,
    description: 'Test Syllabus Description',
  };

  beforeEach(async () => {
    await Syllabus.deleteMany({});
  });

  describe('create', () => {
    it('should create a new syllabus successfully', async () => {
      const syllabus = await syllabusRepository.create(syllabusData);
      expect(syllabus.subjectOfferingId.toString()).toBe(subjectOfferingId.toString());
      expect(syllabus.description).toBe(syllabusData.description);
    });

    it('should throw ConflictError if syllabus for same subject offering exists', async () => {
      await syllabusRepository.create(syllabusData);
      await expect(syllabusRepository.create(syllabusData)).rejects.toThrow(ConflictError);
    });
  });

  describe('findById', () => {
    it('should find a syllabus by id', async () => {
      const created = await syllabusRepository.create(syllabusData);
      const syllabus = await syllabusRepository.findById(created.id);
      expect(syllabus.id).toBe(created.id);
    });

    it('should throw NotFoundError if syllabus does not exist', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      await expect(syllabusRepository.findById(nonExistentId)).rejects.toThrow(NotFoundError);
    });
  });

  describe('findBySubjectOffering', () => {
    it('should find a syllabus by subject offering id', async () => {
      await syllabusRepository.create(syllabusData);
      const syllabus = await syllabusRepository.findBySubjectOffering(subjectOfferingId);
      expect(syllabus.subjectOfferingId.toString()).toBe(subjectOfferingId.toString());
    });

    it('should throw NotFoundError if syllabus not found for offering', async () => {
      const otherOfferingId = new mongoose.Types.ObjectId();
      await expect(syllabusRepository.findBySubjectOffering(otherOfferingId)).rejects.toThrow(NotFoundError);
    });
  });

  describe('update', () => {
    it('should update a syllabus successfully', async () => {
      const created = await syllabusRepository.create(syllabusData);
      const updateData = { description: 'Updated Description' };
      const updated = await syllabusRepository.update(created.id, updateData);
      expect(updated.description).toBe(updateData.description);
    });

    it('should throw NotFoundError when updating non-existent syllabus', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      await expect(syllabusRepository.update(nonExistentId, { description: 'New' })).rejects.toThrow(NotFoundError);
    });
  });

  describe('delete', () => {
    it('should delete a syllabus successfully', async () => {
      const created = await syllabusRepository.create(syllabusData);
      await syllabusRepository.delete(created.id);
      await expect(syllabusRepository.findById(created.id)).rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError when deleting non-existent syllabus', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      await expect(syllabusRepository.delete(nonExistentId)).rejects.toThrow(NotFoundError);
    });
  });
});
