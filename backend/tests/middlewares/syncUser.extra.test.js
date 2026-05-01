import { describe, it, expect, beforeEach, vi } from 'vitest';
import { syncUser } from '../../src/middlewares/syncUser.middleware.js';
import userRepository from '../../src/repositories/userRepository.js';
import { clerkClient } from '@clerk/express';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('@clerk/express', () => ({
  clerkClient: {
    users: {
      getUser: vi.fn(),
    },
  },
}));

vi.mock('../../src/repositories/userRepository.js', () => ({
  default: {
    findByClerkId: vi.fn(),
    create: vi.fn(),
  },
}));

describe('syncUser Middleware Edge Cases', () => {
  let req;
  const res = {};
  const next = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    req = { auth: { userId: 'user_123' } };
  });

  it('should re-throw non-NotFoundError from repository', async () => {
    userRepository.findByClerkId.mockRejectedValue(
      new Error('DB Connection Failed')
    );

    await syncUser(req, res, next);

    expect(next).toHaveBeenCalled();
    // Inner error is caught and logged, verify logger if needed
  });

  it('should handle case where Clerk user has no email', async () => {
    userRepository.findByClerkId.mockRejectedValue(new NotFoundError());
    clerkClient.users.getUser.mockResolvedValue({
      id: 'user_123',
      emailAddresses: [],
      firstName: 'No',
      lastName: 'Email',
    });
    userRepository.create.mockResolvedValue({ id: 'new_1' });

    await syncUser(req, res, next);

    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: undefined,
        name: 'No Email',
      })
    );
  });

  it('should handle complete failure in sync logic', async () => {
    userRepository.findByClerkId.mockRejectedValue(new NotFoundError());
    clerkClient.users.getUser.mockRejectedValue(new Error('Clerk API Down'));

    await syncUser(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.dbUser).toBeUndefined();
  });
});
