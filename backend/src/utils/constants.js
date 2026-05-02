import config from '../config/index.js';

export const RATE_LIMITS = {
  API: {
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
  },
  WEBHOOK: { windowMs: 15 * 60 * 1000, max: 50 },
};

export const UserRole = {
  NORMAL: 'normal',
  ADMIN: 'admin',
  EDITOR: 'editor',
};
