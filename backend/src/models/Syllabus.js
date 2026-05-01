import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Syllabus:
 *       type: object
 *       required:
 *         - subjectOfferingId
 *       properties:
 *         id:
 *           type: string
 *         subjectOfferingId:
 *           type: string
 *           description: Reference to SubjectOffering (one-to-one)
 *         description:
 *           type: string
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

const syllabusSchema = new mongoose.Schema(
  {
    subjectOfferingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubjectOffering',
      required: true,
      unique: true,
    },
    description: {
      type: String,
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

// syllabusSchema.index({ subjectOfferingId: 1 }); // Removed redundant index

export const Syllabus = mongoose.model('Syllabus', syllabusSchema);
export default Syllabus;

export const syllabusZodSchema = z.object({
  subjectOfferingId: z.string().min(1, 'Subject offering ID is required'),
  description: z.string().max(2000).optional(),
  isActive: z.boolean().default(true),
});
