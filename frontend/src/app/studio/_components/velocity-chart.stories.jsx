import { VelocityChart } from './velocity-chart';

export default {
  title: 'Studio/VelocityChart',
  component: VelocityChart,
  tags: ['autodocs'],
};

const mockData = [
  { date: '2024-05-01', papers: 5 },
  { date: '2024-05-02', papers: 12 },
  { date: '2024-05-03', papers: 8 },
  { date: '2024-05-04', papers: 15 },
  { date: '2024-05-05', papers: 20 },
  { date: '2024-05-06', papers: 18 },
  { date: '2024-05-07', papers: 25 },
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
