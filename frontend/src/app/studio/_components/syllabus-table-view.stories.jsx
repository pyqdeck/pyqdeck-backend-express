import { SyllabusTableView } from './syllabus-table-view';
import { fn } from '@storybook/test';

/**
 * The `SyllabusTableView` component displays the curriculum structure of a syllabus,
 * including modules and their constituent topics.
 */
const meta = {
  title: 'Studio/Academics/SyllabusTable',
  component: SyllabusTableView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    syllabus: {
      control: 'object',
      description: 'The syllabus metadata object',
      table: {
        type: {
          summary: 'object',
          detail:
            '{ id: string, title: string, description?: string, isActive: boolean }',
        },
      },
    },
    modules: {
      control: 'object',
      description: 'Array of module objects with nested topics',
      table: {
        type: {
          summary: 'array',
          detail:
            'Array<{ id: string, moduleNumber: number, title: string, description?: string, weightage: number, coMapping?: string, topics: Array<{ id: string, title: string, description?: string, order: number }> }>',
        },
        defaultValue: { summary: '[]' },
      },
    },
    pagination: {
      control: 'object',
      description: 'Pagination state object',
      table: {
        type: {
          summary: 'object',
          detail: '{ total: number, pages: number, current: number }',
        },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the view is in a loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onModuleAdd: { action: 'onModuleAdd' },
    onTopicAdd: { action: 'onTopicAdd' },
    onEditModule: { action: 'onEditModule' },
    onDeleteModule: { action: 'onDeleteModule' },
    onEditTopic: { action: 'onEditTopic' },
    onDeleteTopic: { action: 'onDeleteTopic' },
  },
  args: {
    onModuleAdd: fn(),
    onTopicAdd: fn(),
    onEditModule: fn(),
    onDeleteModule: fn(),
    onEditTopic: fn(),
    onDeleteTopic: fn(),
  },
};

export default meta;

const mockSyllabus = {
  id: '64f1a2b3c4d5e6f7a8b9c0d1',
  title: 'Data Structures and Algorithms',
  description:
    'This course covers fundamental data structures and algorithmic techniques for efficient problem solving.',
  isActive: true,
};

const mockModules = [
  {
    id: 'm1',
    moduleNumber: 1,
    title: 'Introduction to Algorithms',
    description:
      'Basic concepts of algorithmic analysis and asymptotic notation.',
    weightage: 15,
    coMapping: 'CO1, CO2',
    topics: [
      {
        id: 't1',
        title: 'Time and Space Complexity',
        description:
          'Analyzing performance using Big-O, Big-Omega, and Big-Theta.',
        order: 1,
      },
      {
        id: 't2',
        title: 'Asymptotic Notations',
        description: 'Mathematical foundations of algorithm analysis.',
        order: 2,
      },
    ],
  },
  {
    id: 'm2',
    moduleNumber: 2,
    title: 'Linear Data Structures',
    description:
      'Implementation and applications of stacks, queues, and linked lists.',
    weightage: 25,
    coMapping: 'CO3',
    topics: [
      {
        id: 't3',
        title: 'Arrays and Linked Lists',
        description: 'Memory allocation and pointer-based implementations.',
        order: 1,
      },
      {
        id: 't4',
        title: 'Stacks and Queues',
        description: 'LIFO and FIFO data structures.',
        order: 2,
      },
    ],
  },
  {
    id: 'm3',
    moduleNumber: 3,
    title: 'Non-linear Data Structures',
    description: 'Trees and Graphs: traversal, searching, and shortest paths.',
    weightage: 30,
    coMapping: 'CO4',
    topics: [
      {
        id: 't5',
        title: 'Binary Search Trees',
        description: 'Balanced trees, AVL, and Red-Black trees.',
        order: 1,
      },
      {
        id: 't6',
        title: 'Graph Algorithms',
        description: 'BFS, DFS, Dijkstra, and Kruskal algorithms.',
        order: 2,
      },
    ],
  },
];

export const Default = {
  args: {
    syllabus: mockSyllabus,
    modules: mockModules,
    loading: false,
  },
};

export const Loading = {
  args: {
    syllabus: null,
    modules: [],
    loading: true,
  },
};

export const Empty = {
  args: {
    syllabus: mockSyllabus,
    modules: [],
    loading: false,
  },
};

export const Draft = {
  args: {
    ...Default.args,
    syllabus: { ...mockSyllabus, isActive: false },
  },
};

export const WithPagination = {
  args: {
    ...Default.args,
    pagination: {
      total: 25,
      pages: 3,
      current: 1,
    },
  },
};

export const Searching = {
  args: {
    ...Default.args,
    modules: [mockModules[1]],
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          search: 'Linear',
        },
      },
    },
  },
};

export const NoResults = {
  args: {
    ...Empty.args,
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          search: 'Quantum Computing',
        },
      },
    },
  },
};
