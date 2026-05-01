import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     SubjectOffering:
 *       type: object
 *       required:
 *         - universityId
 *         - branchId
 *         - semesterId
 *         - subjectId
 *         - slug
 *       properties:
 *         id:
 *           type: string
 *         universityId:
 *           type: string
 *           description: Reference to University
 *         branchId:
 *           type: string
 *           description: Reference to Branch
 *         semesterId:
 *           type: string
 *           description: Reference to Semester
 *         subjectId:
 *           type: string
 *           description: Reference to Subject
 *         regulation:
 *           type: string
 *           example: '2022'
 *         academicYear:
 *           type: string
 *           example: '2023-24'
 *         slug:
 *           type: string
 *           example: beu-it-sem5-compiler-design-2022
 *         isActive:
 *           type: boolean
 *           default: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const subjectOfferingSchema = new mongoose.Schema(
  {
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Semester',
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    regulation: {
      type: String,
      trim: true,
    },
    academicYear: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      lowercase: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
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

subjectOfferingSchema.index({ universityId: 1, branchId: 1, semesterId: 1 });
subjectOfferingSchema.index({ subjectId: 1, regulation: 1 });
subjectOfferingSchema.index(
  { universityId: 1, branchId: 1, semesterId: 1, subjectId: 1, regulation: 1 },
  { unique: true, sparse: true }
);

export const SubjectOffering = mongoose.model(
  'SubjectOffering',
  subjectOfferingSchema
);
export default SubjectOffering;

export const subjectOfferingZodSchema = z.object({
  universityId: z.string().min(1, 'University ID is required'),
  branchId: z.string().min(1, 'Branch ID is required'),
  semesterId: z.string().min(1, 'Semester ID is required'),
  subjectId: z.string().min(1, 'Subject ID is required'),
  regulation: z.string().max(20).optional(),
  academicYear: z.string().max(20).optional(),
  slug: z.string().min(1, 'Slug is required').max(150),
  isActive: z.boolean().default(true),
});
