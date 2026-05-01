import { describe, it, expect, beforeEach } from 'vitest';
import { userRepository } from '../../src/repositories/userRepository.js';
import { User } from '../../src/models/User.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('UserRepository', () => {
  const userData = {
    clerkId: 'user_123',
    name: 'Test User',
    email: 'test@example.com',
  };

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const user = await userRepository.create(userData);
      expect(user.clerkId).toBe(userData.clerkId);
      expect(user.email).toBe(userData.email);
      expect(user.id).toBeDefined();
    });

    it('should throw ConflictError if user with same email exists', async () => {
      await userRepository.create(userData);
      await expect(
        userRepository.create({
          ...userData,
          clerkId: 'user_456',
        })
      ).rejects.toThrow(ConflictError);
    });

    it('should throw ConflictError if user with same clerkId exists', async () => {
      await userRepository.create(userData);
      await expect(
        userRepository.create({
          ...userData,
          email: 'other@example.com',
        })
      ).rejects.toThrow(ConflictError);
    });
  });

  describe('findById', () => {
    it('should find a user by id', async () => {
      const createdUser = await userRepository.create(userData);
      const user = await userRepository.findById(createdUser.id);
      expect(user.id).toBe(createdUser.id);
      expect(user.name).toBe(userData.name);
    });

    it('should throw NotFoundError if user does not exist', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      await expect(userRepository.findById(nonExistentId)).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('findByClerkId', () => {
    it('should find a user by clerkId', async () => {
      await userRepository.create(userData);
      const user = await userRepository.findByClerkId(userData.clerkId);
      expect(user.clerkId).toBe(userData.clerkId);
    });

    it('should throw NotFoundError if user with clerkId does not exist', async () => {
      await expect(
        userRepository.findByClerkId('non_existent')
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      await userRepository.create(userData);
      const user = await userRepository.findByEmail(userData.email);
      expect(user.email).toBe(userData.email);
    });

    it('should throw NotFoundError if user with email does not exist', async () => {
      await expect(
        userRepository.findByEmail('non_existent@example.com')
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      await userRepository.create(userData);
      const updateData = { name: 'Updated Name' };
      const user = await userRepository.update(userData.clerkId, updateData);
      expect(user.name).toBe(updateData.name);
    });

    it('should throw NotFoundError when updating non-existent user', async () => {
      await expect(
        userRepository.update('non_existent', { name: 'New' })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('exists methods', () => {
    it('existsByEmail should return true if user exists', async () => {
      await userRepository.create(userData);
      const exists = await userRepository.existsByEmail(userData.email);
      expect(exists).toBe(true);
    });

    it('existsByEmail should return false if user does not exist', async () => {
      const exists = await userRepository.existsByEmail('none@example.com');
      expect(exists).toBe(false);
    });

    it('existsByClerkId should return true if user exists', async () => {
      await userRepository.create(userData);
      const exists = await userRepository.existsByClerkId(userData.clerkId);
      expect(exists).toBe(true);
    });

    it('existsByClerkId should return false if user does not exist', async () => {
      const exists = await userRepository.existsByClerkId('none');
      expect(exists).toBe(false);
    });
  });
});
