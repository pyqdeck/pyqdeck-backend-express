import { Router } from 'express';
import {
  requireAuthentication,
  isAdmin,
  isEditor,
} from '../middlewares/auth.middleware.js';
import * as paperController from '../controllers/paperController.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { paperZodSchema, PaperStatus } from '../models/Paper.js';
import { z } from 'zod';

const router = Router();

const updatePaperSchema = paperZodSchema.partial();
const statusSchema = z.object({ status: PaperStatus });

/**
 * @openapi
 * /papers:
 *   get:
 *     operationId: listPapers
 *     tags: [Papers]
 *     summary: List papers (public sees approved only)
 *     parameters:
 *       - in: query
 *         name: examYear
 *         schema: { type: integer }
 *       - in: query
 *         name: examType
 *         schema: { type: string }
 *       - in: query
 *         name: subjectOfferingId
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Paginated list of papers
 */
router.get('/', paginate(), paperController.list);

/**
 * @openapi
 * /papers/{slug}:
 *   get:
 *     operationId: getPaperBySlug
 *     tags: [Papers]
 *     summary: Get a paper by slug
 */
router.get('/:slug', paperController.getBySlug);

/**
 * @openapi
 * /papers:
 *   post:
 *     operationId: createPaper
 *     tags: [Papers]
 *     summary: Submit a new paper (Editor / Admin)
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/',
  requireAuthentication,
  isEditor,
  validateBody(paperZodSchema),
  paperController.create
);

/**
 * @openapi
 * /papers/{id}:
 *   patch:
 *     operationId: updatePaper
 *     tags: [Papers]
 *     summary: Update a paper (Editor / Admin)
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  '/:id',
  requireAuthentication,
  isEditor,
  validateBody(updatePaperSchema),
  paperController.update
);

/**
 * @openapi
 * /papers/{id}/status:
 *   patch:
 *     operationId: updatePaperStatus
 *     tags: [Papers]
 *     summary: Approve or reject a paper (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [draft, pending, approved, rejected]
 */
router.patch(
  '/:id/status',
  requireAuthentication,
  isAdmin,
  validateBody(statusSchema),
  paperController.updateStatus
);

/**
 * @openapi
 * /papers/{id}:
 *   delete:
 *     operationId: deletePaper
 *     tags: [Papers]
 *     summary: Delete a paper (Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', requireAuthentication, isAdmin, paperController.remove);

export default router;
