import { ValidationError } from '../errors/index.js';

export function validateSchema(schema, data, _options = {}) {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));

    throw new ValidationError(
      errors.map((e) => `${e.path}: ${e.message}`).join(', '),
      'VALIDATION_ERROR'
    );
  }

  return result.data;
}

export function safeValidateSchema(schema, data, _options = {}) {
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      data: null,
      details: result.error.issues.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      })),
    };
  }

  return {
    success: true,
    data: result.data,
    details: null,
  };
}

export function createValidator(schema, _options = {}) {
  return (data) => validateSchema(schema, data);
}
