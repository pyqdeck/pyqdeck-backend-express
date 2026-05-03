import { describe, it, expect } from 'vitest';
import { healthRepository } from '../../src/repositories/healthRepository.js';

describe('HealthRepository', () => {
  describe('checkDatabase', () => {
    it('should return connected status when database is connected', async () => {
      const health = await healthRepository.checkDatabase();
      expect(health.status).toBe('connected');
      expect(health.isConnected).toBe(true);
    });
  });

  describe('getDatabaseStats', () => {
    it('should return collection counts', async () => {
      const stats = await healthRepository.getDatabaseStats();
      expect(typeof stats).toBe('object');
      // Should at least have keys for collections we've used in tests if they were created
      // or be an empty object if no collections exist yet.
    });
  });
});
