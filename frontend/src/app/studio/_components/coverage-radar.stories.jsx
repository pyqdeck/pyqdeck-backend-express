import { CoverageRadar } from './coverage-radar';

export default {
  title: 'Studio/Analytics/CoverageRadar',
  component: CoverageRadar,
  tags: ['autodocs'],
};

const mockData = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'Physics', A: 98, B: 130, fullMark: 150 },
  { subject: 'Coding', A: 86, B: 130, fullMark: 150 },
  { subject: 'AI', A: 99, B: 100, fullMark: 150 },
  { subject: 'Data', A: 85, B: 90, fullMark: 150 },
  { subject: 'Cloud', A: 65, B: 85, fullMark: 150 },
];

export const Default = {
  args: {
    data: mockData,
  },
};
