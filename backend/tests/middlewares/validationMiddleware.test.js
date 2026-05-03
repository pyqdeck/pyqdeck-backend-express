import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { z } from 'zod';
import {
  validateBody,
  validateQuery,
  validateParams,
} from '../../src/middlewares/validationMiddleware.js';
import errorHandler from '../../src/middlewares/errorHandler.js';

describe('Validation Middleware', () => {
  let app;
  const schema = z.object({
    name: z.string().min(3),
    age: z.coerce.number().int().positive(),
  });

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  describe('validateBody', () => {
    it('should pass valid body and coerce data', async () => {
      app.post('/test', validateBody(schema), (req, res) => {
        res.json(req.body);
      });
      app.use(errorHandler);

      const response = await request(app)
        .post('/test')
        .send({ name: 'John', age: '30' });

      expect(response.status).toBe(200);
      expect(response.body.age).toBe(30);
    });

    it('should throw ValidationError for invalid body', async () => {
      app.post('/test', validateBody(schema), (req, res) => {
        res.json(req.body);
      });
      app.use(errorHandler);

      const response = await request(app)
        .post('/test')
        .send({ name: 'Jo', age: -5 });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('name');
      expect(response.body.message).toContain('age');
    });
  });

  describe('validateQuery', () => {
    it('should pass valid query', async () => {
      app.get('/test', validateQuery(schema), (req, res) => {
        res.json(req.query);
      });
      app.use(errorHandler);

      const response = await request(app).get('/test?name=John&age=30');

      expect(response.status).toBe(200);
      expect(response.body.age).toBe(30);
    });
  });

  describe('validateParams', () => {
    it('should pass valid params', async () => {
      app.get('/test/:name/:age', validateParams(schema), (req, res) => {
        res.json(req.params);
      });
      app.use(errorHandler);

      const response = await request(app).get('/test/John/30');

      expect(response.status).toBe(200);
      expect(response.body.age).toBe(30);
    });
  });
});
