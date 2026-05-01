import * as healthService from '../services/healthService.js';
import { successFormatter } from '../utils/index.js';

export async function healthCheck(req, res, next) {
  try {
    const health = await healthService.getHealth();

    const statusCode = health.status === 'healthy' ? 200 : 503;
    res
      .status(statusCode)
      .json(successFormatter.formatSuccess(health, 'Health check passed'));
  } catch (error) {
    next(error);
  }
}

export async function detailedHealth(req, res, next) {
  try {
    const health = await healthService.getDetailedHealth();

    const statusCode = health.status === 'healthy' ? 200 : 503;
    res
      .status(statusCode)
      .json(
        successFormatter.formatSuccess(health, 'Detailed health check passed')
      );
  } catch (error) {
    next(error);
  }
}
