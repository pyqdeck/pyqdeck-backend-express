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
 *       200: { description: Syllabus hierarchy }
 */
router.get(
  '/subject-offerings/:subjectOfferingId/syllabus',
  syllabusController.getBySubjectOffering
);

/**
 * @openapi
 * /modules/{id}/questions:
 *   get:
 *     tags: [Syllabus]
 *     summary: Get questions for a module
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of questions }
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
 *     tags: [Syllabus]
 *     summary: Get questions for a topic
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of questions }
 */
router.get(
  '/topics/:id/questions',
  paginate(),
  syllabusController.getTopicQuestions
);

export default router;
