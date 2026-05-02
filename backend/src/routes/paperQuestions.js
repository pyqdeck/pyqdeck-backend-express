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
 * @openapi
 * /papers/{paperId}/questions:
 *   get:
 *     operationId: listQuestionsForPaper
 *     tags: [PaperQuestions]
 *     summary: List questions linked to a paper (ordered)
 *     parameters:
 *       - in: path
 *         name: paperId
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Paginated questions for the paper
 */
router.get('/', paginate(), questionController.listByPaper);

/**
 * @openapi
 * /papers/{paperId}/questions:
 *   post:
 *     operationId: createQuestionForPaper
 *     tags: [PaperQuestions]
 *     summary: Create a question and link it to this paper (Editor or Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paperId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Question created and linked
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post(
  '/',
  requireAuthentication,
  isEditor,
  validateBody(questionZodSchema),
  questionController.createForPaper
);

/**
 * @openapi
 * /papers/{paperId}/questions/{questionId}/link:
 *   post:
 *     operationId: linkQuestionToPaper
 *     tags: [PaperQuestions]
 *     summary: Link an existing question to this paper (Editor or Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paperId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Optional ordering/metadata for the paper–question mapping
 *     responses:
 *       201:
 *         description: Linked
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post(
  '/:questionId/link',
  requireAuthentication,
  isEditor,
  questionController.linkToPaper
);

/**
 * @openapi
 * /papers/{paperId}/questions/{questionId}/solutions:
 *   get:
 *     operationId: listSolutionsForPaperQuestion
 *     tags: [PaperQuestions]
 *     summary: List solutions for a question in the context of a paper
 *     parameters:
 *       - in: path
 *         name: paperId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Paginated solutions
 */
router.get(
  '/:questionId/solutions',
  paginate(),
  solutionController.listByQuestion
);

/**
 * @openapi
 * /papers/{paperId}/questions/{questionId}/solutions:
 *   post:
 *     operationId: createSolutionForPaperQuestion
 *     tags: [PaperQuestions]
 *     summary: Post a new solution for this question (authenticated)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paperId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Solution body without questionId or authorId (derived server-side)
 *     responses:
 *       201:
 *         description: Solution created
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post(
  '/:questionId/solutions',
  requireAuthentication,
  validateBody(solutionZodSchema.omit({ questionId: true, authorId: true })),
  solutionController.create
);

export default router;
