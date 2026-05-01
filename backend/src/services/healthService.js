import { healthRepository } from '../repositories/healthRepository.js';
import config from '../config/index.js';

export async function getHealth() {
  const dbStatus = await healthRepository.checkDatabase();
  const uptime = process.uptime();

  return {
    status: dbStatus.isConnected ? 'healthy' : 'unhealthy',
    uptime: Math.floor(uptime),
    timestamp: new Date().toISOString(),
    database: dbStatus,
    environment: config.nodeEnv,
  };
}

export async function getDetailedHealth() {
  const health = await getHealth();
  const stats = await healthRepository.getDatabaseStats();

  return {
    ...health,
    memory: process.memoryUsage(),
    database: {
      ...health.database,
      collections: stats,
    },
  };
}
