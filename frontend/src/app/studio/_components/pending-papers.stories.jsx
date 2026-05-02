import { PendingPapers } from './pending-papers';

export default {
  title: 'Studio/PendingPapers',
  component: PendingPapers,
  tags: ['autodocs'],
};

const mockPapers = [
  {
    _id: 'p1',
    title: 'Mathematics Final Exam 2023',
    subjectOfferingId: { slug: 'math-101' },
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'p2',
    title: 'Physics Midterm 2024',
    subjectOfferingId: { slug: 'phy-202' },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: 'p3',
    title: 'Computer Science Quiz 1',
    subjectOfferingId: { slug: 'cs-303' },
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const Default = {
  args: {
    papers: mockPapers,
  },
};

export const Empty = {
  args: {
    papers: [],
  },
};

export const Loading = {
  args: {
    papers: null,
  },
};
