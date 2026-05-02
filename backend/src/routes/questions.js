import { Router } from 'express';
import {
  requireAuthentication,
  isAdmin,
  isEditor,
} from '../middlewares/auth.middleware.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { questionZodSchema } from '../models/Question.js';
import * as questionController from '../controllers/questionController.js';

const router = Router();

const updateQuestionSchema = questionZodSchema.partial();

/**
 * GET /api/v1/questions
 * Search questions with optional filters: ?type= ?difficulty= ?isVerified=
 */
router.get('/', paginate(), questionController.search);

/**
 * GET /api/v1/questions/slug/:slug
 */
router.get('/slug/:slug', questionController.getBySlug);

/**
 * GET /api/v1/questions/:id
 */
router.get('/:id', questionController.getById);

/**
 * POST /api/v1/questions
 * Standalone question creation. Editor / Admin only.
 */
router.post(
  '/',
  requireAuthentication,
  isEditor,
  validateBody(questionZodSchema),
  questionController.create
);

/**
 * PATCH /api/v1/questions/:id
 * Editor / Admin only
 */
router.patch(
  '/:id',
  requireAuthentication,
  isEditor,
  validateBody(updateQuestionSchema),
  questionController.update
);

/**
 * DELETE /api/v1/questions/:id
 * Admin only
 */
router.delete(
  '/:id',
  requireAuthentication,
  isAdmin,
  questionController.remove
);

export default router;
