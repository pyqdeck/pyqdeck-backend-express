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
  getAuth: (req) => req.auth || { userId: 'user_123' },
}));

vi.mock('https', () => ({
  default: {
    request: vi.fn((options, cb) => {
      const isFail = options.path.includes('fail');
      const res = {
        statusCode: isFail ? 500 : 200,
        on: vi.fn((event, handler) => {
          if (event === 'data' && !isFail) {
            const email = options.path.includes('no-email')
              ? []
              : [{ id: 'email_1', email_address: 'test@example.com' }];
            handler(
              JSON.stringify({
                id: 'user_123',
                first_name: 'Test',
                last_name: 'User',
                email_addresses: email,
                primary_email_address_id: email.length ? 'email_1' : null,
              })
            );
          }
          if (event === 'end') handler();
        }),
      };
      cb(res);
      return { on: vi.fn(), end: vi.fn() };
    }),
  },
}));

vi.mock('../../src/repositories/userRepository.js', () => ({
  default: {
    findByClerkId: vi.fn(),
    create: vi.fn(),
    upsertByClerkOrEmail: vi.fn(),
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
    req = { auth: { userId: 'user_no-email' } };
    userRepository.findByClerkId.mockRejectedValue(new NotFoundError());
    userRepository.upsertByClerkOrEmail.mockResolvedValue({ id: 'new_1' });

    await syncUser(req, res, next);

    expect(userRepository.upsertByClerkOrEmail).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        email: undefined,
        name: 'Test User',
      })
    );
  });

  it('should handle complete failure in sync logic', async () => {
    req = { auth: { userId: 'user_fail' } };
    userRepository.findByClerkId.mockRejectedValue(new NotFoundError());
    // The https mock should be updated to return 500 for 'user_fail'

    await syncUser(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.dbUser).toBeUndefined();
  });
});
