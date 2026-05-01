import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import { rateLimiter } from '../../src/middlewares/rateLimiter.middleware.js';
import { rateLimiterService } from '../../src/services/rateLimiter.service.js';
import errorHandler from '../../src/middlewares/errorHandler.js';
import { RateLimitError } from '../../src/utils/errors/index.js';

vi.mock('../../src/services/rateLimiter.service.js', () => ({
  rateLimiterService: {
    enforceLimit: vi.fn(),
    getHeaders: vi.fn().mockReturnValue({
      'X-RateLimit-Limit': 100,
      'X-RateLimit-Remaining': 99,
      'X-RateLimit-Reset': 123456789,
    }),
  },
}));

describe('RateLimiter Middleware', () => {
  let app;

  beforeEach(() => {
    vi.clearAllMocks();
    app = express();
    app.get('/test', rateLimiter('API'), (req, res) => {
      res.json({ success: true });
    });
    app.use(errorHandler);
  });

  it('should allow request when within limits and set headers', async () => {
    rateLimiterService.enforceLimit.mockResolvedValue({
      count: 1,
      max: 100,
      remaining: 99,
      resetTime: Date.now() + 1000,
    });

    const response = await request(app).get('/test');

    expect(response.status).toBe(200);
    expect(response.headers['x-ratelimit-limit']).toBe('100');
    expect(rateLimiterService.enforceLimit).toHaveBeenCalled();
  });

  it('should block request and set Retry-After when limit exceeded', async () => {
    const resetTime = Date.now() + 5000;
    const error = new RateLimitError('Too many requests');
    error.resetTime = resetTime;

    rateLimiterService.enforceLimit.mockRejectedValue(error);

    const response = await request(app).get('/test');

    expect(response.status).toBe(429);
    expect(response.headers['retry-after']).toBeDefined();
    expect(response.body.code).toBe('RATE_LIMITED');
  });

  it('should use custom options when provided', async () => {
    app.get(
      '/custom',
      rateLimiter(null, { windowMs: 1000, max: 5 }),
      (req, res) => {
        res.json({ success: true });
      }
    );

    rateLimiterService.enforceLimit.mockResolvedValue({
      count: 1,
      max: 5,
      remaining: 4,
      resetTime: Date.now() + 1000,
    });

    await request(app).get('/custom');
    expect(rateLimiterService.enforceLimit).toHaveBeenCalledWith(
      expect.stringContaining('ratelimit:'),
      1000,
      5
    );
  });
});
