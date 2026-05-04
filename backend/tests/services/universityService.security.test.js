import { describe, it, expect, beforeEach, vi } from 'vitest';
import { universityService } from '../../src/services/universityService.js';
import universityRepository from '../../src/repositories/universityRepository.js';

vi.mock('../../src/repositories/universityRepository.js', () => ({
  default: {
    findAll: vi.fn(),
  },
}));

describe('UniversityService Security', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('NoSQL Injection via regex', () => {
    it('should escape special characters in query.search', async () => {
      universityRepository.findAll.mockResolvedValue({ items: [], total: 0 });

      const maliciousSearch = '.*';
      await universityService.list({ search: maliciousSearch });

      const expectedRegex = { $regex: '\\.\\*', $options: 'i' };
      expect(universityRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          $or: [
            { name: expectedRegex },
            { shortName: expectedRegex }
          ]
        }),
        undefined
      );
    });

    it('should escape special characters in query.state', async () => {
      universityRepository.findAll.mockResolvedValue({ items: [], total: 0 });

      const maliciousState = '^NY';
      await universityService.list({ state: maliciousState });

      expect(universityRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          state: { $regex: '\\^NY', $options: 'i' }
        }),
        undefined
      );
    });

    it('should escape special characters in query.country', async () => {
      universityRepository.findAll.mockResolvedValue({ items: [], total: 0 });

      const maliciousCountry = 'USA$';
      await universityService.list({ country: maliciousCountry });

      expect(universityRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          country: { $regex: 'USA\\$', $options: 'i' }
        }),
        undefined
      );
    });
  });
});
