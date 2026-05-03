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
 *     operationId: listUniversities
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
 *         name: search
 *         schema: { type: string }
 *         description: Search by university name or short name
 *       - in: query
 *         name: isActive
 *         schema: { type: string, enum: [true, all] }
 *     responses:
 *       200:
 *         description: List of universities
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
 *                         items:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/University'
 *                         pagination:
 *                           $ref: '#/components/schemas/Pagination'
 */
router.get('/', paginate(), universityController.list);

/**
 * @openapi
 * /universities/{slug}:
 *   get:
 *     operationId: getUniversityBySlug
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
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/University'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:slug', universityController.getBySlug);

/**
 * @openapi
 * /universities:
 *   post:
 *     operationId: createUniversity
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
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/University'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
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
 *     operationId: updateUniversity
 *     tags: [Universities]
 *     summary: Update a university (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/University'
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/University'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
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
 *     operationId: deleteUniversity
 *     tags: [Universities]
 *     summary: Delete a university (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete(
  '/:id',
  requireAuthentication,
  isAdmin,
  universityController.remove
);

export default router;
