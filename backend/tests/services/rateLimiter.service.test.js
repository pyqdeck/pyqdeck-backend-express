import { describe, it, expect, beforeEach, vi } from 'vitest';
import { rateLimiterService } from '../../src/services/rateLimiter.service.js';
import { inMemoryRateLimitStore } from '../../src/repositories/rateLimiter.repository.js';
import { RateLimitError } from '../../src/utils/errors/index.js';

vi.mock('../../src/repositories/rateLimiter.repository.js', () => ({
  inMemoryRateLimitStore: {
    increment: vi.fn(),
    reset: vi.fn(),
  },
}));

describe('RateLimiterService', () => {
  const key = 'test-key';
  const windowMs = 1000;
  const maxRequests = 5;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('checkLimit', () => {
    it('should return correct stats when under limit', async () => {
      const resetTime = Date.now() + windowMs;
      inMemoryRateLimitStore.increment.mockResolvedValue({
        count: 1,
        resetTime,
      });

      const result = await rateLimiterService.checkLimit(
        key,
        windowMs,
        maxRequests
      );

      expect(result).toEqual({
        limit: maxRequests,
        remaining: 4,
        resetTime,
        isLimited: false,
      });
    });

    it('should return isLimited: true when over limit', async () => {
      const resetTime = Date.now() + windowMs;
      inMemoryRateLimitStore.increment.mockResolvedValue({
        count: 6,
        resetTime,
      });

      const result = await rateLimiterService.checkLimit(
        key,
        windowMs,
        maxRequests
      );

      expect(result.isLimited).toBe(true);
      expect(result.remaining).toBe(0);
    });
  });

  describe('enforceLimit', () => {
    it('should not throw if under limit', async () => {
      inMemoryRateLimitStore.increment.mockResolvedValue({
        count: 1,
        resetTime: Date.now() + windowMs,
      });

      await expect(
        rateLimiterService.enforceLimit(key, windowMs, maxRequests)
      ).resolves.not.toThrow();
    });

    it('should throw RateLimitError if over limit', async () => {
      inMemoryRateLimitStore.increment.mockResolvedValue({
        count: 6,
        resetTime: Date.now() + windowMs,
      });

      await expect(
        rateLimiterService.enforceLimit(key, windowMs, maxRequests)
      ).rejects.toThrow(RateLimitError);
    });
  });

  describe('resetLimit', () => {
    it('should call store reset', async () => {
      await rateLimiterService.resetLimit(key);
      expect(inMemoryRateLimitStore.reset).toHaveBeenCalledWith(key);
    });
  });

  describe('getHeaders', () => {
    it('should return correct headers', () => {
      const resetTime = Date.now();
      const result = {
        limit: 100,
        remaining: 50,
        resetTime,
      };

      const headers = rateLimiterService.getHeaders(result);

      expect(headers['X-RateLimit-Limit']).toBe(100);
      expect(headers['X-RateLimit-Remaining']).toBe(50);
      expect(headers['X-RateLimit-Reset']).toBe(
        new Date(resetTime).toISOString()
      );
    });
  });
});
