import { PopularityChartView } from './popularity-chart-view';

/**
 * A pie chart that displays the distribution of uploaded papers across different subjects.
 * Used in the Studio Analytics dashboard to visualize subject popularity.
 */
const meta = {
  title: 'Studio/Analytics/PopularityChart',
  component: PopularityChartView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    data: {
      control: 'object',
      description: 'The dataset representing subject popularity.',
      table: {
        type: {
          summary: 'Array<{ subject: string, count: number }>',
        },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the chart is in a loading state.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;

const mockData = [
  { subject: 'Data Structures', count: 125 },
  { subject: 'Algorithms', count: 98 },
  { subject: 'Operating Systems', count: 76 },
  { subject: 'Database Systems', count: 110 },
  { subject: 'Computer Networks', count: 85 },
];

export const Default = {
  args: {
    data: mockData,
    loading: false,
  },
};

/**
 * Loading state with a pulse animation placeholder.
 */
export const Loading = {
  args: {
    data: [],
    loading: true,
  },
};

/**
 * Empty state displayed when no paper data is available.
 */
export const Empty = {
  args: {
    data: [],
    loading: false,
  },
};
