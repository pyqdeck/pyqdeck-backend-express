import { describe, it, expect, vi, beforeEach } from 'vitest';
import { maintenanceService } from '../../src/services/maintenanceService.js';
import { maintenanceRepository } from '../../src/repositories/maintenanceRepository.js';

vi.mock('../../src/repositories/maintenanceRepository.js', () => ({
  maintenanceRepository: {
    wipeCollections: vi.fn(),
  },
}));

describe('maintenanceService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('performContentWipe', () => {
    it('should call maintenanceRepository.wipeCollections and return result', async () => {
      const mockDeletedCounts = { universities: 5 };
      maintenanceRepository.wipeCollections.mockResolvedValue(
        mockDeletedCounts
      );

      const result = await maintenanceService.performContentWipe('admin_1');

      expect(maintenanceRepository.wipeCollections).toHaveBeenCalledWith([
        'users',
      ]);
      expect(result).toEqual(mockDeletedCounts);
    });

    it('should throw error if repository fails', async () => {
      maintenanceRepository.wipeCollections.mockRejectedValue(
        new Error('DB Error')
      );

      await expect(
        maintenanceService.performContentWipe('admin_1')
      ).rejects.toThrow('DB Error');
    });
  });
});
