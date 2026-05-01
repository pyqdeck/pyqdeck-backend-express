import { Router } from 'express';
import {
  requireAuthentication,
  isAdmin,
} from '../middlewares/auth.middleware.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { universityZodSchema } from '../models/University.js';
import * as universityController from '../controllers/universityController.js';

const router = Router();

const updateUniversitySchema = universityZodSchema.partial();

/**
 * @openapi
 * /universities:
 *   get:
 *     tags: [Universities]
 *     summary: List all universities
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: isActive
 *         schema: { type: string, enum: [true, all] }
 *     responses:
 *       200:
 *         description: List of universities
 */
router.get('/', paginate(), universityController.list);

/**
 * @openapi
 * /universities/{slug}:
 *   get:
 *     tags: [Universities]
 *     summary: Get a university by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: University details
 *       404:
 *         description: Not found
 */
router.get('/:slug', universityController.getBySlug);

/**
 * @openapi
 * /universities:
 *   post:
 *     tags: [Universities]
 *     summary: Create a university (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/University'
 *     responses:
 *       201:
 *         description: University created
 *       403:
 *         description: Forbidden
 */
router.post(
  '/',
  requireAuthentication,
  isAdmin,
  validateBody(universityZodSchema),
  universityController.create
);

/**
 * @openapi
 * /universities/{id}:
 *   patch:
 *     tags: [Universities]
 *     summary: Update a university (Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  '/:id',
  requireAuthentication,
  isAdmin,
  validateBody(updateUniversitySchema),
  universityController.update
);

/**
 * @openapi
 * /universities/{id}:
 *   delete:
 *     tags: [Universities]
 *     summary: Delete a university (Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  '/:id',
  requireAuthentication,
  isAdmin,
  universityController.remove
);

export default router;
