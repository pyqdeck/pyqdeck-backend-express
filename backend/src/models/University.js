import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     University:
 *       type: object
 *       required:
 *         - name
 *         - shortName
 *         - slug
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         shortName:
 *           type: string
 *         slug:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *           default: India
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

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shortName: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      default: 'India',
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

universitySchema.index({ isActive: 1 });
universitySchema.index({ redirectSlugs: 1 });

export const University = mongoose.model('University', universitySchema);
export default University;

export const universityZodSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  shortName: z.string().min(1, 'Short name is required').max(20),
  slug: z.string().min(1, 'Slug is required').max(100),
  state: z.string().max(100).optional(),
  country: z.string().max(100).default('India'),
  redirectSlugs: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
});
