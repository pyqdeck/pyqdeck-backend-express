import { Router } from 'express';
import * as seoController from '../controllers/seoController.js';

const router = Router();

/**
 * @openapi
 * /seo/sitemap-data:
 *   get:
 *     operationId: getSitemapData
 *     tags: [SEO]
 *     summary: Get all public URLs for sitemap generation
 *     responses:
 *       200:
 *         description: List of public URLs
 */
router.get('/sitemap-data', seoController.getSitemapData);

export default router;
