import { describe, it, expect } from 'vitest';
import * as Errors from '../../src/utils/errors/index.js';

describe('Custom Errors', () => {
  it('BaseError should have correct properties', () => {
    const err = new Errors.BaseError('message', 500, 'INTERNAL_ERROR');
    expect(err.message).toBe('message');
    expect(err.statusCode).toBe(500);
    expect(err.code).toBe('INTERNAL_ERROR');

    const json = err.toJSON();
    expect(json.error.message).toBe('message');
    expect(json.error.code).toBe('INTERNAL_ERROR');
    expect(json.error.statusCode).toBe(500);
  });

  it('ValidationError should default to 400', () => {
    const err = new Errors.ValidationError('invalid');
    expect(err.statusCode).toBe(400);
    expect(err.code).toBe('VALIDATION_ERROR');
  });

  it('NotFoundError should default to 404', () => {
    const err = new Errors.NotFoundError('not found');
    expect(err.statusCode).toBe(404);
    expect(err.code).toBe('NOT_FOUND');
  });

  it('UnauthorizedError should default to 401', () => {
    const err = new Errors.UnauthorizedError('unauthorized');
    expect(err.statusCode).toBe(401);
  });

  it('ForbiddenError should default to 403', () => {
    const err = new Errors.ForbiddenError('forbidden');
    expect(err.statusCode).toBe(403);
  });

  it('ConflictError should default to 409', () => {
    const err = new Errors.ConflictError('conflict');
    expect(err.statusCode).toBe(409);
  });

  it('RateLimitError should default to 429', () => {
    const err = new Errors.RateLimitError('slow down');
    expect(err.statusCode).toBe(429);
  });
});
