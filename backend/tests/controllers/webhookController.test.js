import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import * as webhookController from '../../src/controllers/webhookController.js';
import { rateLimiter } from '../../src/middlewares/rateLimiter.middleware.js';

const { mockVerify, mockUserService, mockClerkClient } = vi.hoisted(() => ({
  mockVerify: vi.fn(),
  mockUserService: {
    handleUserCreated: vi.fn(),
    handleUserUpdated: vi.fn(),
    handleUserDeleted: vi.fn(),
  },
  mockClerkClient: {
    sessions: {
      getSessionList: vi.fn(),
      revokeSession: vi.fn(),
    },
  },
}));

vi.mock('svix', () => ({
  Webhook: vi.fn().mockImplementation(function () {
    return {
      verify: mockVerify,
    };
  }),
}));

vi.mock('../../src/services/userService.js', () => ({
  userService: mockUserService,
  default: mockUserService,
}));

vi.mock('../../src/middlewares/rateLimiter.middleware.js', () => ({
  rateLimiter: vi.fn(() => (req, res, next) => next()),
  default: vi.fn(() => (req, res, next) => next()),
}));

vi.mock('@clerk/express', () => ({
  clerkClient: mockClerkClient,
}));

describe('WebhookController', () => {
  let app;

  beforeEach(() => {
    vi.clearAllMocks();
    app = express();
    app.post(
      '/webhook',
      rateLimiter('WEBHOOK'),
      express.raw({ type: 'application/json' }),
      webhookController.handleClerkWebhook
    );
  });

  it('should return 400 if signature verification fails', async () => {
    mockVerify.mockImplementation(() => {
      throw new Error('Invalid signature');
    });

    const response = await request(app)
      .post('/webhook')
      .set('svix-id', 'id')
      .set('svix-timestamp', 'time')
      .set('svix-signature', 'sig')
      .send(JSON.stringify({ type: 'user.created' }));

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid webhook signature');
  });

  it('should call userService.handleUserCreated on user.created event', async () => {
    const eventData = { id: 'user_1' };
    mockVerify.mockReturnValue({
      type: 'user.created',
      data: eventData,
    });

    const response = await request(app)
      .post('/webhook')
      .send(JSON.stringify({ type: 'user.created', data: eventData }));

    expect(response.status).toBe(200);
    expect(mockUserService.handleUserCreated).toHaveBeenCalledWith(eventData);
  });

  it('should call userService.handleUserUpdated on user.updated event', async () => {
    const eventData = { id: 'user_1' };
    mockVerify.mockReturnValue({
      type: 'user.updated',
      data: eventData,
    });

    const response = await request(app)
      .post('/webhook')
      .send(JSON.stringify({ type: 'user.updated', data: eventData }));

    expect(response.status).toBe(200);
    expect(mockUserService.handleUserUpdated).toHaveBeenCalledWith(eventData);
  });

  it('should call userService.handleUserDeleted on user.deleted event', async () => {
    const eventData = { id: 'user_1' };
    mockVerify.mockReturnValue({
      type: 'user.deleted',
      data: eventData,
    });

    const response = await request(app)
      .post('/webhook')
      .send(JSON.stringify({ type: 'user.deleted', data: eventData }));

    expect(response.status).toBe(200);
    expect(mockUserService.handleUserDeleted).toHaveBeenCalledWith(eventData);
  });

  it('should return 200 for unhandled event type', async () => {
    mockVerify.mockReturnValue({
      type: 'other.event',
      data: {},
    });

    const response = await request(app)
      .post('/webhook')
      .send(JSON.stringify({ type: 'other.event' }));

    expect(response.status).toBe(200);
    expect(response.body.received).toBe(true);
  });

  it('should revoke old sessions on session.created event', async () => {
    const userId = 'user_1';
    const currentSessionId = 'sess_new';
    const eventData = { user_id: userId, id: currentSessionId };

    mockVerify.mockReturnValue({
      type: 'session.created',
      data: eventData,
    });

    mockClerkClient.sessions.getSessionList.mockResolvedValue({
      data: [
        { id: 'sess_old_1', status: 'active' },
        { id: 'sess_old_2', status: 'active' },
        { id: 'sess_new', status: 'active' },
        { id: 'sess_other', status: 'expired' },
      ],
    });

    const response = await request(app)
      .post('/webhook')
      .send(JSON.stringify({ type: 'session.created', data: eventData }));

    expect(response.status).toBe(200);
    expect(mockClerkClient.sessions.getSessionList).toHaveBeenCalledWith({
      userId,
    });
    expect(mockClerkClient.sessions.revokeSession).toHaveBeenCalledTimes(2);
    expect(mockClerkClient.sessions.revokeSession).toHaveBeenCalledWith(
      'sess_old_1'
    );
    expect(mockClerkClient.sessions.revokeSession).toHaveBeenCalledWith(
      'sess_old_2'
    );
    expect(mockClerkClient.sessions.revokeSession).not.toHaveBeenCalledWith(
      'sess_new'
    );
  });
});
