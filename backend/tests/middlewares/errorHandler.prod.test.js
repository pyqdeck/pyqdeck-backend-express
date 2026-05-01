import { describe, it, expect, vi } from 'vitest';
import errorHandler from '../../src/middlewares/errorHandler.js';

describe('ErrorHandler Middleware (Production)', () => {
  it('should remove stack trace in production for 500 errors', () => {
    // Mock process.env.NODE_ENV
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const err = new Error('Secret internal error');
    const req = { path: '/', method: 'GET' };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    const response = res.json.mock.calls[0][0];
    expect(response.message).toBe('Internal server error');
    expect(response.stack).toBeUndefined();

    // Restore env
    process.env.NODE_ENV = originalEnv;
  });
});
