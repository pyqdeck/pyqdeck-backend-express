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
 */
router.get('/', paginate(), searchController.unifiedSearch);

export default router;
