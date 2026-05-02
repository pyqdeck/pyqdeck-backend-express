import { Router } from 'express';
import {
  requireAuthentication,
  isAdmin,
  isEditor,
} from '../middlewares/auth.middleware.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { subjectOfferingZodSchema } from '../models/SubjectOffering.js';
import * as subjectOfferingController from '../controllers/subjectOfferingController.js';

const router = Router();

const updateSchema = subjectOfferingZodSchema.partial().omit({
  slug: true,
  universityId: true,
  branchId: true,
  semesterId: true,
  subjectId: true,
});

/**
 * @openapi
 * /subject-offerings:
 *   get:
 *     operationId: listSubjectOfferings
 *     tags: [SubjectOfferings]
 *     summary: List subject offerings (filter by university, branch, and/or semester)
 *     parameters:
 *       - in: query
 *         name: universityId
 *         schema: { type: string }
 *         description: Use with branchId and semesterId for the preferred filter
 *       - in: query
 *         name: branchId
 *         schema: { type: string }
 *       - in: query
 *         name: semesterId
 *         schema: { type: string }
 *         description: If alone, returns offerings for that semester
 *       - in: query
 *         name: isActive
 *         schema: { type: string, enum: [true, all] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Paginated subject offerings
 */
router.get('/', paginate(), subjectOfferingController.list);

/**
 * @openapi
 * /subject-offerings/id/{id}:
 *   get:
 *     operationId: getSubjectOfferingById
 *     tags: [SubjectOfferings]
 *     summary: Get a subject offering by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Subject offering
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/id/:id', subjectOfferingController.getById);

/**
 * @openapi
 * /subject-offerings/{slug}:
 *   get:
 *     operationId: getSubjectOfferingBySlug
 *     tags: [SubjectOfferings]
 *     summary: Get a subject offering by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Subject offering
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:slug', subjectOfferingController.getBySlug);

/**
 * @openapi
 * /subject-offerings:
 *   post:
 *     operationId: createSubjectOffering
 *     tags: [SubjectOfferings]
 *     summary: Create a subject offering (Editor or Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubjectOffering'
 *     responses:
 *       201:
 *         description: Created
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post(
  '/',
  requireAuthentication,
  isEditor,
  validateBody(subjectOfferingZodSchema),
  subjectOfferingController.create
);

/**
 * @openapi
 * /subject-offerings/{id}:
 *   patch:
 *     operationId: updateSubjectOffering
 *     tags: [SubjectOfferings]
 *     summary: Update a subject offering (Admin only)
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
 *             type: object
 *             description: Partial update (slug and foreign keys are not changed here)
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
  validateBody(updateSchema),
  subjectOfferingController.update
);

/**
 * @openapi
 * /subject-offerings/{id}:
 *   delete:
 *     operationId: deleteSubjectOffering
 *     tags: [SubjectOfferings]
 *     summary: Delete a subject offering (Admin only)
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
  subjectOfferingController.remove
);

export default router;
