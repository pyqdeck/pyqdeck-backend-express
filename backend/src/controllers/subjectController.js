import subjectService from '../services/subjectService.js';
import { successFormatter } from '../utils/index.js';

/**
 * GET /api/v1/subjects
 */
export async function list(req, res, next) {
  try {
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
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/subjects/:slug
 */
export async function getBySlug(req, res, next) {
  try {
    const subject = await subjectService.getBySlug(req.params.slug);
    res.json(successFormatter.formatSuccess(subject, 'Subject fetched'));
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/subjects
 * Admin / Editor only
 */
export async function create(req, res, next) {
  try {
    const subject = await subjectService.create(req.body);
    res
      .status(201)
      .json(successFormatter.formatSuccess(subject, 'Subject created'));
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/v1/subjects/:id
 * Admin / Editor only
 */
export async function update(req, res, next) {
  try {
    const subject = await subjectService.update(req.params.id, req.body);
    res.json(successFormatter.formatSuccess(subject, 'Subject updated'));
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/v1/subjects/:id
 * Admin only
 */
export async function remove(req, res, next) {
  try {
    await subjectService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
