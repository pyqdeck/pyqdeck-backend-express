import syllabusService from '../services/syllabusService.js';
import { successFormatter } from '../utils/index.js';

/**
 * GET /api/v1/subject-offerings/:subjectOfferingId/syllabus
 */
export async function getBySubjectOffering(req, res, next) {
  try {
    const syllabus = await syllabusService.getBySubjectOffering(
      req.params.subjectOfferingId
    );
    res.json(successFormatter.formatSuccess(syllabus, 'Syllabus fetched'));
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/modules/:id/questions
 */
export async function getModuleQuestions(req, res, next) {
  try {
    const { items, total, page, limit } =
      await syllabusService.getModuleQuestions(req.params.id, req.pagination);
    res.json(
      successFormatter.formatList(
        items,
        total,
        page,
        limit,
        'Module questions fetched'
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/topics/:id/questions
 */
export async function getTopicQuestions(req, res, next) {
  try {
    const { items, total, page, limit } =
      await syllabusService.getTopicQuestions(req.params.id, req.pagination);
    res.json(
      successFormatter.formatList(
        items,
        total,
        page,
        limit,
        'Topic questions fetched'
      )
    );
  } catch (error) {
    next(error);
  }
}
