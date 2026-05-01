import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - text
 *         - type
 *       properties:
 *         id:
 *           type: string
 *         text:
 *           type: string
 *         normalizedText:
 *           type: string
 *           description: Cleaned text used for deduplication and search
 *         type:
 *           type: string
 *           enum: [mcq, short, long, numerical, coding]
 *         difficulty:
 *           type: string
 *           enum: [easy, medium, hard]
 *         bloomLevel:
 *           type: string
 *           enum: [remember, understand, apply, analyze, evaluate, create]
 *         marks:
 *           type: number
 *         estimatedTime:
 *           type: integer
 *           description: Estimated solving time in minutes
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: References to Tag documents
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         equations:
 *           type: array
 *           items:
 *             type: string
 *           description: LaTeX equation strings
 *         codeSnippets:
 *           type: array
 *           items:
 *             type: string
 *         slug:
 *           type: string
 *           example: explain-lexical-analyzer-compiler-design
 *         language:
 *           type: string
 *           default: en
 *         createdBy:
 *           type: string
 *           description: Reference to User
 *         isVerified:
 *           type: boolean
 *           default: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export const QuestionType = z.enum([
  'mcq',
  'short',
  'long',
  'numerical',
  'coding',
]);

export const DifficultyLevel = z.enum(['easy', 'medium', 'hard']);

export const BloomLevel = z.enum([
  'remember',
  'understand',
  'apply',
  'analyze',
  'evaluate',
  'create',
]);

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    normalizedText: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['mcq', 'short', 'long', 'numerical', 'coding'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
    },
    bloomLevel: {
      type: String,
      enum: [
        'remember',
        'understand',
        'apply',
        'analyze',
        'evaluate',
        'create',
      ],
    },
    marks: {
      type: Number,
      min: 0,
    },
    estimatedTime: {
      type: Number,
      min: 0,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    images: {
      type: [String],
      default: [],
    },
    equations: {
      type: [String],
      default: [],
    },
    codeSnippets: {
      type: [String],
      default: [],
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    language: {
      type: String,
      default: 'en',
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isVerified: {
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

questionSchema.index({ text: 'text', normalizedText: 'text' });
questionSchema.index({ tags: 1 });
questionSchema.index({ type: 1, difficulty: 1 });
questionSchema.index({ isVerified: 1 });

export const Question = mongoose.model('Question', questionSchema);
export default Question;

export const questionZodSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  normalizedText: z.string().optional(),
  slug: z.string().max(300).optional(),
  type: QuestionType,
  difficulty: DifficultyLevel.optional(),
  bloomLevel: BloomLevel.optional(),
  marks: z.number().min(0).optional(),
  estimatedTime: z.number().int().min(0).optional(),
  tags: z.array(z.string()).default([]),
  images: z.array(z.string().url()).default([]),
  equations: z.array(z.string()).default([]),
  codeSnippets: z.array(z.string()).default([]),
  language: z.string().default('en'),
  createdBy: z.string().optional(),
  isVerified: z.boolean().default(false),
});
