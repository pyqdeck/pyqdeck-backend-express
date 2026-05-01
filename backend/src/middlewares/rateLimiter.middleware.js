import { rateLimiterService } from '../services/rateLimiter.service.js';
import { RATE_LIMITS } from '../utils/constants.js';

export function rateLimiter(presetName, options) {
  const { windowMs, max } =
    options || RATE_LIMITS[presetName] || RATE_LIMITS.API;

  return async (req, res, next) => {
    try {
      const key = `ratelimit:${req.ip}:${req.path}`;
      const result = await rateLimiterService.enforceLimit(key, windowMs, max);

      const headers = rateLimiterService.getHeaders(result);
      Object.entries(headers).forEach(([key, value]) => {
        res.setHeader(key, value);
      });

      next();
    } catch (error) {
      if (error.statusCode === 429) {
        const retryAfter = Math.ceil((error.resetTime - Date.now()) / 1000);
        res.setHeader('Retry-After', retryAfter);
      }
      next(error);
    }
  };
}

export default rateLimiter;
