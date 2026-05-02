import { Router } from 'express';
import {
  requireAuthentication,
  isEditor,
} from '../middlewares/auth.middleware.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { questionZodSchema } from '../models/Question.js';
import { solutionZodSchema } from '../models/Solution.js';
import * as questionController from '../controllers/questionController.js';
import * as solutionController from '../controllers/solutionController.js';

const router = Router({ mergeParams: true }); // Access :paperId

/**
 * GET /api/v1/papers/:paperId/questions
 * List all questions in a paper.
 */
router.get('/', paginate(), questionController.listByPaper);

/**
 * POST /api/v1/papers/:paperId/questions
 * Create and link a question to a paper.
 */
router.post(
  '/',
  requireAuthentication,
  isEditor,
  validateBody(questionZodSchema),
  questionController.createForPaper
);

/**
 * POST /api/v1/papers/:paperId/questions/:questionId/link
 * Link an existing question to a paper.
 */
router.post(
  '/:questionId/link',
  requireAuthentication,
  isEditor,
  questionController.linkToPaper
);

/**
 * GET /api/v1/questions/:questionId/solutions (Nested path)
 * This is usually handled at /api/v1/questions/:questionId/solutions
 * But we can also mount solution creation here if needed.
 */
router.get(
  '/:questionId/solutions',
  paginate(),
  solutionController.listByQuestion
);

router.post(
  '/:questionId/solutions',
  requireAuthentication,
  validateBody(solutionZodSchema.omit({ questionId: true, authorId: true })),
  solutionController.create
);

export default router;
