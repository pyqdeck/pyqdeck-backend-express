import { SystemInfoCardView } from './system-info-card.view';

export default {
  title: 'Studio/System/SystemInfoCard',
  component: SystemInfoCardView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const mockHealth = {
  status: 'healthy',
  environment: 'development',
  uptime: 123456,
  timestamp: new Date().toISOString(),
  database: {
    isConnected: true,
  },
  memory: {
    rss: 125829120, // 120 MB
  },
};

export const Healthy = {
  args: {
    health: mockHealth,
  },
};

export const Unhealthy = {
  args: {
    health: {
      ...mockHealth,
      status: 'unhealthy',
      database: {
        isConnected: false,
      },
    },
  },
};

export const Loading = {
  args: {
    health: null,
  },
};
