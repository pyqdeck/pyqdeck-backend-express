import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Semester:
 *       type: object
 *       required:
 *         - branchId
 *         - number
 *         - slug
 *       properties:
 *         id:
 *           type: string
 *           example: 65a12345b67890cdef112233
 *         branchId:
 *           type: string
 *           description: Reference to Branch
 *           example: 65a12345b67890cdef111111
 *         number:
 *           type: integer
 *           minimum: 1
 *           maximum: 8
 *           example: 5
 *         slug:
 *           type: string
 *           example: semester-5
 *         title:
 *           type: string
 *           example: Semester 5
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const semesterSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    number: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
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

semesterSchema.index({ branchId: 1, number: 1 }, { unique: true });
semesterSchema.index({ branchId: 1, slug: 1 }, { unique: true });

export const Semester = mongoose.model('Semester', semesterSchema);
export default Semester;

export const semesterZodSchema = z.object({
  branchId: z.string().min(1, 'Branch ID is required'),
  number: z.number().int().min(1).max(8),
  slug: z.string().min(1, 'Slug is required').max(50),
  title: z.string().max(100).optional(),
});
