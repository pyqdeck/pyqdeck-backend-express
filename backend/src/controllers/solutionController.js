import solutionService from '../services/solutionService.js';
import { successFormatter } from '../utils/index.js';

/**
 * GET /api/v1/questions/:questionId/solutions
 * Public: only approved. Admin: all statuses.
 */
export async function listByQuestion(req, res, next) {
  try {
    const isAdmin = req.dbUser?.role === 'admin';
    const { items, total, page, limit } = await solutionService.listByQuestion(
      req.params.questionId,
      req.pagination,
      isAdmin
    );
    res.json(
      successFormatter.formatList(
        items,
        total,
        page,
        limit,
        'Solutions fetched'
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/solutions/:id
 */
export async function getById(req, res, next) {
  try {
    const solution = await solutionService.getById(req.params.id);
    res.json(successFormatter.formatSuccess(solution, 'Solution fetched'));
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/questions/:questionId/solutions
 * Authenticated users — solution is pending until approved by admin.
 */
export async function create(req, res, next) {
  try {
    const solution = await solutionService.create(
      { ...req.body, questionId: req.params.questionId },
      req.dbUser?._id
    );
    res
      .status(201)
      .json(successFormatter.formatSuccess(solution, 'Solution submitted'));
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/v1/solutions/:id
 * Author or Admin can update content.
 */
export async function update(req, res, next) {
  try {
    const solution = await solutionService.update(req.params.id, req.body);
    res.json(successFormatter.formatSuccess(solution, 'Solution updated'));
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/v1/solutions/:id/status
 * Admin only — approve or reject a solution.
 */
export async function updateStatus(req, res, next) {
  try {
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
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/solutions/:id/vote
 * Authenticated users — type: "up" | "down"
 */
export async function vote(req, res, next) {
  try {
    const { type } = req.body;
    if (!['up', 'down'].includes(type)) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Vote type must be "up" or "down"' });
    }
    const solution = await solutionService.vote(req.params.id, type);
    res.json(successFormatter.formatSuccess(solution, `Vote recorded`));
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/v1/solutions/:id
 * Admin only
 */
export async function remove(req, res, next) {
  try {
    await solutionService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
