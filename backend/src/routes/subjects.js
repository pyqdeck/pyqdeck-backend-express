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
 *     operationId: listSubjects
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
 *                             $ref: '#/components/schemas/Subject'
 *                         pagination:
 *                           $ref: '#/components/schemas/Pagination'
 */
router.get('/', paginate(), subjectController.list);

/**
 * @openapi
 * /subjects/{slug}:
 *   get:
 *     operationId: getSubjectBySlug
 *     tags: [Subjects]
 *     summary: Get a subject by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Subject details
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Subject'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:slug', subjectController.getBySlug);

/**
 * @openapi
 * /subjects:
 *   post:
 *     operationId: createSubject
 *     tags: [Subjects]
 *     summary: Create a subject (Editor / Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Subject'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
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
 *     operationId: updateSubject
 *     tags: [Subjects]
 *     summary: Update a subject (Editor / Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
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
 *                       $ref: '#/components/schemas/Subject'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @openapi
 * /subjects/{id}:
 *   delete:
 *     operationId: deleteSubject
 *     tags: [Subjects]
 *     summary: Delete a subject (Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', requireAuthentication, isAdmin, subjectController.remove);

export default router;
