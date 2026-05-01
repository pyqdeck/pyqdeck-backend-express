import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { subjectOfferingRepository } from '../../src/repositories/subjectOfferingRepository.js';
import { SubjectOffering } from '../../src/models/SubjectOffering.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('SubjectOfferingRepository', () => {
  const universityId = new mongoose.Types.ObjectId();
  const branchId = new mongoose.Types.ObjectId();
  const semesterId = new mongoose.Types.ObjectId();
  const subjectId = new mongoose.Types.ObjectId();

  const offeringData = {
    universityId,
    branchId,
    semesterId,
    subjectId,
    slug: 'test-offering',
    regulation: '2023',
  };

  beforeEach(async () => {
    await SubjectOffering.deleteMany({});
  });

  describe('create', () => {
    it('should create successfully', async () => {
      const offering = await subjectOfferingRepository.create(offeringData);
      expect(offering.slug).toBe(offeringData.slug);
    });

    it('should throw ConflictError on duplicate slug', async () => {
      await subjectOfferingRepository.create(offeringData);
      await expect(
        subjectOfferingRepository.create({
          ...offeringData,
          regulation: '2024', // different regulation but same slug
        })
      ).rejects.toThrow(ConflictError);
    });
  });

  describe('findBySlug', () => {
    it('should find by slug', async () => {
      await subjectOfferingRepository.create(offeringData);
      const offering = await subjectOfferingRepository.findBySlug(
        offeringData.slug
      );
      expect(offering.slug).toBe(offeringData.slug);
    });
  });

  describe('findBySemesterId', () => {
    it('should return offerings for a semester', async () => {
      await subjectOfferingRepository.create(offeringData);
      const result = await subjectOfferingRepository.findBySemesterId(
        semesterId,
        { page: 1, limit: 10 }
      );
      expect(result.items).toHaveLength(1);
    });
  });

  describe('findByUniversityBranchSemester', () => {
    it('should return offerings for the combination', async () => {
      await subjectOfferingRepository.create(offeringData);
      const result =
        await subjectOfferingRepository.findByUniversityBranchSemester(
          universityId,
          branchId,
          semesterId,
          { page: 1, limit: 10 }
        );
      expect(result.items).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      const created = await subjectOfferingRepository.create(offeringData);
      const updated = await subjectOfferingRepository.update(created.id, {
        academicYear: '2023-24',
      });
      expect(updated.academicYear).toBe('2023-24');
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await subjectOfferingRepository.create(offeringData);
      await subjectOfferingRepository.delete(created.id);
      await expect(
        subjectOfferingRepository.findById(created.id)
      ).rejects.toThrow(NotFoundError);
    });
  });
});
