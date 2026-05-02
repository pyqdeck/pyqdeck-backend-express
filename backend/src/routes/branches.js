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
 * GET /api/v1/universities/:universityId/branches
 */
router.get('/', paginate(), branchController.list);

/**
 * GET /api/v1/universities/:universityId/branches/:slug
 */
router.get('/:slug', branchController.getBySlug);

/**
 * POST /api/v1/universities/:universityId/branches
 * Admin only
 */
router.post(
  '/',
  requireAuthentication,
  isAdmin,
  validateBody(branchZodSchema.omit({ universityId: true })),
  branchController.create
);

/**
 * PATCH /api/v1/universities/:universityId/branches/:id
 * Admin only
 */
router.patch(
  '/:id',
  requireAuthentication,
  isAdmin,
  validateBody(updateBranchSchema),
  branchController.update
);

/**
 * DELETE /api/v1/universities/:universityId/branches/:id
 * Admin only
 */
router.delete('/:id', requireAuthentication, isAdmin, branchController.remove);

export default router;
