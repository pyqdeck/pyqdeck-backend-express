import express from 'express';
import { getStudioOverview } from '../controllers/analyticsController.js';
import { requireAuthentication } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/auth.middleware.js';
import { UserRole } from '../utils/constants.js';

const router = express.Router();

// All analytics routes require authentication and Admin/Editor privileges
router.use(requireAuthentication);
router.use(authorize([UserRole.ADMIN, UserRole.EDITOR]));

/**
 * @swagger
 * /analytics/studio-overview:
 *   get:
 *     summary: Get studio dashboard overview metrics
 *     description: Aggregates total users, papers, questions, pending queues, and chart data for the Admin Studio.
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Studio overview retrieved successfully
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
 *                         metrics:
 *                           type: object
 *                         charts:
 *                           type: object
 *                         queues:
 *                           type: object
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.get('/studio-overview', getStudioOverview);

export default router;
