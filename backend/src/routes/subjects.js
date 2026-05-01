import { Router } from 'express';
import {
  requireAuthentication,
  isAdmin,
  isEditor,
} from '../middlewares/auth.middleware.js';
import * as subjectController from '../controllers/subjectController.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { subjectZodSchema } from '../models/Subject.js';

const router = Router();

const updateSubjectSchema = subjectZodSchema.partial();

/**
 * @openapi
 * /subjects:
 *   get:
 *     tags: [Subjects]
 *     summary: List all subjects
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: List of subjects
 */
router.get('/', paginate(), subjectController.list);

/**
 * @openapi
 * /subjects/{slug}:
 *   get:
 *     tags: [Subjects]
 *     summary: Get a subject by slug
 */
router.get('/:slug', subjectController.getBySlug);

/**
 * @openapi
 * /subjects:
 *   post:
 *     tags: [Subjects]
 *     summary: Create a subject (Editor / Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/',
  requireAuthentication,
  isEditor,
  validateBody(subjectZodSchema),
  subjectController.create
);

/**
 * @openapi
 * /subjects/{id}:
 *   patch:
 *     tags: [Subjects]
 *     summary: Update a subject (Editor / Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  '/:id',
  requireAuthentication,
  isEditor,
  validateBody(updateSubjectSchema),
  subjectController.update
);

/**
 * @openapi
 * /subjects/{id}:
 *   delete:
 *     tags: [Subjects]
 *     summary: Delete a subject (Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', requireAuthentication, isAdmin, subjectController.remove);

export default router;
