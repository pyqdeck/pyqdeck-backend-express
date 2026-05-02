import { AiGenerationQueueView } from './ai-generation-queue-view';

export default {
  title: 'Studio/Queues/AiGenerationQueue',
  component: AiGenerationQueueView,
  tags: ['autodocs'],
};

const mockQuestions = [
  {
    _id: 'q1234567890',
    tags: ['Mathematics', 'Calculus', 'Integration'],
    marks: 10,
  },
  {
    _id: 'q0987654321',
    tags: ['Physics', 'Mechanics'],
    marks: 5,
  },
  {
    _id: 'q1122334455',
    tags: ['Chemistry', 'Organic'],
    marks: 8,
  },
];

export const Default = {
  args: {
    questions: mockQuestions,
  },
};

export const Empty = {
  args: {
    questions: [],
  },
};

export const Loading = {
  args: {
    questions: null,
  },
};
