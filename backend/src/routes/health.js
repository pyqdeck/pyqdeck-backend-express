import { Router } from 'express';
import * as healthController from '../controllers/healthController.js';

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Basic health check
 *     description: Returns the basic health status of the API.
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: healthy
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *       503:
 *         description: API is unhealthy
 */
router.get('/health', healthController.healthCheck);

/**
 * @openapi
 * /health/detailed:
 *   get:
 *     tags:
 *       - Health
 *     summary: Detailed health check
 *     description: Returns detailed health status including database connectivity and memory usage.
 *     responses:
 *       200:
 *         description: API is fully healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                     database:
 *                       type: string
 *                     memory:
 *                       type: object
 *                     uptime:
 *                       type: number
 *       503:
 *         description: API has issues (e.g. database down)
 */
router.get('/health/detailed', healthController.detailedHealth);

export default router;
