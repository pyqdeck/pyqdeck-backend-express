import branchService from '../services/branchService.js';
import { successFormatter } from '../utils/index.js';

/**
 * GET /api/v1/universities/:universityId/branches
 */
export async function list(req, res, next) {
  try {
    const filter = {};
    if (req.query.isActive !== 'all') filter.isActive = true;

    const { items, total, page, limit } = await branchService.listByUniversity(
      req.params.universityId,
      req.pagination,
      filter
    );
    res.json(
      successFormatter.formatList(items, total, page, limit, 'Branches fetched')
    );
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/branches/:id/structure
 */
export async function getStructure(req, res, next) {
  try {
    const structure = await branchService.getStructure(req.params.id);
    res.json(
      successFormatter.formatSuccess(structure, 'Branch structure fetched')
    );
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/universities/:universityId/branches/:slug
 */
export async function getBySlug(req, res, next) {
  try {
    const branch = await branchService.getBySlug(
      req.params.universityId,
      req.params.slug
    );
    res.json(successFormatter.formatSuccess(branch, 'Branch fetched'));
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/universities/:universityId/branches
 * Admin only
 */
export async function create(req, res, next) {
  try {
    const branch = await branchService.create({
      ...req.body,
      universityId: req.params.universityId,
    });
    res
      .status(201)
      .json(successFormatter.formatSuccess(branch, 'Branch created'));
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/v1/universities/:universityId/branches/:id
 * Admin only
 */
export async function update(req, res, next) {
  try {
    const branch = await branchService.update(req.params.id, req.body);
    res.json(successFormatter.formatSuccess(branch, 'Branch updated'));
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/v1/universities/:universityId/branches/:id
 * Admin only
 */
export async function remove(req, res, next) {
  try {
    await branchService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
