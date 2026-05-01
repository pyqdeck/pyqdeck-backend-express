export const RATE_LIMITS = {
  API: { windowMs: 15 * 60 * 1000, max: 100 },
  WEBHOOK: { windowMs: 15 * 60 * 1000, max: 50 },
};

export const UserRole = {
  NORMAL: 'normal',
  ADMIN: 'admin',
};
