import { TrafficChartView } from './traffic-chart-view';

const meta = {
  title: 'Studio/Analytics/TrafficChart',
  component: TrafficChartView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    data: {
      control: 'object',
      description: 'The traffic data to display in the chart',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the component is in a loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;

const mockData = [
  { name: 'Mon', views: 2400, users: 400 },
  { name: 'Tue', views: 1398, users: 300 },
  { name: 'Wed', views: 9800, users: 2000 },
  { name: 'Thu', views: 3908, users: 1200 },
  { name: 'Fri', views: 4800, users: 1100 },
  { name: 'Sat', views: 3800, users: 800 },
  { name: 'Sun', views: 4300, users: 900 },
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
