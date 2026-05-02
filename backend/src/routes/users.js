import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { requireAuthentication } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @openapi
 * /users/me:
 *   get:
 *     operationId: getCurrentUser
 *     tags: [Users]
 *     summary: Get my profile and activity stats
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User record and bookmark/solution counts
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/me', requireAuthentication, userController.getMe);

export default router;
