import universityService from '../services/universityService.js';
import { successFormatter } from '../utils/index.js';

/**
 * GET /api/v1/universities
 */
export async function list(req, res, next) {
  try {
    const filter = {};
    // Allow filtering by active status (default: only active)
    if (req.query.isActive !== 'all') {
      filter.isActive = true;
    }

    const { items, total, page, limit } = await universityService.list(
      filter,
      req.pagination
    );
    res.json(
      successFormatter.formatList(
        items,
        total,
        page,
        limit,
        'Universities fetched'
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/universities/:slug
 */
export async function getBySlug(req, res, next) {
  try {
    const university = await universityService.getBySlug(req.params.slug);
    res.json(successFormatter.formatSuccess(university, 'University fetched'));
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/universities
 * Admin only
 */
export async function create(req, res, next) {
  try {
    const university = await universityService.create(req.body);
    res
      .status(201)
      .json(successFormatter.formatSuccess(university, 'University created'));
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/v1/universities/:id
 * Admin only
 */
export async function update(req, res, next) {
  try {
    const university = await universityService.update(req.params.id, req.body);
    res.json(successFormatter.formatSuccess(university, 'University updated'));
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/v1/universities/:id
 * Admin only
 */
export async function remove(req, res, next) {
  try {
    await universityService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
