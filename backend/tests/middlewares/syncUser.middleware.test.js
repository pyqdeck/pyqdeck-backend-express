import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import { syncUser } from '../../src/middlewares/syncUser.middleware.js';
import userRepository from '../../src/repositories/userRepository.js';
import { clerkClient, getAuth } from '@clerk/express';

vi.mock('@clerk/express', () => ({
  getAuth: vi.fn(),
  clerkClient: {
    users: {
      getUser: vi.fn(),
    },
  },
}));
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/repositories/userRepository.js', () => ({
  userRepository: {
    findByClerkId: vi.fn(),
    create: vi.fn(),
  },
  default: {
    findByClerkId: vi.fn(),
    create: vi.fn(),
  },
}));

vi.mock('https', () => ({
  default: {
    request: vi.fn((options, cb) => {
      const res = {
        statusCode: 200,
        on: vi.fn((event, handler) => {
          if (event === 'data') {
            handler(
              JSON.stringify({
                id: 'clerk_123',
                first_name: 'New',
                last_name: 'User',
                email_addresses: [
                  { id: 'email_1', email_address: 'new@example.com' },
                ],
                primary_email_address_id: 'email_1',
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

describe('SyncUser Middleware', () => {
  let app;

  beforeEach(() => {
    vi.clearAllMocks();
    app = express();
    vi.mocked(getAuth).mockReturnValue({ userId: 'clerk_123' });
    app.use(syncUser);
    app.get('/test', (req, res) => {
      res.json({ user: req.dbUser });
    });
  });

  it('should attach existing user to req.dbUser', async () => {
    const mockUser = { id: 'db_123', clerkId: 'clerk_123', name: 'Test' };
    userRepository.findByClerkId.mockResolvedValue(mockUser);

    const response = await request(app).get('/test');

    expect(response.status).toBe(200);
    expect(response.body.user.id).toBe('db_123');
    expect(userRepository.findByClerkId).toHaveBeenCalledWith('clerk_123');
  });

  it('should create and attach new user if not found in DB', async () => {
    userRepository.findByClerkId.mockRejectedValue(
      new NotFoundError('User not found')
    );

    // clerkClient is already mocked in tests/setup.js
    const mockClerkUser = {
      id: 'clerk_123',
      firstName: 'New',
      lastName: 'User',
      emailAddresses: [{ id: 'email_1', emailAddress: 'new@example.com' }],
      primaryEmailAddressId: 'email_1',
    };
    clerkClient.users.getUser.mockResolvedValue(mockClerkUser);

    const mockDbUser = { id: 'db_456', clerkId: 'clerk_123', name: 'New User' };
    userRepository.create.mockResolvedValue(mockDbUser);

    const response = await request(app).get('/test');

    expect(response.status).toBe(200);
    expect(response.body.user.id).toBe('db_456');
    expect(userRepository.create).toHaveBeenCalled();
  });

  it('should continue if userId is missing', async () => {
    vi.mocked(getAuth).mockReturnValueOnce({});

    const authLessApp = express();
    authLessApp.use(syncUser);
    authLessApp.get('/test', (req, res) => {
      res.json({ success: true });
    });

    const response = await request(authLessApp).get('/test');
    expect(response.status).toBe(200);
    expect(userRepository.findByClerkId).not.toHaveBeenCalled();
  });
});
