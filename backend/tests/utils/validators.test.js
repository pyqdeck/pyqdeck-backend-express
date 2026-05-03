import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  validateSchema,
  safeValidateSchema,
  createValidator,
} from '../../src/utils/validators/index.js';
import { ValidationError } from '../../src/utils/errors/index.js';

describe('Validators Utility', () => {
  const schema = z.object({
    name: z.string().min(3),
    age: z.number().positive(),
  });

  describe('validateSchema', () => {
    it('should return data when valid', () => {
      const data = { name: 'John', age: 30 };
      const result = validateSchema(schema, data);
      expect(result).toEqual(data);
    });

    it('should throw ValidationError when invalid', () => {
      const data = { name: 'Jo', age: -1 };
      expect(() => validateSchema(schema, data)).toThrow(ValidationError);
    });
  });

  describe('safeValidateSchema', () => {
    it('should return success: true when valid', () => {
      const data = { name: 'John', age: 30 };
      const result = safeValidateSchema(schema, data);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(data);
    });

    it('should return success: false when invalid', () => {
      const data = { name: 'Jo', age: -1 };
      const result = safeValidateSchema(schema, data);
      expect(result.success).toBe(false);
      expect(result.details).toHaveLength(2);
    });
  });

  describe('createValidator', () => {
    it('should create a functional validator', () => {
      const validator = createValidator(schema);
      const data = { name: 'John', age: 30 };
      expect(validator(data)).toEqual(data);
    });
  });
});
