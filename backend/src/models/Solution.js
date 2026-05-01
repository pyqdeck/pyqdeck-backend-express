import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Solution:
 *       type: object
 *       required:
 *         - questionId
 *         - authorId
 *         - type
 *       properties:
 *         id:
 *           type: string
 *         questionId:
 *           type: string
 *           description: Reference to Question
 *         authorId:
 *           type: string
 *           description: Reference to User
 *         type:
 *           type: string
 *           enum: [teacher, student, ai]
 *         content:
 *           type: string
 *           description: Plain text solution
 *         latexContent:
 *           type: string
 *           description: LaTeX-formatted solution
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         videoLinks:
 *           type: array
 *           items:
 *             type: string
 *         upvotes:
 *           type: integer
 *           default: 0
 *         downvotes:
 *           type: integer
 *           default: 0
 *         isVerified:
 *           type: boolean
 *           default: false
 *         status:
 *           type: string
 *           enum: [draft, pending, approved, rejected]
 *           default: pending
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export const SolutionType = z.enum(['teacher', 'student', 'ai']);

export const SolutionStatus = z.enum([
  'draft',
  'pending',
  'approved',
  'rejected',
]);

const solutionSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['teacher', 'student', 'ai'],
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    latexContent: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    videoLinks: {
      type: [String],
      default: [],
    },
    upvotes: {
      type: Number,
      default: 0,
      min: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
      min: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'pending', 'approved', 'rejected'],
      default: 'pending',
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

solutionSchema.index({ questionId: 1, status: 1 });
solutionSchema.index({ authorId: 1 });
solutionSchema.index({ upvotes: -1 });

export const Solution = mongoose.model('Solution', solutionSchema);
export default Solution;

export const solutionZodSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
  authorId: z.string().min(1, 'Author ID is required'),
  type: SolutionType,
  content: z.string().optional(),
  latexContent: z.string().optional(),
  images: z.array(z.string().url()).default([]),
  videoLinks: z.array(z.string().url()).default([]),
  isVerified: z.boolean().default(false),
  status: SolutionStatus.default('pending'),
});
