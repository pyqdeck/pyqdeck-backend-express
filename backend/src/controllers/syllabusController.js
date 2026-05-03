import syllabusService from '../services/syllabusService.js';
import { successFormatter, catchAsync } from '../utils/index.js';

/**
 * POST /api/v1/syllabus
 */
export const createSyllabus = catchAsync(async (req, res, next) => {
  const syllabus = await syllabusService.createSyllabus(req.body);
  res
    .status(201)
    .json(successFormatter.formatSuccess(syllabus, 'Syllabus initialized'));
});

/**
 * GET /api/v1/subject-offerings/:subjectOfferingId/syllabus
 */
export const getBySubjectOffering = catchAsync(async (req, res, next) => {
  const syllabus = await syllabusService.getBySubjectOffering(
    req.params.subjectOfferingId
  );
  res.json(successFormatter.formatSuccess(syllabus, 'Syllabus fetched'));
});

/**
 * PATCH /api/v1/syllabus/:id
 */
export const updateSyllabus = catchAsync(async (req, res, next) => {
  const syllabus = await syllabusService.updateSyllabus(
    req.params.id,
    req.body
  );
  res.json(successFormatter.formatSuccess(syllabus, 'Syllabus updated'));
});

// Module Controllers
export const createModule = catchAsync(async (req, res, next) => {
  const module = await syllabusService.createModule(req.body);
  res
    .status(201)
    .json(successFormatter.formatSuccess(module, 'Module created'));
});

export const listModules = catchAsync(async (req, res, next) => {
  const { syllabusId } = req.query;
  const { items, total, page, limit } = await syllabusService.listModules(
    { syllabusId },
    req.pagination
  );
  res.json(
    successFormatter.formatList(items, total, page, limit, 'Modules fetched')
  );
});

export const updateModule = catchAsync(async (req, res, next) => {
  const module = await syllabusService.updateModule(req.params.id, req.body);
  res.json(successFormatter.formatSuccess(module, 'Module updated'));
});

export const deleteModule = catchAsync(async (req, res, next) => {
  await syllabusService.deleteModule(req.params.id);
  res.status(204).send();
});

// Topic Controllers
export const createTopic = catchAsync(async (req, res, next) => {
  const topic = await syllabusService.createTopic(req.body);
  res.status(201).json(successFormatter.formatSuccess(topic, 'Topic created'));
});

export const updateTopic = catchAsync(async (req, res, next) => {
  const topic = await syllabusService.updateTopic(req.params.id, req.body);
  res.json(successFormatter.formatSuccess(topic, 'Topic updated'));
});

export const deleteTopic = catchAsync(async (req, res, next) => {
  await syllabusService.deleteTopic(req.params.id);
  res.status(204).send();
});

/**
 * GET /api/v1/modules/:id/questions
 */
export const getModuleQuestions = catchAsync(async (req, res, next) => {
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
});

/**
 * GET /api/v1/topics/:id/questions
 */
export const getTopicQuestions = catchAsync(async (req, res, next) => {
  const { items, total, page, limit } = await syllabusService.getTopicQuestions(
    req.params.id,
    req.pagination
  );
  res.json(
    successFormatter.formatList(
      items,
      total,
      page,
      limit,
      'Topic questions fetched'
    )
  );
});
