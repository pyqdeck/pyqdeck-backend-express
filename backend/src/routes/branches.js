import { Router } from 'express';
import {
  requireAuthentication,
  isAdmin,
} from '../middlewares/auth.middleware.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { branchZodSchema } from '../models/Branch.js';
import * as branchController from '../controllers/branchController.js';

const router = Router({ mergeParams: true }); // mergeParams gives us :universityId

const updateBranchSchema = branchZodSchema
  .partial()
  .omit({ universityId: true });

/**
 * @openapi
 * /branches:
 *   get:
 *     operationId: listAllBranches
 *     tags: [Branches]
 *     summary: List all branches across all universities
 *     parameters:
 *       - in: query
 *         name: universityId
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
 *       - in: query
 *         name: isActive
 *         schema: { type: string, enum: [true, all] }
 *     responses:
 *       200:
 *         description: Paginated branches
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
 *                             $ref: '#/components/schemas/Branch'
 *                         pagination:
 *                           $ref: '#/components/schemas/Pagination'
 * /universities/{universityId}/branches:
 *   get:
 *     operationId: listBranches
 *     tags: [Branches]
 *     summary: List branches for a university
 *     parameters:
 *       - in: path
 *         name: universityId
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
 *     responses:
 *       200:
 *         description: Paginated branches
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
 *                             $ref: '#/components/schemas/Branch'
 *                         pagination:
 *                           $ref: '#/components/schemas/Pagination'
 */
router.get('/', paginate(), (req, res, next) => {
  if (req.params.universityId) {
    return branchController.list(req, res, next);
  }
  return branchController.listAll(req, res, next);
});

/**
 * @openapi
 * /universities/{universityId}/branches/{slug}:
 *   get:
 *     operationId: getBranchBySlug
 *     tags: [Branches]
 *     summary: Get a branch by slug under a university
 *     parameters:
 *       - in: path
 *         name: universityId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Branch details
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Branch'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:slug', branchController.getBySlug);

/**
 * @openapi
 * /universities/{universityId}/branches/{id}/structure:
 *   get:
 *     operationId: getBranchStructure
 *     tags: [Branches]
 *     summary: Get full course structure (semesters and subjects) for a branch
 *     parameters:
 *       - in: path
 *         name: universityId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Course structure tree
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           semester:
 *                             $ref: '#/components/schemas/Semester'
 *                           subjects:
 *                             type: array
 *                             items:
 *                               $ref: '#/components/schemas/Subject'
 */
router.get('/:id/structure', branchController.getStructure);

/**
 * @openapi
 * /universities/{universityId}/branches:
 *   post:
 *     operationId: createBranch
 *     tags: [Branches]
 *     summary: Create a branch (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: universityId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       description: Branch payload (universityId is taken from the URL path)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
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
 *                       $ref: '#/components/schemas/Branch'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post(
  '/',
  requireAuthentication,
  isAdmin,
  validateBody(branchZodSchema.omit({ universityId: true })),
  branchController.create
);

/**
 * @openapi
 * /universities/{universityId}/branches/bulk:
 *   post:
 *     operationId: bulkCreateBranches
 *     tags: [Branches]
 *     summary: Bulk create branches for a university (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: universityId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Branch'
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
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Branch'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post(
  '/bulk',
  requireAuthentication,
  isAdmin,
  branchController.bulkCreate
);

/**
 * @openapi
 * /universities/{universityId}/branches/{id}:
 *   patch:
 *     operationId: updateBranch
 *     tags: [Branches]
 *     summary: Update a branch (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: universityId
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
 *             $ref: '#/components/schemas/Branch'
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
 *                       $ref: '#/components/schemas/Branch'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.patch(
  '/:id',
  requireAuthentication,
  isAdmin,
  validateBody(updateBranchSchema),
  branchController.update
);

/**
 * @openapi
 * /universities/{universityId}/branches/{id}:
 *   delete:
 *     operationId: deleteBranch
 *     tags: [Branches]
 *     summary: Delete a branch (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: universityId
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
router.delete('/:id', requireAuthentication, isAdmin, branchController.remove);

export default router;
