import { maintenanceService } from '../services/maintenanceService.js';
import { catchAsync, successFormatter } from '../utils/index.js';

/**
 * Wipes all content from the database except for User records.
 * This is a highly destructive operation and should only be available to admins.
 */
export const wipeDatabase = catchAsync(async (req, res) => {
  const adminId = req.auth.userId;

  const deletedCounts = await maintenanceService.performContentWipe(adminId);

  return res.json(
    successFormatter.formatSuccess(
      { deletedCounts },
      'Database content wiped successfully'
    )
  );
});
