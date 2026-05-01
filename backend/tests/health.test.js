import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Health Check API', () => {
  it('GET /api/v1/health should return 200 and healthy status', async () => {
    const response = await request(app).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.status).toBe('healthy');
  });

  it('GET /api/v1/health/detailed should return 200', async () => {
    const response = await request(app).get('/api/v1/health/detailed');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.database.status).toBe('connected');
  });
});
