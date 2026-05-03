import seoService from '../services/seoService.js';
import { successFormatter, catchAsync } from '../utils/index.js';

/**
 * GET /api/v1/seo/sitemap-data
 * Returns a list of all public URLs and their last mod dates for SEO
 */
export const getSitemapData = catchAsync(async (req, res, next) => {
  const data = await seoService.getSitemapData();
  res.json(successFormatter.formatSuccess(data, 'Sitemap data fetched'));
});
