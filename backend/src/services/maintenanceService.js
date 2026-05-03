import { maintenanceRepository } from '../repositories/maintenanceRepository.js';
import { loggerService } from '../utils/index.js';

const logger = loggerService.getLogger();

/**
 * Service for handling system maintenance and administrative cleanup.
 */
export const maintenanceService = {
  /**
   * Performs a selective wipe of the database content.
   * @param {string} adminId - The ID of the admin performing the wipe for logging.
   * @returns {Promise<Record<string, number>>}
   */
  async performContentWipe(adminId) {
    logger.warn('Initiating full database content wipe', { adminId });

    const deletedCounts = await maintenanceRepository.wipeCollections([
      'users',
    ]);

    logger.info('Database content wipe completed successfully', {
      adminId,
      totalCollections: Object.keys(deletedCounts).length,
    });

    return deletedCounts;
  },
};
