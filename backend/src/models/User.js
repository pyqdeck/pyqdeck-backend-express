import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - clerkId
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         clerkId:
 *           type: string
 *           description: The unique ID from Clerk authentication
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         universityId:
 *           type: string
 *           nullable: true
 *           description: Reference to University
 *         branchId:
 *           type: string
 *           nullable: true
 *           description: Reference to Branch
 *         semesterId:
 *           type: string
 *           nullable: true
 *           description: Reference to Semester
 *         role:
 *           type: string
 *           enum: [normal, admin]
 *           default: normal
 *           description: The role of the user
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
export const UserRole = z.enum(['normal', 'admin']);

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
      default: null,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      default: null,
    },
    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Semester',
      default: null,
    },
    role: {
      type: String,
      enum: ['normal', 'admin'],
      default: 'normal',
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

userSchema.index({ isActive: 1 });
userSchema.index({ universityId: 1, branchId: 1, semesterId: 1 });

export const User = mongoose.model('User', userSchema);
export default User;

export const userZodSchema = z.object({
  clerkId: z.string().min(1, 'Clerk ID is required'),
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  role: UserRole.optional(),
  universityId: z.string().nullable().optional(),
  branchId: z.string().nullable().optional(),
  semesterId: z.string().nullable().optional(),
});
