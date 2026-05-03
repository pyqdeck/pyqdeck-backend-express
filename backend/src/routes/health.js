import { Router } from 'express';
import * as healthController from '../controllers/healthController.js';
import { isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     operationId: getHealth
 *     tags: [System]
 *     summary: Basic health check
 *     description: Returns the operational status of the API instance. Used by load balancers and uptime monitors.
 *     responses:
 *       200:
 *         description: API is operational
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         status:
 *                           type: string
 *                           example: healthy
 *                         timestamp:
 *                           type: string
 *                           format: date-time
 *       503:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/health', healthController.healthCheck);

/**
 * @swagger
 * /health/detailed:
 *   get:
 *     operationId: getHealthDetailed
 *     tags: [System]
 *     summary: Detailed system health
 *     description: Provides deep insights into system health, including database connectivity, memory usage, and process uptime.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All systems operational
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         status:
 *                           type: string
 *                           example: healthy
 *                         database:
 *                           type: string
 *                           example: connected
 *                         memory:
 *                           type: object
 *                           properties:
 *                             rss: { type: string, example: "120 MB" }
 *                             heapTotal: { type: string, example: "80 MB" }
 *                         uptime:
 *                           type: number
 *                           example: 3600
 *       503:
 *         description: System degradation detected (e.g., database disconnected)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/health/detailed', isAdmin, healthController.detailedHealth);

export default router;
