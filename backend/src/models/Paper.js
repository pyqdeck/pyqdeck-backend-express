import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Paper:
 *       type: object
 *       required:
 *         - subjectOfferingId
 *         - title
 *         - examYear
 *         - examType
 *         - slug
 *       properties:
 *         id:
 *           type: string
 *           example: 65a12345b67890cdef333333
 *         subjectOfferingId:
 *           type: string
 *           description: Reference to SubjectOffering
 *           example: 60d0fe4f5311236168a109cb
 *         title:
 *           type: string
 *           example: "Data Structures End Semester Exam Nov 2023"
 *         examYear:
 *           type: integer
 *           example: 2023
 *         examType:
 *           type: string
 *           enum: [regular, re-exam, supplementary, end-sem, internal]
 *           example: end-sem
 *         session:
 *           type: string
 *           example: Nov-Dec
 *         regulation:
 *           type: string
 *           example: "R2019"
 *         duration:
 *           type: integer
 *           description: Duration in minutes
 *           example: 180
 *         maxMarks:
 *           type: number
 *           example: 80
 *         slug:
 *           type: string
 *           example: dsa-end-sem-nov-2023
 *         uploadedBy:
 *           type: string
 *           description: Reference to User
 *           example: 65b98765a43210fedcba9876
 *         status:
 *           type: string
 *           enum: [draft, pending, approved, rejected]
 *           default: pending
 *           example: approved
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export const ExamType = z.enum([
  'regular',
  're-exam',
  'supplementary',
  'end-sem',
  'internal',
]);

export const PaperStatus = z.enum(['draft', 'pending', 'approved', 'rejected']);

const paperSchema = new mongoose.Schema(
  {
    subjectOfferingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubjectOffering',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    examYear: {
      type: Number,
      required: true,
    },
    examType: {
      type: String,
      enum: ['regular', 're-exam', 'supplementary', 'end-sem', 'internal'],
      required: true,
    },
    session: {
      type: String,
      trim: true,
    },
    regulation: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      min: 0,
    },
    maxMarks: {
      type: Number,
      min: 0,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      lowercase: true,
      trim: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

paperSchema.index({ subjectOfferingId: 1, examYear: -1 });
paperSchema.index({ examYear: -1 });
paperSchema.index({ status: 1 });

export const Paper = mongoose.model('Paper', paperSchema);
export default Paper;

export const paperZodSchema = z.object({
  subjectOfferingId: z.string().min(1, 'Subject offering ID is required'),
  title: z.string().min(1, 'Title is required').max(300),
  examYear: z.number().int().min(2000).max(2100),
  examType: ExamType,
  slug: z.string().min(1, 'Slug is required').max(200),
  session: z.string().max(50).optional(),
  regulation: z.string().max(20).optional(),
  duration: z.number().int().min(0).optional(),
  maxMarks: z.number().min(0).optional(),
  uploadedBy: z.string().optional(),
  status: PaperStatus.default('pending'),
});
