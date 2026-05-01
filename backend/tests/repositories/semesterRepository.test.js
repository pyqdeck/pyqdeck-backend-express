import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { semesterRepository } from '../../src/repositories/semesterRepository.js';
import { Semester } from '../../src/models/Semester.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('SemesterRepository', () => {
  const branchId = new mongoose.Types.ObjectId();
  const semesterData = {
    number: 1,
    slug: 'sem-1',
    branchId,
  };

  beforeEach(async () => {
    await Semester.deleteMany({});
  });

  describe('create', () => {
    it('should create successfully', async () => {
      const sem = await semesterRepository.create(semesterData);
      expect(sem.number).toBe(1);
    });

    it('should throw ConflictError on duplicate number/slug for same branch', async () => {
      await semesterRepository.create(semesterData);
      await expect(semesterRepository.create(semesterData)).rejects.toThrow(
        ConflictError
      );
    });
  });

  describe('findByBranchId', () => {
    it('should return sorted semesters', async () => {
      await semesterRepository.create({
        ...semesterData,
        number: 2,
        slug: 'sem-2',
      });
      await semesterRepository.create(semesterData);
      const sems = await semesterRepository.findByBranchId(branchId);
      expect(sems).toHaveLength(2);
      expect(sems[0].number).toBe(1);
      expect(sems[1].number).toBe(2);
    });
  });

  describe('findByBranchAndNumber', () => {
    it('should find successfully', async () => {
      await semesterRepository.create(semesterData);
      const sem = await semesterRepository.findByBranchAndNumber(branchId, 1);
      expect(sem.number).toBe(1);
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      const created = await semesterRepository.create(semesterData);
      const updated = await semesterRepository.update(created.id, {
        number: 3,
      });
      expect(updated.number).toBe(3);
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await semesterRepository.create(semesterData);
      await semesterRepository.delete(created.id);
      await expect(semesterRepository.findById(created.id)).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
