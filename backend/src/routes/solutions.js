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
 * @openapi
 * /solutions/{id}:
 *   get:
 *     operationId: getSolutionById
 *     tags: [Solutions]
 *     summary: Get a solution by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Solution
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Solution'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:id', solutionController.getById);

/**
 * @openapi
 * /solutions/{id}:
 *   patch:
 *     operationId: updateSolution
 *     tags: [Solutions]
 *     summary: Update solution content (author or permitted roles)
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
 *             $ref: '#/components/schemas/Solution'
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
 *                       $ref: '#/components/schemas/Solution'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.patch(
  '/:id',
  requireAuthentication,
  validateBody(updateSolutionSchema),
  solutionController.update
);

/**
 * @openapi
 * /solutions/{id}/status:
 *   patch:
 *     operationId: updateSolutionStatus
 *     tags: [Solutions]
 *     summary: Approve or reject a solution (Admin only)
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
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [draft, pending, approved, rejected]
 *     responses:
 *       200:
 *         description: Status updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Solution'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.patch(
  '/:id/status',
  requireAuthentication,
  isAdmin,
  validateBody(statusSchema),
  solutionController.updateStatus
);

/**
 * @openapi
 * /solutions/{id}/vote:
 *   post:
 *     operationId: voteOnSolution
 *     tags: [Solutions]
 *     summary: Upvote or downvote a solution
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
 *             required: [type]
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [up, down]
 *     responses:
 *       200:
 *         description: Vote recorded
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
 *                         upvotes: { type: integer }
 *                         downvotes: { type: integer }
 *                         userVote: { type: string, enum: [up, down, none] }
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.post(
  '/:id/vote',
  requireAuthentication,
  validateBody(voteSchema),
  solutionController.vote
);

/**
 * @openapi
 * /solutions/{id}:
 *   delete:
 *     operationId: deleteSolution
 *     tags: [Solutions]
 *     summary: Delete a solution (Admin only)
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
  solutionController.remove
);

export default router;
