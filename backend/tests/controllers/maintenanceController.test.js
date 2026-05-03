import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as maintenanceController from '../../src/controllers/maintenanceController.js';
import { maintenanceService } from '../../src/services/maintenanceService.js';

vi.mock('../../src/services/maintenanceService.js', () => ({
  maintenanceService: {
    performContentWipe: vi.fn(),
  },
}));

describe('maintenanceController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      auth: { userId: 'admin_1' },
    };
    res = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  describe('wipeDatabase', () => {
    it('should call maintenanceService.performContentWipe and return success', async () => {
      const mockDeletedCounts = { universities: 5, subjects: 10 };
      maintenanceService.performContentWipe.mockResolvedValue(
        mockDeletedCounts
      );

      await maintenanceController.wipeDatabase(req, res, next);

      expect(maintenanceService.performContentWipe).toHaveBeenCalledWith(
        'admin_1'
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'success',
          message: 'Database content wiped successfully',
          data: { deletedCounts: mockDeletedCounts },
        })
      );
    });

    it('should call next on error', async () => {
      maintenanceService.performContentWipe.mockRejectedValue(
        new Error('Wipe failed')
      );

      await maintenanceController.wipeDatabase(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
