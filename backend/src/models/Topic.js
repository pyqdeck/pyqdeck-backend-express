import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Topic:
 *       type: object
 *       required:
 *         - moduleId
 *         - title
 *         - slug
 *       properties:
 *         id:
 *           type: string
 *         moduleId:
 *           type: string
 *           description: Reference to Module
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         slug:
 *           type: string
 *           example: lexical-analyzer
 *         redirectSlugs:
 *           type: array
 *           items:
 *             type: string
 *           description: Old slugs that 301-redirect to the current slug
 *         keywords:
 *           type: array
 *           items:
 *             type: string
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

const topicSchema = new mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: true,
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
    keywords: {
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

topicSchema.index({ moduleId: 1, slug: 1 }, { unique: true });
topicSchema.index({ moduleId: 1, order: 1 });
topicSchema.index({ redirectSlugs: 1 });

export const Topic = mongoose.model('Topic', topicSchema);
export default Topic;

export const topicZodSchema = z.object({
  moduleId: z.string().min(1, 'Module ID is required'),
  title: z.string().min(1, 'Title is required').max(300),
  slug: z.string().min(1, 'Slug is required').max(150),
  redirectSlugs: z.array(z.string()).default([]),
  description: z.string().max(1000).optional(),
  keywords: z.array(z.string()).default([]),
  order: z.number().int().default(0),
});
