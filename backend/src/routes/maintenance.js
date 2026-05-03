import { Router } from 'express';
import * as maintenanceController from '../controllers/maintenanceController.js';
import { isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @openapi
 * /maintenance/wipe-db:
 *   post:
 *     operationId: wipeDatabase
 *     tags: [Maintenance]
 *     summary: Wipe all content from database (Admin only)
 *     description: Deletes all records from all collections except 'users'. This is irreversible.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Database wiped successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post('/wipe-db', isAdmin, maintenanceController.wipeDatabase);

export default router;
