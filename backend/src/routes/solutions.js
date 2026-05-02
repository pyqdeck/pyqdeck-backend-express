import { Router } from 'express';
import {
  requireAuthentication,
  isAdmin,
} from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { solutionZodSchema, SolutionStatus } from '../models/Solution.js';
import * as solutionController from '../controllers/solutionController.js';
import { z } from 'zod';

const router = Router();

const updateSolutionSchema = solutionZodSchema
  .partial()
  .omit({ questionId: true, authorId: true });

const statusSchema = z.object({
  status: SolutionStatus,
});

const voteSchema = z.object({
  type: z.enum(['up', 'down']),
});

/**
 * GET /api/v1/solutions/:id
 */
router.get('/:id', solutionController.getById);

/**
 * PATCH /api/v1/solutions/:id
 * Authenticated — update solution content
 */
router.patch(
  '/:id',
  requireAuthentication,
  validateBody(updateSolutionSchema),
  solutionController.update
);

/**
 * PATCH /api/v1/solutions/:id/status
 * Admin only — approve or reject
 */
router.patch(
  '/:id/status',
  requireAuthentication,
  isAdmin,
  validateBody(statusSchema),
  solutionController.updateStatus
);

/**
 * POST /api/v1/solutions/:id/vote
 * Authenticated — upvote or downvote
 */
router.post(
  '/:id/vote',
  requireAuthentication,
  validateBody(voteSchema),
  solutionController.vote
);

/**
 * DELETE /api/v1/solutions/:id
 * Admin only
 */
router.delete(
  '/:id',
  requireAuthentication,
  isAdmin,
  solutionController.remove
);

export default router;
