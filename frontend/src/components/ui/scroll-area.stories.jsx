import { ScrollArea } from './scroll-area';
import { Separator } from './separator';

export default {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: 'The orientation of the scroll area',
      table: { defaultValue: { summary: 'vertical' } },
    },
    type: {
      control: 'select',
      options: ['auto', 'always', 'scroll', 'hover'],
      description: 'The type of scroll area',
      table: { defaultValue: { summary: 'hover' } },
    },
    scrollHideDelay: {
      control: 'number',
      description: 'The delay in milliseconds before the scrollbar is hidden',
      table: { defaultValue: { summary: '600' } },
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'The reading direction of the scroll area',
      table: { defaultValue: { summary: 'ltr' } },
    },
  },
};

const branches = [
  'Computer Engineering',
  'Information Technology',
  'Electronics and Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Chemical Engineering',
  'Aerospace Engineering',
  'Biotechnology Engineering',
  'Automobile Engineering',
  'Mechatronics Engineering',
  'Data Science and AI',
];

const VerticalTemplate = (args) => (
  <ScrollArea {...args} className="h-72 w-64 rounded-md border">
    <div className="p-4">
      <h4 className="mb-4 text-sm leading-none font-medium">Branches</h4>
      {branches.map((branch) => (
        <div key={branch}>
          <div className="text-sm">{branch}</div>
          <Separator className="my-2" />
        </div>
      ))}
    </div>
  </ScrollArea>
);

export const Vertical = {
  render: VerticalTemplate,
  args: {
    orientation: 'vertical',
  },
};

export const Horizontal = {
  render: (args) => (
    <ScrollArea {...args} className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {branches.map((branch) => (
          <div
            key={branch}
            className="bg-muted flex h-24 w-40 shrink-0 items-center justify-center rounded-md text-sm font-medium"
          >
            {branch}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  args: {
    orientation: 'horizontal',
  },
};

export const Both = {
  render: (args) => (
    <ScrollArea {...args} className="h-72 w-96 rounded-md border">
      <div className="grid w-[800px] grid-cols-4 gap-4 p-4">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="bg-muted flex h-32 items-center justify-center rounded-md text-sm font-medium"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  args: {
    orientation: 'both',
  },
};

export const AlwaysVisible = {
  render: VerticalTemplate,
  args: {
    orientation: 'vertical',
    type: 'always',
  },
};
