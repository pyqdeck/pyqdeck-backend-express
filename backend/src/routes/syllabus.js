import { Router } from 'express';
import * as syllabusController from '../controllers/syllabusController.js';
import { paginate } from '../middlewares/pagination.middleware.js';

const router = Router();

/**
 * @openapi
 * /subject-offerings/{subjectOfferingId}/syllabus:
 *   get:
 *     operationId: getSyllabusBySubjectOffering
 *     tags: [Syllabus]
 *     summary: Get syllabus with modules and topics
 *     parameters:
 *       - in: path
 *         name: subjectOfferingId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Syllabus hierarchy
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       allOf:
 *                         - $ref: '#/components/schemas/Syllabus'
 *                         - type: object
 *                           properties:
 *                             modules:
 *                               type: array
 *                               items:
 *                                 allOf:
 *                                   - $ref: '#/components/schemas/Module'
 *                                   - type: object
 *                                     properties:
 *                                       topics:
 *                                         type: array
 *                                         items:
 *                                           $ref: '#/components/schemas/Topic'
 */
router.get(
  '/subject-offerings/:subjectOfferingId/syllabus',
  syllabusController.getBySubjectOffering
);

/**
 * @openapi
 * /modules/{id}/questions:
 *   get:
 *     operationId: getModuleQuestions
 *     tags: [Syllabus]
 *     summary: Get questions for a module
 *     parameters:
 *       - in: path
 *         name: id
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
 *         description: List of questions
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
 *                             $ref: '#/components/schemas/Question'
 *                         pagination:
 *                           $ref: '#/components/schemas/Pagination'
 */
router.get(
  '/modules/:id/questions',
  paginate(),
  syllabusController.getModuleQuestions
);

/**
 * @openapi
 * /topics/{id}/questions:
 *   get:
 *     operationId: getTopicQuestions
 *     tags: [Syllabus]
 *     summary: Get questions for a topic
 *     parameters:
 *       - in: path
 *         name: id
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
 *         description: List of questions
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
 *                             $ref: '#/components/schemas/Question'
 *                         pagination:
 *                           $ref: '#/components/schemas/Pagination'
 */
router.get(
  '/topics/:id/questions',
  paginate(),
  syllabusController.getTopicQuestions
);

export default router;
