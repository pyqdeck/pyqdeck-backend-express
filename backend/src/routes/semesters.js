import { Router } from 'express';
import {
  requireAuthentication,
  isAdmin,
} from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { semesterZodSchema } from '../models/Semester.js';
import * as semesterController from '../controllers/semesterController.js';

const router = Router({ mergeParams: true }); // gives us :branchId

const updateSemesterSchema = semesterZodSchema
  .partial()
  .omit({ branchId: true });

/**
 * GET /api/v1/branches/:branchId/semesters
 */
router.get('/', semesterController.list);

/**
 * GET /api/v1/branches/:branchId/semesters/:number
 */
router.get('/:number', semesterController.getByNumber);

/**
 * POST /api/v1/branches/:branchId/semesters
 * Admin only
 */
router.post(
  '/',
  requireAuthentication,
  isAdmin,
  validateBody(semesterZodSchema.omit({ branchId: true })),
  semesterController.create
);

/**
 * PATCH /api/v1/branches/:branchId/semesters/:id
 * Admin only
 */
router.patch(
  '/:id',
  requireAuthentication,
  isAdmin,
  validateBody(updateSemesterSchema),
  semesterController.update
);

/**
 * DELETE /api/v1/branches/:branchId/semesters/:id
 * Admin only
 */
router.delete(
  '/:id',
  requireAuthentication,
  isAdmin,
  semesterController.remove
);

export default router;
