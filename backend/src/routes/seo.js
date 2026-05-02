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
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           url: { type: string }
 *                           lastMod: { type: string, format: date-time }
 *                           priority: { type: number }
 */
router.get('/sitemap-data', seoController.getSitemapData);

export default router;
