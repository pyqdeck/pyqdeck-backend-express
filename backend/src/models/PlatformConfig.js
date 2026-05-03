import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     PlatformConfig:
 *       type: object
 *       properties:
 *         devMode:
 *           type: boolean
 *           default: false
 *         contentFreeze:
 *           type: boolean
 *           default: false
 *         maintenanceMode:
 *           type: boolean
 *           default: false
 *         ai:
 *           type: object
 *           properties:
 *             enabled:
 *               type: boolean
 *             provider:
 *               type: string
 *               enum: [openai, openai-compatible, anthropic]
 *             hasApiKey:
 *               type: boolean
 *             baseUrl:
 *               type: string
 *               nullable: true
 *             model:
 *               type: string
 *               nullable: true
 */

export const AiProvider = z.enum(['openai', 'openai-compatible', 'anthropic']);

const platformConfigSchema = new mongoose.Schema(
  {
    instanceId: {
      type: String,
      default: 'main',
      unique: true,
    },
    devMode: {
      type: Boolean,
      default: false,
    },
    contentFreeze: {
      type: Boolean,
      default: false,
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    ai: {
      enabled: { type: Boolean, default: false },
      provider: {
        type: String,
        enum: ['openai', 'openai-compatible', 'anthropic'],
        default: 'openai',
      },
      apiKey: { type: String, default: null },
      baseUrl: { type: String, default: null },
      model: { type: String, default: null },
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

export const PlatformConfig = mongoose.model(
  'PlatformConfig',
  platformConfigSchema
);

export const platformConfigZodSchema = z.object({
  devMode: z.boolean().optional(),
  contentFreeze: z.boolean().optional(),
  maintenanceMode: z.boolean().optional(),
  ai: z
    .object({
      enabled: z.boolean().optional(),
      provider: AiProvider.optional(),
      apiKey: z.string().nullable().optional(),
      baseUrl: z.string().nullable().optional(),
      model: z.string().nullable().optional(),
    })
    .optional(),
});
