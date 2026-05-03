import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { User } from '../src/models/User.js';
import { getAuth } from '@clerk/express';

// Mock getAuth to control authentication state in integration tests
vi.mock('@clerk/express', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getAuth: vi.fn(),
  };
});

describe('Users API Integration', () => {
  const adminUser = {
    clerkId: 'admin_clerk',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  };

  const normalUser = {
    clerkId: 'user_clerk',
    name: 'Normal User',
    email: 'user@example.com',
    role: 'normal',
  };

  beforeEach(async () => {
    await User.deleteMany({});
    vi.clearAllMocks();
  });

  describe('GET /api/v1/users/me', () => {
    it('should return current user profile', async () => {
      await User.create(normalUser);
      vi.mocked(getAuth).mockReturnValue({ userId: normalUser.clerkId });

      const response = await request(app)
        .get('/api/v1/users/me')
        .set('Authorization', 'Bearer dummy_token');

      expect(response.status).toBe(200);
      expect(response.body.data.user.email).toBe(normalUser.email);
      expect(response.body.data.stats).toBeDefined();
    });

    it('should return 401 if not authenticated', async () => {
      vi.mocked(getAuth).mockReturnValue({});

      const response = await request(app).get('/api/v1/users/me');

      expect(response.status).toBe(401);
    });
  });

  describe('Admin Routes', () => {
    it('GET /api/v1/users should list all users for admin', async () => {
      await User.create(adminUser);
      await User.create(normalUser);
      vi.mocked(getAuth).mockReturnValue({ userId: adminUser.clerkId });

      const response = await request(app)
        .get('/api/v1/users')
        .set('Authorization', 'Bearer admin_token');

      expect(response.status).toBe(200);
      expect(response.body.data.items).toHaveLength(2);
    });

    it('GET /api/v1/users should return 403 for non-admin', async () => {
      await User.create(normalUser);
      vi.mocked(getAuth).mockReturnValue({ userId: normalUser.clerkId });

      const response = await request(app)
        .get('/api/v1/users')
        .set('Authorization', 'Bearer user_token');

      expect(response.status).toBe(403);
    });

    it('PATCH /api/v1/users/:clerkId should update user role', async () => {
      await User.create(adminUser);
      const user = await User.create(normalUser);
      vi.mocked(getAuth).mockReturnValue({ userId: adminUser.clerkId });

      const response = await request(app)
        .patch(`/api/v1/users/${user.clerkId}`)
        .send({ role: 'editor' })
        .set('Authorization', 'Bearer admin_token');

      expect(response.status).toBe(200);
      expect(response.body.data.user.role).toBe('editor');
    });

    it('PATCH /api/v1/users/:clerkId should prevent self-demotion', async () => {
      await User.create(adminUser);
      vi.mocked(getAuth).mockReturnValue({ userId: adminUser.clerkId });

      const response = await request(app)
        .patch(`/api/v1/users/${adminUser.clerkId}`)
        .send({ role: 'normal' })
        .set('Authorization', 'Bearer admin_token');

      expect(response.status).toBe(403);
      expect(response.body.message).toContain('cannot change your own role');
    });
  });
});
