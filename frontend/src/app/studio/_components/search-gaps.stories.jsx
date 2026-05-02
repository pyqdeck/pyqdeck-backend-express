import { SearchGaps } from './search-gaps';

export default {
  title: 'Studio/Analytics/SearchGaps',
  component: SearchGaps,
  tags: ['autodocs'],
};

const mockGaps = [
  { query: 'Advanced Quantum Computing', count: 142 },
  { query: 'Bioinformatics 2025 Paper', count: 86 },
  { query: 'Ethical Hacking Mumbai University', count: 64 },
  { query: 'Machine Learning Semester 8', count: 42 },
];

export const Default = {
  args: {
    gaps: mockGaps,
  },
};
