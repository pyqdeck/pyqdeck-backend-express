import * as healthService from '../services/healthService.js';
import { successFormatter, catchAsync } from '../utils/index.js';

export const healthCheck = catchAsync(async (req, res, next) => {
  const health = await healthService.getHealth();

  const statusCode = health.status === 'healthy' ? 200 : 503;
  res
    .status(statusCode)
    .json(successFormatter.formatSuccess(health, 'Health check passed'));
});

export const detailedHealth = catchAsync(async (req, res, next) => {
  const health = await healthService.getDetailedHealth();

  const statusCode = health.status === 'healthy' ? 200 : 503;
  res
    .status(statusCode)
    .json(
      successFormatter.formatSuccess(health, 'Detailed health check passed')
    );
});
