import solutionService from '../services/solutionService.js';
import { successFormatter, catchAsync } from '../utils/index.js';

/**
 * GET /api/v1/questions/:questionId/solutions
 * Public: only approved. Admin: all statuses.
 */
export const listByQuestion = catchAsync(async (req, res, next) => {
  const isAdmin = req.dbUser?.role === 'admin';
  const { items, total, page, limit } = await solutionService.listByQuestion(
    req.params.questionId,
    req.pagination,
    isAdmin
  );
  res.json(
    successFormatter.formatList(items, total, page, limit, 'Solutions fetched')
  );
});

/**
 * GET /api/v1/solutions/:id
 */
export const getById = catchAsync(async (req, res, next) => {
  const solution = await solutionService.getById(req.params.id);
  res.json(successFormatter.formatSuccess(solution, 'Solution fetched'));
});

/**
 * POST /api/v1/questions/:questionId/solutions
 * Authenticated users — solution is pending until approved by admin.
 */
export const create = catchAsync(async (req, res, next) => {
  const solution = await solutionService.create(
    { ...req.body, questionId: req.params.questionId },
    req.dbUser?._id
  );
  res
    .status(201)
    .json(successFormatter.formatSuccess(solution, 'Solution submitted'));
});

/**
 * PATCH /api/v1/solutions/:id
 * Author or Admin can update content.
 */
export const update = catchAsync(async (req, res, next) => {
  const solution = await solutionService.update(req.params.id, req.body);
  res.json(successFormatter.formatSuccess(solution, 'Solution updated'));
});

/**
 * PATCH /api/v1/solutions/:id/status
 * Admin only — approve or reject a solution.
 */
export const updateStatus = catchAsync(async (req, res, next) => {
  const solution = await solutionService.updateStatus(
    req.params.id,
    req.body.status
  );
  res.json(
    successFormatter.formatSuccess(
      solution,
      `Solution status set to ${req.body.status}`
    )
  );
});

/**
 * POST /api/v1/solutions/:id/vote
 * Authenticated users — type: "up" | "down"
 */
export const vote = catchAsync(async (req, res, next) => {
  const { type } = req.body;
  if (!['up', 'down'].includes(type)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Vote type must be "up" or "down"' });
  }
  const solution = await solutionService.vote(req.params.id, type);
  res.json(successFormatter.formatSuccess(solution, `Vote recorded`));
});

/**
 * DELETE /api/v1/solutions/:id
 * Admin only
 */
export const remove = catchAsync(async (req, res, next) => {
  await solutionService.delete(req.params.id);
  res.status(204).send();
});
