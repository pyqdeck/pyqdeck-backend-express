import { describe, it, expect } from 'vitest';
import successFormatter from '../../src/utils/formatters/successFormatter.js';
import errorFormatter from '../../src/utils/formatters/errorFormatter.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

describe('Formatters Utility', () => {
  describe('successFormatter', () => {
    it('formatSuccess should return correct structure', () => {
      const data = { id: 1 };
      const result = successFormatter.formatSuccess(data, 'Done', 201);

      expect(result).toEqual({
        status: 'success',
        message: 'Done',
        data: { id: 1 },
        code: 201,
      });
    });

    it('formatList should return correct paginated structure', () => {
      const items = [{ id: 1 }];
      const result = successFormatter.formatList(items, 10, 1, 2);

      expect(result.data.items).toEqual(items);
      expect(result.data.pagination).toEqual({
        total: 10,
        page: 1,
        limit: 2,
        totalPages: 5,
      });
    });
  });

  describe('errorFormatter', () => {
    it('should format BaseError correctly', () => {
      const err = new NotFoundError('Not found');
      const result = errorFormatter.formatError(err, 404);

      expect(result).toEqual({
        status: 'error',
        message: 'Not found',
        code: 'NOT_FOUND',
        statusCode: 404,
      });
    });

    it('should format generic Error correctly', () => {
      const err = new Error('Boom');
      const result = errorFormatter.formatError(err, 500);

      expect(result).toEqual({
        status: 'error',
        message: 'Internal server error',
        code: 'INTERNAL_ERROR',
        statusCode: 500,
      });
    });
  });
});
