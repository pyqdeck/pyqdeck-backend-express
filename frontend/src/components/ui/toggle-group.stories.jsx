import { fn } from '@storybook/test';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';
import { Bold, Italic, Underline, List, LayoutGrid, Table } from 'lucide-react';

const meta = {
  title: 'UI/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'The type of selection that is allowed.',
      table: { defaultValue: { summary: 'single' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'The visual variant of the toggle group.',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the toggle group items.',
      table: { defaultValue: { summary: 'default' } },
    },
    spacing: {
      control: { type: 'number', min: 0, max: 20, step: 1 },
      description: 'The spacing between items (in pixels).',
      table: { defaultValue: { summary: '0' } },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the toggle group.',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle group is disabled.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    onValueChange: fn(),
  },
};

export default meta;

const ViewModeTemplate = (args) => (
  <ToggleGroup {...args}>
    <ToggleGroupItem value="list" aria-label="List view">
      <List className="size-4" />
      <span>List</span>
    </ToggleGroupItem>
    <ToggleGroupItem value="grid" aria-label="Grid view">
      <LayoutGrid className="size-4" />
      <span>Grid</span>
    </ToggleGroupItem>
    <ToggleGroupItem value="table" aria-label="Table view">
      <Table className="size-4" />
      <span>Table</span>
    </ToggleGroupItem>
  </ToggleGroup>
);

const FormattingTemplate = (args) => (
  <ToggleGroup {...args}>
    <ToggleGroupItem value="bold" aria-label="Toggle bold">
      <Bold className="size-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="Toggle italic">
      <Italic className="size-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="underline" aria-label="Toggle underline">
      <Underline className="size-4" />
    </ToggleGroupItem>
  </ToggleGroup>
);

export const Default = {
  render: ViewModeTemplate,
  args: {
    type: 'single',
    defaultValue: 'list',
  },
};

export const Semesters = {
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="sem-1">Sem 1</ToggleGroupItem>
      <ToggleGroupItem value="sem-2">Sem 2</ToggleGroupItem>
      <ToggleGroupItem value="sem-3">Sem 3</ToggleGroupItem>
      <ToggleGroupItem value="sem-4">Sem 4</ToggleGroupItem>
    </ToggleGroup>
  ),
  args: {
    type: 'multiple',
    variant: 'outline',
  },
};

export const Multiple = {
  render: FormattingTemplate,
  args: {
    type: 'multiple',
    defaultValue: ['bold', 'italic'],
  },
};

export const Outline = {
  render: FormattingTemplate,
  args: {
    type: 'multiple',
    variant: 'outline',
  },
};

export const Small = {
  render: ViewModeTemplate,
  args: {
    type: 'single',
    size: 'sm',
    defaultValue: 'grid',
  },
};

export const Large = {
  render: ViewModeTemplate,
  args: {
    type: 'single',
    size: 'lg',
    defaultValue: 'table',
  },
};

export const Vertical = {
  render: ViewModeTemplate,
  args: {
    type: 'single',
    orientation: 'vertical',
    defaultValue: 'list',
  },
};

export const Spacing = {
  render: FormattingTemplate,
  args: {
    type: 'multiple',
    spacing: 2,
    defaultValue: ['bold'],
  },
};

export const Disabled = {
  render: ViewModeTemplate,
  args: {
    type: 'single',
    disabled: true,
    defaultValue: 'list',
  },
};
