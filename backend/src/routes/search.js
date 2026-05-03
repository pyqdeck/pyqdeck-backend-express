import { Router } from 'express';
import * as searchController from '../controllers/searchController.js';
import { paginate } from '../middlewares/pagination.middleware.js';

const router = Router();

/**
 * @openapi
 * /search:
 *   get:
 *     operationId: unifiedSearch
 *     tags: [Search]
 *     summary: Global unified search across catalog entities
 *     parameters:
 *       - in: query
 *         name: q
 *         required: false
 *         schema: { type: string }
 *         description: Search text (empty returns no-result payload)
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Aggregated search results
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
 *                         questions:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Question'
 *                         subjects:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Subject'
 *                         papers:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Paper'
 *                         totalQuestions: { type: integer }
 *                         totalSubjects: { type: integer }
 *                         totalPapers: { type: integer }
 */
router.get('/', paginate(), searchController.unifiedSearch);

export default router;
