import paperService from '../services/paperService.js';
import { successFormatter } from '../utils/index.js';

/**
 * GET /api/v1/papers
 */
export async function list(req, res, next) {
  try {
    const filter = {};
    // Public users only see approved papers
    const isAdmin = req.dbUser?.role === 'admin';
    if (!isAdmin) filter.status = 'approved';

    // Optional query filters
    if (req.query.examYear) filter.examYear = Number(req.query.examYear);
    if (req.query.examType) filter.examType = req.query.examType;
    if (req.query.subjectOfferingId)
      filter.subjectOfferingId = req.query.subjectOfferingId;

    const { items, total, page, limit } = await paperService.list(
      filter,
      req.pagination
    );
    res.json(
      successFormatter.formatList(items, total, page, limit, 'Papers fetched')
    );
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/papers/:slug
 */
export async function getBySlug(req, res, next) {
  try {
    const paper = await paperService.getBySlug(req.params.slug);
    res.json(successFormatter.formatSuccess(paper, 'Paper fetched'));
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/papers
 * Editor / Admin only
 */
export async function create(req, res, next) {
  try {
    const paper = await paperService.create(req.body, req.dbUser?._id);
    res
      .status(201)
      .json(successFormatter.formatSuccess(paper, 'Paper created'));
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/v1/papers/:id
 * Editor / Admin only
 */
export async function update(req, res, next) {
  try {
    const paper = await paperService.update(req.params.id, req.body);
    res.json(successFormatter.formatSuccess(paper, 'Paper updated'));
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/v1/papers/:id/status
 * Admin only — approve / reject papers
 */
export async function updateStatus(req, res, next) {
  try {
    const paper = await paperService.updateStatus(
      req.params.id,
      req.body.status
    );
    res.json(
      successFormatter.formatSuccess(
        paper,
        `Paper status set to ${req.body.status}`
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/v1/papers/:id
 * Admin only
 */
export async function remove(req, res, next) {
  try {
    await paperService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
