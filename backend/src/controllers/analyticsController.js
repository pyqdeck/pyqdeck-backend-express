import analyticsService from '../services/analyticsService.js';
import { successFormatter } from '../utils/index.js';

/**
 * @desc    Get complete studio overview metrics
 * @route   GET /api/v1/analytics/studio-overview
 * @access  Private (Admin/Editor)
 */
export async function getStudioOverview(req, res, next) {
  try {
    const dashboardData = await analyticsService.getStudioOverviewData();

    return res
      .status(200)
      .json(
        successFormatter.formatSuccess(
          dashboardData,
          'Studio overview retrieved successfully'
        )
      );
  } catch (error) {
    next(error);
  }
}
