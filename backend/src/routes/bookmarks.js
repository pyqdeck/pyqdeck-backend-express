import { Router } from 'express';
import * as bookmarkController from '../controllers/bookmarkController.js';
import { requireAuthentication } from '../middlewares/auth.middleware.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { bookmarkZodSchema } from '../models/Bookmark.js';

const router = Router();

// All bookmark routes require authentication
router.use(requireAuthentication);

/**
 * @openapi
 * /bookmarks:
 *   get:
 *     tags: [Bookmarks]
 *     summary: List my bookmarks
 *     parameters:
 *       - in: query
 *         name: type
 *         schema: { type: string, enum: [question, paper, solution] }
 *     responses:
 *       200: { description: List of bookmarks }
 */
router.get('/', paginate(), bookmarkController.listMine);

/**
 * @openapi
 * /bookmarks/toggle:
 *   post:
 *     tags: [Bookmarks]
 *     summary: Toggle bookmark (add/remove)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [targetId, targetType]
 *             properties:
 *               targetId: { type: string }
 *               targetType: { type: string, enum: [question, paper, solution] }
 *               note: { type: string }
 *     responses:
 *       200: { description: Toggled state }
 */
router.post(
  '/toggle',
  validateBody(bookmarkZodSchema.omit({ userId: true })),
  bookmarkController.toggle
);

/**
 * @openapi
 * /bookmarks/:id:
 *   delete:
 *     tags: [Bookmarks]
 *     summary: Delete specific bookmark
 *     responses:
 *       204: { description: Deleted }
 */
router.delete('/:id', bookmarkController.remove);

export default router;
