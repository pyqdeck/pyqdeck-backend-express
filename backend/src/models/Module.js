import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Module:
 *       type: object
 *       required:
 *         - syllabusId
 *         - moduleNumber
 *         - title
 *         - slug
 *       properties:
 *         id:
 *           type: string
 *         syllabusId:
 *           type: string
 *           description: Reference to Syllabus
 *         moduleNumber:
 *           type: integer
 *           minimum: 1
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         weightage:
 *           type: number
 *           description: Percentage weightage in the exam
 *         coMapping:
 *           type: string
 *           description: Course outcome mapping (e.g. CO1, CO2)
 *         slug:
 *           type: string
 *           example: lexical-analysis
 *         redirectSlugs:
 *           type: array
 *           items:
 *             type: string
 *           description: Old slugs that 301-redirect to the current slug
 *         order:
 *           type: integer
 *           default: 0
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const moduleSchema = new mongoose.Schema(
  {
    syllabusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Syllabus',
      required: true,
    },
    moduleNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    weightage: {
      type: Number,
      min: 0,
      max: 100,
    },
    coMapping: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    redirectSlugs: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
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

moduleSchema.index({ syllabusId: 1, moduleNumber: 1 }, { unique: true });
moduleSchema.index({ syllabusId: 1, slug: 1 }, { unique: true });
moduleSchema.index({ syllabusId: 1, order: 1 });
moduleSchema.index({ redirectSlugs: 1 });

export const Module = mongoose.model('Module', moduleSchema);
export default Module;

export const moduleZodSchema = z.object({
  syllabusId: z.string().min(1, 'Syllabus ID is required'),
  moduleNumber: z.number().int().min(1),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional(),
  weightage: z.number().min(0).max(100).optional(),
  coMapping: z.string().max(50).optional(),
  slug: z.string().min(1, 'Slug is required').max(150),
  redirectSlugs: z.array(z.string()).default([]),
  order: z.number().int().default(0),
});
