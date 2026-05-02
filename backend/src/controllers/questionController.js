import questionService from '../services/questionService.js';
import { successFormatter } from '../utils/index.js';

/**
 * GET /api/v1/papers/:paperId/questions
 * Lists all question-paper mappings for a paper (sorted by order).
 */
export async function listByPaper(req, res, next) {
  try {
    const { items, total, page, limit } = await questionService.listByPaper(
      req.params.paperId,
      req.pagination
    );
    res.json(
      successFormatter.formatList(
        items,
        total,
        page,
        limit,
        'Questions fetched'
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/questions/:id
 */
export async function getById(req, res, next) {
  try {
    const question = await questionService.getById(req.params.id);
    res.json(successFormatter.formatSuccess(question, 'Question fetched'));
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/questions/slug/:slug
 */
export async function getBySlug(req, res, next) {
  try {
    const question = await questionService.getBySlug(req.params.slug);
    res.json(successFormatter.formatSuccess(question, 'Question fetched'));
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/questions
 * Search / filter questions. Supports ?type= ?difficulty= ?isVerified=
 */
export async function search(req, res, next) {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    if (req.query.isVerified !== undefined)
      filter.isVerified = req.query.isVerified === 'true';

    const { items, total, page, limit } = await questionService.search(
      filter,
      req.pagination
    );
    res.json(
      successFormatter.formatList(
        items,
        total,
        page,
        limit,
        'Questions fetched'
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/questions
 * Create a standalone question. Editor / Admin only.
 */
export async function create(req, res, next) {
  try {
    const question = await questionService.create(req.body, req.dbUser?._id);
    res
      .status(201)
      .json(successFormatter.formatSuccess(question, 'Question created'));
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/papers/:paperId/questions
 * Create a question and immediately link it to a paper. Editor / Admin only.
 */
export async function createForPaper(req, res, next) {
  try {
    const { question, mapping } = await questionService.createForPaper(
      req.params.paperId,
      req.body,
      req.dbUser?._id
    );
    res
      .status(201)
      .json(
        successFormatter.formatSuccess(
          { question, mapping },
          'Question created and linked to paper'
        )
      );
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/papers/:paperId/questions/:questionId/link
 * Link an existing question to a paper. Editor / Admin only.
 */
export async function linkToPaper(req, res, next) {
  try {
    const mapping = await questionService.linkToPaper(
      req.params.paperId,
      req.params.questionId,
      req.body
    );
    res
      .status(201)
      .json(
        successFormatter.formatSuccess(mapping, 'Question linked to paper')
      );
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/v1/questions/:id
 * Editor / Admin only
 */
export async function update(req, res, next) {
  try {
    const question = await questionService.update(req.params.id, req.body);
    res.json(successFormatter.formatSuccess(question, 'Question updated'));
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/v1/questions/:id
 * Admin only
 */
export async function remove(req, res, next) {
  try {
    await questionService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
