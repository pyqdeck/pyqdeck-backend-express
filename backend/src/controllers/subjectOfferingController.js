import subjectOfferingService from '../services/subjectOfferingService.js';
import { successFormatter } from '../utils/index.js';

/**
 * GET /api/v1/subject-offerings
 * Supports filtering by ?universityId=&branchId=&semesterId=
 */
export async function list(req, res, next) {
  try {
    const { universityId, branchId, semesterId } = req.query;

    // If all three filters provided, use the optimised path
    if (universityId && branchId && semesterId) {
      const { items, total, page, limit } = await subjectOfferingService.list(
        { universityId, branchId, semesterId },
        req.pagination
      );
      return res.json(
        successFormatter.formatList(
          items,
          total,
          page,
          limit,
          'Subject offerings fetched'
        )
      );
    }

    // Fall back to semester-only filter
    if (semesterId) {
      const filter = {};
      if (req.query.isActive !== 'all') filter.isActive = true;
      const { items, total, page, limit } =
        await subjectOfferingService.listBySemester(
          semesterId,
          req.pagination,
          filter
        );
      return res.json(
        successFormatter.formatList(
          items,
          total,
          page,
          limit,
          'Subject offerings fetched'
        )
      );
    }

    res
      .status(400)
      .json({ status: 'error', message: 'semesterId query param is required' });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/subject-offerings/:slug
 */
export async function getBySlug(req, res, next) {
  try {
    const offering = await subjectOfferingService.getBySlug(req.params.slug);
    res.json(
      successFormatter.formatSuccess(offering, 'Subject offering fetched')
    );
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/subject-offerings/id/:id
 */
export async function getById(req, res, next) {
  try {
    const offering = await subjectOfferingService.getById(req.params.id);
    res.json(
      successFormatter.formatSuccess(offering, 'Subject offering fetched')
    );
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/subject-offerings
 * Admin / Editor only
 */
export async function create(req, res, next) {
  try {
    const offering = await subjectOfferingService.create(req.body);
    res
      .status(201)
      .json(
        successFormatter.formatSuccess(offering, 'Subject offering created')
      );
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/v1/subject-offerings/:id
 * Admin only
 */
export async function update(req, res, next) {
  try {
    const offering = await subjectOfferingService.update(
      req.params.id,
      req.body
    );
    res.json(
      successFormatter.formatSuccess(offering, 'Subject offering updated')
    );
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/v1/subject-offerings/:id
 * Admin only
 */
export async function remove(req, res, next) {
  try {
    await subjectOfferingService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
