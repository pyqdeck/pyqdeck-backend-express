import { fn } from '@storybook/test';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';

/**
 * A control that allows the user to select a value from a list of options.
 * Built on top of Radix UI Select.
 */
const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onValueChange: {
      description: 'Event handler called when the value changes.',
      table: {
        category: 'Events',
      },
    },
    onOpenChange: {
      description: 'Event handler called when the open state changes.',
      table: {
        category: 'Events',
      },
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'The reading direction of the select.',
      table: {
        defaultValue: { summary: 'ltr' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: 'The size of the select trigger.',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text to display.',
    },
    position: {
      control: 'select',
      options: ['item-aligned', 'popper'],
      description: 'The positioning strategy of the content.',
      table: {
        defaultValue: { summary: 'item-aligned' },
      },
    },
  },
  args: {
    onValueChange: fn(),
    onOpenChange: fn(),
  },
};

export default meta;

const Template = ({ size, placeholder, position, ...args }) => (
  <Select {...args}>
    <SelectTrigger className="w-[220px]" size={size}>
      <SelectValue placeholder={placeholder || 'Select an option'} />
    </SelectTrigger>
    <SelectContent position={position}>
      <SelectGroup>
        <SelectLabel>Academics</SelectLabel>
        <SelectItem value="computer-engineering">
          Computer Engineering
        </SelectItem>
        <SelectItem value="information-technology">
          Information Technology
        </SelectItem>
        <SelectItem value="electronics-engineering">
          Electronics Engineering
        </SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Semesters</SelectLabel>
        <SelectItem value="sem-1">Semester 1</SelectItem>
        <SelectItem value="sem-2">Semester 2</SelectItem>
        <SelectItem value="sem-3">Semester 3</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

export const Default = {
  render: Template,
  args: {
    placeholder: 'Select branch or semester',
  },
};

export const Small = {
  render: Template,
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Disabled = {
  render: Template,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Popper = {
  render: Template,
  args: {
    ...Default.args,
    position: 'popper',
  },
};
