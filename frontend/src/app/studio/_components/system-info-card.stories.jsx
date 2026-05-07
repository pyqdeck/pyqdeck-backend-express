import { fn } from '@storybook/test';
import { SystemInfoCardView } from './system-info-card.view';

const meta = {
  title: 'Studio/Settings/SystemInfoCard',
  component: SystemInfoCardView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    health: {
      control: 'object',
      description: 'System health information',
      table: {
        type: {
          summary: 'object',
          detail:
            '{ status: string, environment: string, uptime: number, database: { isConnected: boolean }, memory: { rss: number }, timestamp: string }',
        },
      },
    },
    isRefreshing: {
      control: 'boolean',
      description:
        'Whether the system information is currently being refreshed',
      table: { defaultValue: { summary: 'false' } },
    },
    onRefresh: {
      description:
        'Callback function called when the refresh button is clicked',
    },
  },
  args: {
    onRefresh: fn(),
  },
};

export default meta;

const mockHealth = {
  status: 'healthy',
  environment: 'production',
  uptime: 1209600, // 14 days
  timestamp: new Date().toISOString(),
  database: {
    isConnected: true,
  },
  memory: {
    rss: 256 * 1024 * 1024, // 256 MB
  },
};

export const Healthy = {
  args: {
    health: mockHealth,
    isRefreshing: false,
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
    isRefreshing: false,
  },
};

export const Refreshing = {
  args: {
    health: mockHealth,
    isRefreshing: true,
  },
};

export const Loading = {
  args: {
    health: null,
    isRefreshing: false,
  },
};
