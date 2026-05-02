import { Router } from 'express';
import {
  requireAuthentication,
  isAdmin,
} from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { semesterZodSchema } from '../models/Semester.js';
import * as semesterController from '../controllers/semesterController.js';

const router = Router({ mergeParams: true }); // gives us :branchId

const updateSemesterSchema = semesterZodSchema
  .partial()
  .omit({ branchId: true });

/**
 * @openapi
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
 */
router.get('/', semesterController.list);

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
 *             type: object
 *             required: [number, slug]
 *             properties:
 *               number: { type: integer, minimum: 1, maximum: 8 }
 *               slug: { type: string }
 *               title: { type: string }
 *     responses:
 *       201:
 *         description: Created
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
 *             type: object
 *             properties:
 *               number: { type: integer, minimum: 1, maximum: 8 }
 *               slug: { type: string }
 *               title: { type: string }
 *     responses:
 *       200:
 *         description: Updated
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
