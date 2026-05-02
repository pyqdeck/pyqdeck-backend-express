import { Router } from 'express';
import * as searchController from '../controllers/searchController.js';
import { paginate } from '../middlewares/pagination.middleware.js';

const router = Router();

/**
 * @openapi
 * /search:
 *   get:
 *     tags: [Search]
 *     summary: Global unified search
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Aggregated search results }
 */
router.get('/', paginate(), searchController.unifiedSearch);

export default router;
