import { describe, it, expect, beforeEach, vi } from 'vitest';
import { userService } from '../../src/services/userService.js';
import userRepository from '../../src/repositories/userRepository.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/repositories/userRepository.js', () => ({
  userRepository: {
    existsByClerkId: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  default: {
    existsByClerkId: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
}));

describe('UserService', () => {
  const clerkData = {
    id: 'clerk_123',
    first_name: 'John',
    last_name: 'Doe',
    email_addresses: [{ id: 'email_1', email_address: 'john@example.com' }],
    primary_email_address_id: 'email_1',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleUserCreated', () => {
    it('should create a new user if they do not exist', async () => {
      userRepository.existsByClerkId.mockResolvedValue(false);
      userRepository.create.mockResolvedValue({ id: 'db_1' });

      await userService.handleUserCreated(clerkData);

      expect(userRepository.create).toHaveBeenCalledWith({
        clerkId: 'clerk_123',
        name: 'John Doe',
        email: 'john@example.com',
      });
    });

    it('should skip creation if user already exists', async () => {
      userRepository.existsByClerkId.mockResolvedValue(true);

      await userService.handleUserCreated(clerkData);

      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('handleUserUpdated', () => {
    it('should update existing user', async () => {
      userRepository.update.mockResolvedValue({ id: 'db_1' });

      await userService.handleUserUpdated(clerkData);

      expect(userRepository.update).toHaveBeenCalledWith('clerk_123', {
        name: 'John Doe',
        email: 'john@example.com',
      });
    });

    it('should catch NotFoundError and skip update', async () => {
      userRepository.update.mockRejectedValue(new NotFoundError());

      await expect(
        userService.handleUserUpdated(clerkData)
      ).resolves.not.toThrow();
    });
  });

  describe('handleUserDeleted', () => {
    it('should deactivate user', async () => {
      userRepository.update.mockResolvedValue({ id: 'db_1' });

      await userService.handleUserDeleted({ id: 'clerk_123' });

      expect(userRepository.update).toHaveBeenCalledWith('clerk_123', {
        isActive: false,
      });
    });

    it('should catch NotFoundError and skip delete', async () => {
      userRepository.update.mockRejectedValue(new NotFoundError());

      await expect(
        userService.handleUserDeleted({ id: 'clerk_123' })
      ).resolves.not.toThrow();
    });
  });
});
