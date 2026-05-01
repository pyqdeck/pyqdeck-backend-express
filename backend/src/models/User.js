import mongoose from 'mongoose';
import { z } from 'zod';

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

export const User = mongoose.model('User', userSchema);
export default User;

export const userZodSchema = z.object({
  clerkId: z.string().min(1, 'Clerk ID is required'),
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  role: UserRole.optional(),
});
