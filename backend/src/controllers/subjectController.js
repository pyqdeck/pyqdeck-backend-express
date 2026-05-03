import subjectService from '../services/subjectService.js';
import { successFormatter, catchAsync } from '../utils/index.js';

/**
 * GET /api/v1/subjects
 */
export const list = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.query.isActive !== 'all') {
    filter.isActive = true;
  }

  // Add university/branch filters if provided
  if (req.query.universityId) {
    filter.universityId = req.query.universityId;
  }
  if (req.query.branchId) {
    filter.branchId = req.query.branchId;
  }

  const { items, total, page, limit } = await subjectService.list(
    filter,
    req.pagination
  );
  res.json(
    successFormatter.formatList(items, total, page, limit, 'Subjects fetched')
  );
});

/**
 * GET /api/v1/subjects/:slug
 */
export const getBySlug = catchAsync(async (req, res, next) => {
  const subject = await subjectService.getBySlug(req.params.slug);
  res.json(successFormatter.formatSuccess(subject, 'Subject fetched'));
});

/**
 * POST /api/v1/subjects
 * Admin / Editor only
 */
export const create = catchAsync(async (req, res, next) => {
  const subject = await subjectService.create(req.body);
  res
    .status(201)
    .json(successFormatter.formatSuccess(subject, 'Subject created'));
});

/**
 * PATCH /api/v1/subjects/:id
 * Admin / Editor only
 */
export const update = catchAsync(async (req, res, next) => {
  const subject = await subjectService.update(req.params.id, req.body);
  res.json(successFormatter.formatSuccess(subject, 'Subject updated'));
});

/**
 * DELETE /api/v1/subjects/:id
 * Admin only
 */
export const remove = catchAsync(async (req, res, next) => {
  await subjectService.delete(req.params.id);
  res.status(204).send();
});
