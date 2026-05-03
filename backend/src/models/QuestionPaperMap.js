import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     QuestionPaperMap:
 *       type: object
 *       required:
 *         - paperId
 *         - questionId
 *       properties:
 *         id:
 *           type: string
 *         paperId:
 *           type: string
 *           description: Reference to Paper
 *         questionId:
 *           type: string
 *           description: Reference to Question
 *         section:
 *           type: string
 *           example: A
 *         questionNumber:
 *           type: integer
 *         marks:
 *           type: number
 *           description: Marks as it appears in this specific paper (may differ from question default)
 *         order:
 *           type: integer
 *           default: 0
 *         compulsory:
 *           type: boolean
 *           default: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const questionPaperMapSchema = new mongoose.Schema(
  {
    paperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paper',
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    section: {
      type: String,
      trim: true,
      uppercase: true,
    },
    questionNumber: {
      type: Number,
      min: 1,
    },
    marks: {
      type: Number,
      min: 0,
    },
    order: {
      type: Number,
      default: 0,
    },
    compulsory: {
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

questionPaperMapSchema.index({ paperId: 1, order: 1 });
questionPaperMapSchema.index({ paperId: 1, questionNumber: 1 });
questionPaperMapSchema.index({ questionId: 1 });
questionPaperMapSchema.index({ paperId: 1, questionId: 1 }, { unique: true });

export const QuestionPaperMap = mongoose.model(
  'QuestionPaperMap',
  questionPaperMapSchema
);
export default QuestionPaperMap;

export const questionPaperMapZodSchema = z.object({
  paperId: z.string().min(1, 'Paper ID is required'),
  questionId: z.string().min(1, 'Question ID is required'),
  section: z.string().max(10).optional(),
  questionNumber: z.number().int().min(1).optional(),
  marks: z.number().min(0).optional(),
  order: z.number().int().default(0),
  compulsory: z.boolean().default(false),
});
