import { describe, it, expect, beforeEach, vi } from 'vitest';
import { platformConfigService } from '../../src/services/platformConfigService.js';
import platformConfigRepository from '../../src/repositories/platformConfigRepository.js';

vi.mock('../../src/repositories/platformConfigRepository.js', () => ({
  default: {
    get: vi.fn(),
    update: vi.fn(),
  },
}));

describe('PlatformConfigService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    platformConfigService.resetCache();
  });

  describe('getConfig', () => {
    it('should fetch config from repository and cache it', async () => {
      const mockConfig = { contentFreeze: false };
      platformConfigRepository.get.mockResolvedValue(mockConfig);

      const result1 = await platformConfigService.getConfig();
      expect(platformConfigRepository.get).toHaveBeenCalledTimes(1);
      expect(result1).toEqual(mockConfig);

      // Second call should use cache
      const result2 = await platformConfigService.getConfig();
      expect(platformConfigRepository.get).toHaveBeenCalledTimes(1);
      expect(result2).toEqual(mockConfig);
    });

    it('should refetch after cache expires', async () => {
      const mockConfig = { contentFreeze: false };
      platformConfigRepository.get.mockResolvedValue(mockConfig);

      vi.useFakeTimers();
      await platformConfigService.getConfig();
      expect(platformConfigRepository.get).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(61000); // Exceed 60s TTL
      await platformConfigService.getConfig();
      expect(platformConfigRepository.get).toHaveBeenCalledTimes(2);
      vi.useRealTimers();
    });
  });

  describe('updateConfig', () => {
    it('should update config and invalidate cache', async () => {
      const updatedConfig = { contentFreeze: true };
      platformConfigRepository.update.mockResolvedValue(updatedConfig);
      platformConfigRepository.get.mockResolvedValue(updatedConfig);

      // Prime cache
      await platformConfigService.getConfig();

      await platformConfigService.updateConfig({ contentFreeze: true });
      expect(platformConfigRepository.update).toHaveBeenCalledWith({
        contentFreeze: true,
      });

      // Should fetch again from repo because cache was invalidated
      await platformConfigService.getConfig();
      expect(platformConfigRepository.get).toHaveBeenCalledTimes(2);
    });
  });

  describe('isContentFrozen', () => {
    it('should return true if contentFreeze is true', async () => {
      platformConfigRepository.get.mockResolvedValue({ contentFreeze: true });
      const result = await platformConfigService.isContentFrozen();
      expect(result).toBe(true);
    });

    it('should return false if contentFreeze is false', async () => {
      platformConfigRepository.get.mockResolvedValue({ contentFreeze: false });
      const result = await platformConfigService.isContentFrozen();
      expect(result).toBe(false);
    });
  });
});
