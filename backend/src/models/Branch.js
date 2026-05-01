import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - universityId
 *         - name
 *         - shortName
 *         - slug
 *       properties:
 *         id:
 *           type: string
 *         universityId:
 *           type: string
 *           description: Reference to University
 *         name:
 *           type: string
 *         shortName:
 *           type: string
 *         branchCode:
 *           type: string
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

const branchSchema = new mongoose.Schema(
  {
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
      required: true,
    },
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
    branchCode: {
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

branchSchema.index({ universityId: 1, isActive: 1 });
branchSchema.index({ universityId: 1, slug: 1 }, { unique: true });
branchSchema.index({ redirectSlugs: 1 });

export const Branch = mongoose.model('Branch', branchSchema);
export default Branch;

export const branchZodSchema = z.object({
  universityId: z.string().min(1, 'University ID is required'),
  name: z.string().min(1, 'Name is required').max(200),
  shortName: z.string().min(1, 'Short name is required').max(20),
  branchCode: z.string().max(20).optional(),
  slug: z.string().min(1, 'Slug is required').max(100),
  redirectSlugs: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
});
