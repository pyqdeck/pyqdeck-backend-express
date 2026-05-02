import { SubjectTrends } from './subject-trends';

export default {
  title: 'Studio/Analytics/SubjectTrends',
  component: SubjectTrends,
  tags: ['autodocs'],
};

const mockSubjects = [
  {
    id: 1,
    name: 'Data Structures',
    views: '12.4k',
    trend: '+14%',
    status: 'up',
  },
  {
    id: 2,
    name: 'Operating Systems',
    views: '8.2k',
    trend: '+8%',
    status: 'up',
  },
  {
    id: 3,
    name: 'Database Systems',
    views: '7.1k',
    trend: '-2%',
    status: 'down',
  },
  {
    id: 4,
    name: 'Computer Networks',
    views: '6.5k',
    trend: '+12%',
    status: 'up',
  },
  {
    id: 5,
    name: 'Theory of Computation',
    views: '5.2k',
    trend: '+5%',
    status: 'up',
  },
];

export const Default = {
  args: {
    subjects: mockSubjects,
  },
};
