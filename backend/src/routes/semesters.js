import { Router } from 'express';
import {
  requireAuthentication,
  isAdmin,
} from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import { semesterZodSchema } from '../models/Semester.js';
import * as semesterController from '../controllers/semesterController.js';

const router = Router({ mergeParams: true }); // gives us :branchId

const updateSemesterSchema = semesterZodSchema
  .partial()
  .omit({ branchId: true });

/**
 * @openapi
 * /semesters:
 *   get:
 *     operationId: listAllSemesters
 *     tags: [Semesters]
 *     summary: List all semesters across all branches
 *     parameters:
 *       - in: query
 *         name: branchId
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
 *     responses:
 *       200:
 *         description: Semesters list
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
 *                             $ref: '#/components/schemas/Semester'
 *                         pagination:
 *                           $ref: '#/components/schemas/Pagination'
 * /branches/{branchId}/semesters:
 *   get:
 *     operationId: listSemesters
 *     tags: [Semesters]
 *     summary: List semesters for a branch
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Semesters list
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
 *                             $ref: '#/components/schemas/Semester'
 *                         pagination:
 *                           $ref: '#/components/schemas/Pagination'
 */
router.get('/', paginate(), semesterController.list);

/**
 * @openapi
 * /branches/{branchId}/semesters/{number}:
 *   get:
 *     operationId: getSemesterByNumber
 *     tags: [Semesters]
 *     summary: Get semester by number within a branch
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: number
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Semester details
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Semester'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:number', semesterController.getByNumber);

/**
 * @openapi
 * /branches/{branchId}/semesters:
 *   post:
 *     operationId: createSemester
 *     tags: [Semesters]
 *     summary: Create a semester (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       description: Payload without branchId (from URL path)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Semester'
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
 *                       $ref: '#/components/schemas/Semester'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post(
  '/',
  requireAuthentication,
  isAdmin,
  validateBody(semesterZodSchema.omit({ branchId: true })),
  semesterController.create
);

/**
 * @openapi
 * /branches/{branchId}/semesters/{id}:
 *   patch:
 *     operationId: updateSemester
 *     tags: [Semesters]
 *     summary: Update a semester (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Semester'
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
 *                       $ref: '#/components/schemas/Semester'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.patch(
  '/:id',
  requireAuthentication,
  isAdmin,
  validateBody(updateSemesterSchema),
  semesterController.update
);

/**
 * @openapi
 * /branches/{branchId}/semesters/{id}:
 *   delete:
 *     operationId: deleteSemester
 *     tags: [Semesters]
 *     summary: Delete a semester (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema: { type: string }
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
  semesterController.remove
);

export default router;
