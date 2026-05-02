import { PopularityChartView } from './popularity-chart-view';

export default {
  title: 'Studio/Analytics/PopularityChart',
  component: PopularityChartView,
  tags: ['autodocs'],
};

const mockData = [
  { subject: 'Mathematics', count: 120 },
  { subject: 'Physics', count: 80 },
  { subject: 'Chemistry', count: 60 },
  { subject: 'Computer Science', count: 150 },
  { subject: 'Biology', count: 40 },
];

export const Default = {
  args: {
    data: mockData,
  },
};

export const Empty = {
  args: {
    data: [],
  },
};

export const Loading = {
  args: {
    data: null,
  },
};
