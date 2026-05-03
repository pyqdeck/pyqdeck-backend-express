import { describe, it, expect, vi } from 'vitest';
import { parsePagination, paginate } from '../../src/utils/pagination/index.js';
import { ValidationError } from '../../src/utils/errors/index.js';

describe('Pagination Utility', () => {
  describe('parsePagination', () => {
    it('should return default values for empty query', () => {
      const result = parsePagination({});
      expect(result).toEqual({ page: 1, limit: 20, skip: 0 });
    });

    it('should parse valid strings and coerce to numbers', () => {
      const result = parsePagination({ page: '2', limit: '50' });
      expect(result).toEqual({ page: 2, limit: 50, skip: 50 });
    });

    it('should throw ValidationError for invalid data', () => {
      expect(() => parsePagination({ page: '0' })).toThrow(ValidationError);
      expect(() => parsePagination({ limit: '101' })).toThrow(ValidationError);
    });
  });

  describe('paginate', () => {
    it('should call model methods correctly and return structure', async () => {
      const mockItems = [{ id: 1 }];
      const mockModel = {
        find: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue(mockItems),
        countDocuments: vi.fn().mockResolvedValue(100),
      };

      const result = await paginate(
        mockModel,
        { active: true },
        { page: 2, limit: 20, skip: 20 }
      );

      expect(mockModel.find).toHaveBeenCalledWith({ active: true }, null, {});
      expect(mockModel.skip).toHaveBeenCalledWith(20);
      expect(mockModel.limit).toHaveBeenCalledWith(20);
      expect(mockModel.countDocuments).toHaveBeenCalledWith({ active: true });

      expect(result).toEqual({
        items: mockItems,
        total: 100,
        page: 2,
        limit: 20,
      });
    });
  });
});
