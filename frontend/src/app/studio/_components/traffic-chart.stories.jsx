import { TrafficChart } from './traffic-chart';

export default {
  title: 'Studio/Analytics/TrafficChart',
  component: TrafficChart,
  tags: ['autodocs'],
};

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
  },
};

export const Empty = {
  args: {
    data: [],
  },
};
