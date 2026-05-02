import { Router } from 'express';
import {
  requireAuthentication,
  isAdmin,
  isEditor,
} from '../middlewares/auth.middleware.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { subjectOfferingZodSchema } from '../models/SubjectOffering.js';
import * as subjectOfferingController from '../controllers/subjectOfferingController.js';

const router = Router();

const updateSchema = subjectOfferingZodSchema.partial().omit({
  slug: true,
  universityId: true,
  branchId: true,
  semesterId: true,
  subjectId: true,
});

/**
 * GET /api/v1/subject-offerings
 * ?universityId=&branchId=&semesterId= (preferred)
 * ?semesterId= (fallback)
 */
router.get('/', paginate(), subjectOfferingController.list);

/**
 * GET /api/v1/subject-offerings/id/:id
 */
router.get('/id/:id', subjectOfferingController.getById);

/**
 * GET /api/v1/subject-offerings/:slug
 */
router.get('/:slug', subjectOfferingController.getBySlug);

/**
 * POST /api/v1/subject-offerings
 * Editor / Admin only
 */
router.post(
  '/',
  requireAuthentication,
  isEditor,
  validateBody(subjectOfferingZodSchema),
  subjectOfferingController.create
);

/**
 * PATCH /api/v1/subject-offerings/:id
 * Admin only
 */
router.patch(
  '/:id',
  requireAuthentication,
  isAdmin,
  validateBody(updateSchema),
  subjectOfferingController.update
);

/**
 * DELETE /api/v1/subject-offerings/:id
 * Admin only
 */
router.delete(
  '/:id',
  requireAuthentication,
  isAdmin,
  subjectOfferingController.remove
);

export default router;
