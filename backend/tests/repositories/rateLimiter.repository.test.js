import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { inMemoryRateLimitStore } from '../../src/repositories/rateLimiter.repository.js';

describe('InMemoryRateLimitStore', () => {
  const key = 'test-key';
  const windowMs = 1000;

  beforeEach(async () => {
    vi.useFakeTimers();
    await inMemoryRateLimitStore.reset(key);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('increment', () => {
    it('should initialize a new record', async () => {
      const record = await inMemoryRateLimitStore.increment(key, windowMs);
      expect(record.count).toBe(1);
      expect(record.resetTime).toBe(Date.now() + windowMs);
    });

    it('should increment an existing record', async () => {
      await inMemoryRateLimitStore.increment(key, windowMs);
      const record = await inMemoryRateLimitStore.increment(key, windowMs);
      expect(record.count).toBe(2);
    });

    it('should reset after window expires', async () => {
      await inMemoryRateLimitStore.increment(key, windowMs);

      vi.advanceTimersByTime(windowMs + 1);

      const record = await inMemoryRateLimitStore.increment(key, windowMs);
      expect(record.count).toBe(1);
    });
  });

  describe('get', () => {
    it('should return null for non-existent key', async () => {
      const record = await inMemoryRateLimitStore.get('none');
      expect(record).toBeNull();
    });

    it('should return null for expired key', async () => {
      await inMemoryRateLimitStore.increment(key, windowMs);
      vi.advanceTimersByTime(windowMs + 1);
      const record = await inMemoryRateLimitStore.get(key);
      expect(record).toBeNull();
    });
  });

  describe('cleanup', () => {
    it('should remove expired records', async () => {
      await inMemoryRateLimitStore.increment(key, windowMs);
      vi.advanceTimersByTime(windowMs + 1);

      await inMemoryRateLimitStore.cleanup();

      // We can't easily check the private #store, but we can verify get returns null
      // and ensure it doesn't crash.
      const record = await inMemoryRateLimitStore.get(key);
      expect(record).toBeNull();
    });
  });
});
