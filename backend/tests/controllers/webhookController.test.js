import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import * as webhookController from '../../src/controllers/webhookController.js';
import { userService } from '../../src/services/userService.js';
import { Webhook } from 'svix';

const { mockVerify, mockUserService } = vi.hoisted(() => ({
  mockVerify: vi.fn(),
  mockUserService: {
    handleUserCreated: vi.fn(),
    handleUserUpdated: vi.fn(),
    handleUserDeleted: vi.fn(),
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

describe('WebhookController', () => {
  let app;

  beforeEach(() => {
    vi.clearAllMocks();
    app = express();
    app.post(
      '/webhook',
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
});
