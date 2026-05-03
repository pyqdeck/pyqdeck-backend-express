import { describe, it, expect, vi, beforeEach } from 'vitest';
import seoService from '../../src/services/seoService.js';
import seoRepository from '../../src/repositories/seoRepository.js';

vi.mock('../../src/repositories/seoRepository.js', () => ({
  default: {
    getAllQuestionSlugs: vi.fn(),
    getAllPaperSlugs: vi.fn(),
    getAllSubjectSlugs: vi.fn(),
    getAllUniversitySlugs: vi.fn(),
  },
}));

describe('seoService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSitemapData', () => {
    it('should generate a flat list of sitemap urls correctly', async () => {
      const uDate = new Date('2023-01-01');
      seoRepository.getAllUniversitySlugs.mockResolvedValue([
        { slug: 'uni-1', updatedAt: uDate },
        { slug: 'uni-2', updatedAt: uDate },
      ]);

      const sDate = new Date('2023-01-02');
      seoRepository.getAllSubjectSlugs.mockResolvedValue([
        { slug: 'sub-1', updatedAt: sDate },
      ]);

      const pDate = new Date('2023-01-03');
      seoRepository.getAllPaperSlugs.mockResolvedValue([
        { slug: 'pap-1', updatedAt: pDate },
        { slug: 'pap-2', updatedAt: pDate },
      ]);

      const qDate = new Date('2023-01-04');
      seoRepository.getAllQuestionSlugs.mockResolvedValue([
        { slug: 'que-1', updatedAt: qDate },
      ]);

      const data = await seoService.getSitemapData();

      expect(seoRepository.getAllUniversitySlugs).toHaveBeenCalled();
      expect(seoRepository.getAllSubjectSlugs).toHaveBeenCalled();
      expect(seoRepository.getAllPaperSlugs).toHaveBeenCalled();
      expect(seoRepository.getAllQuestionSlugs).toHaveBeenCalled();

      expect(data).toHaveLength(6);

      // Check universities formatting
      expect(data[0]).toEqual({
        url: '/universities/uni-1',
        lastMod: uDate,
        priority: 0.8,
      });
      expect(data[1]).toEqual({
        url: '/universities/uni-2',
        lastMod: uDate,
        priority: 0.8,
      });

      // Check subjects formatting
      expect(data[2]).toEqual({
        url: '/subjects/sub-1',
        lastMod: sDate,
        priority: 0.7,
      });

      // Check papers formatting
      expect(data[3]).toEqual({
        url: '/papers/pap-1',
        lastMod: pDate,
        priority: 0.6,
      });
      expect(data[4]).toEqual({
        url: '/papers/pap-2',
        lastMod: pDate,
        priority: 0.6,
      });

      // Check questions formatting
      expect(data[5]).toEqual({
        url: '/questions/que-1',
        lastMod: qDate,
        priority: 0.5,
      });
    });

    it('should return empty list if no entities exist', async () => {
      seoRepository.getAllUniversitySlugs.mockResolvedValue([]);
      seoRepository.getAllSubjectSlugs.mockResolvedValue([]);
      seoRepository.getAllPaperSlugs.mockResolvedValue([]);
      seoRepository.getAllQuestionSlugs.mockResolvedValue([]);

      const data = await seoService.getSitemapData();
      expect(data).toHaveLength(0);
    });
  });
});
