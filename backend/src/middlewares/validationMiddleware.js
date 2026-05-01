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
      req.query = validateSchema(schema, req.query);
      next();
    } catch (error) {
      next(error);
    }
  };
}

export function validateParams(schema) {
  return (req, res, next) => {
    try {
      req.params = validateSchema(schema, req.params);
      next();
    } catch (error) {
      next(error);
    }
  };
}
