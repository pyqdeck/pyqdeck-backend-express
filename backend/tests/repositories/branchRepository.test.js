import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { branchRepository } from '../../src/repositories/branchRepository.js';
import { Branch } from '../../src/models/Branch.js';
import { Semester } from '../../src/models/Semester.js';
import { SubjectOffering } from '../../src/models/SubjectOffering.js';
import { Subject } from '../../src/models/Subject.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('BranchRepository', () => {
  const universityId = new mongoose.Types.ObjectId();
  const branchData = {
    name: 'Computer Science',
    shortName: 'CSE',
    slug: 'cse',
    universityId,
  };

  beforeEach(async () => {
    await Branch.deleteMany({});
    await Semester.deleteMany({});
    await SubjectOffering.deleteMany({});
    await Subject.deleteMany({});
  });

  describe('create', () => {
    it('should create a new branch successfully', async () => {
      const branch = await branchRepository.create(branchData);
      expect(branch.name).toBe(branchData.name);
      expect(branch.universityId.toString()).toBe(universityId.toString());
    });

    it('should throw ConflictError if duplicate slug for same university', async () => {
      await branchRepository.create(branchData);
      await expect(branchRepository.create(branchData)).rejects.toThrow(
        ConflictError
      );
    });
  });

  describe('findById', () => {
    it('should find a branch by id', async () => {
      const created = await branchRepository.create(branchData);
      const branch = await branchRepository.findById(created.id);
      expect(branch.id).toBe(created.id);
    });
  });

  describe('findBySlug', () => {
    it('should find by slug and universityId', async () => {
      await branchRepository.create(branchData);
      const branch = await branchRepository.findBySlug(
        universityId,
        branchData.slug
      );
      expect(branch.slug).toBe(branchData.slug);
    });
  });

  describe('findByUniversityId', () => {
    it('should return branches for a university', async () => {
      await branchRepository.create(branchData);
      const result = await branchRepository.findByUniversityId(universityId, {
        page: 1,
        limit: 10,
      });
      expect(result.items).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      const created = await branchRepository.create(branchData);
      const updated = await branchRepository.update(created.id, { name: 'IT' });
      expect(updated.name).toBe('IT');
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await branchRepository.create(branchData);
      await branchRepository.delete(created.id);
      await expect(branchRepository.findById(created.id)).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('getStructure', () => {
    it('should return nested structure for a branch', async () => {
      const branch = await branchRepository.create(branchData);

      const semester = await Semester.create({
        branchId: branch._id,
        number: 1,
        slug: 'semester-1',
        title: 'Semester 1',
      });

      const subject = await Subject.create({
        name: 'Calculus',
        subjectCode: 'MATH101',
        slug: 'calculus',
      });

      await SubjectOffering.create({
        universityId,
        branchId: branch._id,
        semesterId: semester._id,
        subjectId: subject._id,
        regulation: '2023',
        slug: 'calculus-cse-sem1',
      });

      const structure = await branchRepository.getStructure(branch._id);

      expect(structure.semesters).toHaveLength(1);
      expect(structure.semesters[0].number).toBe(1);
      expect(structure.semesters[0].subjects).toHaveLength(1);
      expect(structure.semesters[0].subjects[0].regulation).toBe('2023');
    });
  });
});
