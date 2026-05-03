import { inMemoryRateLimitStore } from '../repositories/rateLimiter.repository.js';
import { RateLimitError } from '../utils/errors/index.js';

class RateLimiterService {
  constructor(store) {
    this.store = store;
  }

  async checkLimit(key, windowMs, maxRequests) {
    const record = await this.store.increment(key, windowMs);

    return {
      limit: maxRequests,
      remaining: Math.max(0, maxRequests - record.count),
      resetTime: record.resetTime,
      isLimited: record.count > maxRequests,
    };
  }

  async enforceLimit(key, windowMs, maxRequests) {
    const result = await this.checkLimit(key, windowMs, maxRequests);

    if (result.isLimited) {
      throw new RateLimitError('Rate limit exceeded');
    }

    return result;
  }

  async resetLimit(key) {
    await this.store.reset(key);
  }

  getHeaders(result) {
    return {
      'X-RateLimit-Limit': result.limit,
      'X-RateLimit-Remaining': result.remaining,
      'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
    };
  }
}

export const rateLimiterService = new RateLimiterService(
  inMemoryRateLimitStore
);
export default rateLimiterService;
