import { fn } from '@storybook/test';
import { VelocityChartView } from './velocity-chart-view';

const meta = {
  title: 'Studio/Analytics/VelocityChart',
  component: VelocityChartView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'The data to display in the area chart',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the component is in a loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

const mockData = [
  { date: '2024-05-01T00:00:00.000Z', papers: 5 },
  { date: '2024-05-02T00:00:00.000Z', papers: 12 },
  { date: '2024-05-03T00:00:00.000Z', papers: 8 },
  { date: '2024-05-04T00:00:00.000Z', papers: 15 },
  { date: '2024-05-05T00:00:00.000Z', papers: 20 },
  { date: '2024-05-06T00:00:00.000Z', papers: 18 },
  { date: '2024-05-07T00:00:00.000Z', papers: 25 },
];

export const Default = {
  args: {
    data: mockData,
    loading: false,
  },
};

export const Loading = {
  args: {
    data: [],
    loading: true,
  },
};

export const Empty = {
  args: {
    data: [],
    loading: false,
  },
};
