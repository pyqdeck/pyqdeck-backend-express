import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Upload:
 *       type: object
 *       required:
 *         - url
 *         - uploadedBy
 *       properties:
 *         id:
 *           type: string
 *         url:
 *           type: string
 *           format: uri
 *         publicId:
 *           type: string
 *           description: Provider-specific identifier (Cloudinary/S3 key)
 *         mimeType:
 *           type: string
 *           example: application/pdf
 *         size:
 *           type: integer
 *           description: File size in bytes
 *         uploadedBy:
 *           type: string
 *           description: Reference to User
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const uploadSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
    },
    mimeType: {
      type: String,
      trim: true,
    },
    size: {
      type: Number,
      min: 0,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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

uploadSchema.index({ uploadedBy: 1 });
uploadSchema.index({ publicId: 1 });

export const Upload = mongoose.model('Upload', uploadSchema);
export default Upload;

export const uploadZodSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  publicId: z.string().optional(),
  mimeType: z.string().optional(),
  size: z.number().int().min(0).optional(),
  uploadedBy: z.string().min(1, 'Uploader ID is required'),
});
