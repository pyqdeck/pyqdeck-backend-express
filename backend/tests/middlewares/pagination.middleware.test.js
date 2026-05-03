import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { paginate } from '../../src/middlewares/pagination.middleware.js';
import errorHandler from '../../src/middlewares/errorHandler.js';

describe('Pagination Middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.get('/test', paginate(), (req, res) => {
      res.json(req.pagination);
    });
    app.use(errorHandler);
  });

  it('should attach default pagination when no query params are provided', async () => {
    const response = await request(app).get('/test');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      page: 1,
      limit: 20,
      skip: 0,
    });
  });

  it('should parse valid page and limit from query params', async () => {
    const response = await request(app).get('/test?page=2&limit=50');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      page: 2,
      limit: 50,
      skip: 50,
    });
  });

  it('should throw ValidationError for invalid page number', async () => {
    const response = await request(app).get('/test?page=0');

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('page must be at least 1');
  });

  it('should throw ValidationError for limit exceeding MAX_LIMIT', async () => {
    const response = await request(app).get('/test?limit=101');

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('limit cannot exceed 100');
  });

  it('should handle non-numeric values gracefully with zod coercion', async () => {
    const response = await request(app).get('/test?page=abc');

    expect(response.status).toBe(400);
    expect(response.body.message.toLowerCase()).toContain(
      'expected number, received nan'
    );
  });
});
