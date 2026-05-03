import { validateSchema } from '../utils/validators/index.js';

export function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.body = validateSchema(schema, req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}

export function validateQuery(schema) {
  return (req, res, next) => {
    try {
      const validated = validateSchema(schema, req.query);
      Object.defineProperty(req, 'query', {
        value: validated,
        writable: true,
        enumerable: true,
        configurable: true,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

export function validateParams(schema) {
  return (req, res, next) => {
    try {
      const validated = validateSchema(schema, req.params);
      Object.defineProperty(req, 'params', {
        value: validated,
        writable: true,
        enumerable: true,
        configurable: true,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}
