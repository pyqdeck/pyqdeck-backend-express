import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     QuestionSyllabusMap:
 *       type: object
 *       required:
 *         - questionId
 *       properties:
 *         id:
 *           type: string
 *         questionId:
 *           type: string
 *           description: Reference to Question
 *         moduleId:
 *           type: string
 *           description: Reference to Module
 *         topicId:
 *           type: string
 *           description: Reference to Topic
 *         confidenceScore:
 *           type: number
 *           minimum: 0
 *           maximum: 1
 *           description: AI or manual confidence score for this mapping
 *         mappedBy:
 *           type: string
 *           enum: [manual, ai]
 *           default: manual
 *         verified:
 *           type: boolean
 *           default: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export const MappedBy = z.enum(['manual', 'ai']);

const questionSyllabusMapSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
    },
    confidenceScore: {
      type: Number,
      min: 0,
      max: 1,
    },
    mappedBy: {
      type: String,
      enum: ['manual', 'ai'],
      default: 'manual',
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  }
);

questionSyllabusMapSchema.index({ questionId: 1 });
questionSyllabusMapSchema.index({ topicId: 1 });
questionSyllabusMapSchema.index({ moduleId: 1 });
questionSyllabusMapSchema.index(
  { questionId: 1, topicId: 1 },
  { unique: true, sparse: true }
);

export const QuestionSyllabusMap = mongoose.model(
  'QuestionSyllabusMap',
  questionSyllabusMapSchema
);
export default QuestionSyllabusMap;

export const questionSyllabusMapZodSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
  moduleId: z.string().optional(),
  topicId: z.string().optional(),
  confidenceScore: z.number().min(0).max(1).optional(),
  mappedBy: MappedBy.default('manual'),
  verified: z.boolean().default(false),
});
