import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       required:
 *         - name
 *         - slug
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         shortName:
 *           type: string
 *         subjectCode:
 *           type: string
 *         description:
 *           type: string
 *         credits:
 *           type: number
 *         slug:
 *           type: string
 *         redirectSlugs:
 *           type: array
 *           items:
 *             type: string
 *           description: Old slugs that 301-redirect to the current slug
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

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shortName: {
      type: String,
      trim: true,
    },
    subjectCode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    credits: {
      type: Number,
      min: 0,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    redirectSlugs: {
      type: [String],
      default: [],
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

subjectSchema.index({ isActive: 1 });
subjectSchema.index({ redirectSlugs: 1 });

export const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;

export const subjectZodSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  shortName: z.string().max(50).optional(),
  subjectCode: z.string().max(20).optional(),
  description: z.string().max(1000).optional(),
  credits: z.number().min(0).optional(),
  slug: z.string().min(1, 'Slug is required').max(100),
  redirectSlugs: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
});
