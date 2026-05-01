import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import errorHandler from '../../src/middlewares/errorHandler.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

describe('ErrorHandler Middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    // Disable morgan logging for tests
    app.set('env', 'test');
  });

  it('should handle operational errors (BaseError subclasses)', async () => {
    app.get('/error', (req, res, next) => {
      next(new NotFoundError('Resource not found'));
    });
    app.use(errorHandler);

    const response = await request(app).get('/error');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Resource not found',
      code: 'NOT_FOUND',
      statusCode: 404,
    });
  });

  it('should handle generic errors as 500', async () => {
    app.get('/error', (req, res, next) => {
      next(new Error('Something went wrong'));
    });
    app.use(errorHandler);

    const response = await request(app).get('/error');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal server error');
    expect(response.body.statusCode).toBe(500);
  });

  it('should exclude stack trace in production', async () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    app.get('/error', (req, res, next) => {
      const err = new Error('Production error');
      err.stack = 'secret stack';
      next(err);
    });
    app.use(errorHandler);

    const response = await request(app).get('/error');
    expect(response.body.stack).toBeUndefined();

    process.env.NODE_ENV = originalEnv;
  });
});
