import semesterService from '../services/semesterService.js';
import { successFormatter } from '../utils/index.js';

/**
 * GET /api/v1/semesters (Global)
 * GET /api/v1/branches/:branchId/semesters
 */
export async function list(req, res, next) {
  try {
    const branchId = req.params.branchId || req.query.branchId;
    const { skip, limit, page } = req.pagination;

    const query = {};
    if (branchId && branchId !== 'all') query.branchId = branchId;

    const { items, total } = await semesterService.listAll(query, {
      skip,
      limit,
    });

    res.json(
      successFormatter.formatList(
        items,
        total,
        page,
        limit,
        'Semesters fetched'
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/branches/:branchId/semesters/:number
 * number = semester number (1–8)
 */
export async function getByNumber(req, res, next) {
  try {
    const number = Number(req.params.number);
    const semester = await semesterService.getByBranchAndNumber(
      req.params.branchId,
      number
    );
    res.json(successFormatter.formatSuccess(semester, 'Semester fetched'));
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/branches/:branchId/semesters
 * Admin only
 */
export async function create(req, res, next) {
  try {
    const semester = await semesterService.create({
      ...req.body,
      branchId: req.params.branchId,
    });
    res
      .status(201)
      .json(successFormatter.formatSuccess(semester, 'Semester created'));
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/v1/branches/:branchId/semesters/:id
 * Admin only
 */
export async function update(req, res, next) {
  try {
    const semester = await semesterService.update(req.params.id, req.body);
    res.json(successFormatter.formatSuccess(semester, 'Semester updated'));
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/v1/branches/:branchId/semesters/:id
 * Admin only
 */
export async function remove(req, res, next) {
  try {
    await semesterService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
