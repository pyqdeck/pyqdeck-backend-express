import { fn } from '@storybook/test';
import { AiGenerationQueueView } from './ai-generation-queue-view';

const meta = {
  title: 'Studio/Analytics/AiGenerationQueue',
  component: AiGenerationQueueView,
  tags: ['autodocs'],
  argTypes: {
    questions: {
      control: 'object',
      description: 'List of questions awaiting AI solution generation',
      table: {
        type: { summary: 'Array<Question>' },
        defaultValue: { summary: '[]' },
      },
    },
    onGenerate: {
      description:
        'Callback when the generate button for a specific question is clicked',
      action: 'generate',
    },
    onGenerateAll: {
      description: 'Callback when the generate all button is clicked',
      action: 'generateAll',
    },
  },
  args: {
    onGenerate: fn(),
    onGenerateAll: fn(),
  },
};

export default meta;

const mockQuestions = [
  {
    _id: '65f1a2b3c4d5e6f7a8b9c0d1',
    tags: ['Mathematics', 'Linear Algebra', 'Vector Spaces'],
    marks: 10,
  },
  {
    _id: '65f1a2b3c4d5e6f7a8b9c0d2',
    tags: ['Physics', 'Quantum Mechanics', 'Schrödinger Equation'],
    marks: 15,
  },
  {
    _id: '65f1a2b3c4d5e6f7a8b9c0d3',
    tags: ['Chemistry', 'Organic Chemistry', 'Stereochemistry'],
    marks: 8,
  },
  {
    _id: '65f1a2b3c4d5e6f7a8b9c0d4',
    tags: ['Biology', 'Microbiology', 'Virology'],
    marks: 5,
  },
  {
    _id: '65f1a2b3c4d5e6f7a8b9c0d5',
    tags: ['Computer Science', 'Algorithms', 'Dynamic Programming'],
    marks: 12,
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
