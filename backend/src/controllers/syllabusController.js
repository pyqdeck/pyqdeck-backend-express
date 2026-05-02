import syllabusService from '../services/syllabusService.js';
import { successFormatter } from '../utils/index.js';

/**
 * POST /api/v1/syllabus
 */
export async function createSyllabus(req, res, next) {
  try {
    const syllabus = await syllabusService.createSyllabus(req.body);
    res
      .status(201)
      .json(successFormatter.formatSuccess(syllabus, 'Syllabus initialized'));
  } catch (error) {
    next(error);
  }
}

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
 * PATCH /api/v1/syllabus/:id
 */
export async function updateSyllabus(req, res, next) {
  try {
    const syllabus = await syllabusService.updateSyllabus(
      req.params.id,
      req.body
    );
    res.json(successFormatter.formatSuccess(syllabus, 'Syllabus updated'));
  } catch (error) {
    next(error);
  }
}

// Module Controllers
export async function createModule(req, res, next) {
  try {
    const module = await syllabusService.createModule(req.body);
    res
      .status(201)
      .json(successFormatter.formatSuccess(module, 'Module created'));
  } catch (error) {
    next(error);
  }
}

export async function listModules(req, res, next) {
  try {
    const { syllabusId } = req.query;
    const { items, total, page, limit } = await syllabusService.listModules(
      { syllabusId },
      req.pagination
    );
    res.json(
      successFormatter.formatList(items, total, page, limit, 'Modules fetched')
    );
  } catch (error) {
    next(error);
  }
}

export async function updateModule(req, res, next) {
  try {
    const module = await syllabusService.updateModule(req.params.id, req.body);
    res.json(successFormatter.formatSuccess(module, 'Module updated'));
  } catch (error) {
    next(error);
  }
}

export async function deleteModule(req, res, next) {
  try {
    await syllabusService.deleteModule(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

// Topic Controllers
export async function createTopic(req, res, next) {
  try {
    const topic = await syllabusService.createTopic(req.body);
    res
      .status(201)
      .json(successFormatter.formatSuccess(topic, 'Topic created'));
  } catch (error) {
    next(error);
  }
}

export async function updateTopic(req, res, next) {
  try {
    const topic = await syllabusService.updateTopic(req.params.id, req.body);
    res.json(successFormatter.formatSuccess(topic, 'Topic updated'));
  } catch (error) {
    next(error);
  }
}

export async function deleteTopic(req, res, next) {
  try {
    await syllabusService.deleteTopic(req.params.id);
    res.status(204).send();
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
