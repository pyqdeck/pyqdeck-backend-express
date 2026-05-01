import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as healthService from '../../src/services/healthService.js';
import { healthRepository } from '../../src/repositories/healthRepository.js';

vi.mock('../../src/repositories/healthRepository.js', () => ({
  healthRepository: {
    checkDatabase: vi.fn(),
    getDatabaseStats: vi.fn(),
  },
}));

describe('HealthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getHealth', () => {
    it('should return healthy status when DB is connected', async () => {
      healthRepository.checkDatabase.mockResolvedValue({
        status: 'connected',
        isConnected: true,
      });

      const health = await healthService.getHealth();

      expect(health.status).toBe('healthy');
      expect(health.database.status).toBe('connected');
    });

    it('should return unhealthy status when DB is disconnected', async () => {
      healthRepository.checkDatabase.mockResolvedValue({
        status: 'disconnected',
        isConnected: false,
      });

      const health = await healthService.getHealth();

      expect(health.status).toBe('unhealthy');
    });
  });

  describe('getDetailedHealth', () => {
    it('should return detailed health with stats and memory', async () => {
      healthRepository.checkDatabase.mockResolvedValue({
        status: 'connected',
        isConnected: true,
      });
      healthRepository.getDatabaseStats.mockResolvedValue({ users: 10 });

      const health = await healthService.getDetailedHealth();

      expect(health.status).toBe('healthy');
      expect(health.database.collections).toEqual({ users: 10 });
      expect(health.memory).toBeDefined();
    });
  });
});
