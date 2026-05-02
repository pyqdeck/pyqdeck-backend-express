import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { requireAuthentication } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @openapi
 * /users/me:
 *   get:
 *     tags: [Users]
 *     summary: Get my profile and stats
 *     responses:
 *       200: { description: User data and activity stats }
 */
router.get('/me', requireAuthentication, userController.getMe);

export default router;
