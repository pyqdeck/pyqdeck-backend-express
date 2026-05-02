import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as seoController from '../../src/controllers/seoController.js';
import seoService from '../../src/services/seoService.js';

vi.mock('../../src/services/seoService.js', () => ({
  default: {
    getSitemapData: vi.fn(),
  },
}));

describe('seoController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  describe('getSitemapData', () => {
    it('should return sitemap data', async () => {
      const mockData = [{ url: '/test', lastMod: new Date(), priority: 0.5 }];
      seoService.getSitemapData.mockResolvedValue(mockData);

      await seoController.getSitemapData(req, res, next);

      expect(seoService.getSitemapData).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          data: mockData,
          message: 'Sitemap data fetched',
        })
      );
    });

    it('should call next on error', async () => {
      seoService.getSitemapData.mockRejectedValue(new Error('err'));
      await seoController.getSitemapData(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
