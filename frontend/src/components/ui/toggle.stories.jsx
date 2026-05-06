import { fn } from '@storybook/test';
import { Toggle } from './toggle';
import { Bold, Italic, Underline } from 'lucide-react';

const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline'],
      description: 'Visual style variant',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg'],
      description: 'Size variant',
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the toggle',
      table: { defaultValue: { summary: 'false' } },
    },
    pressed: {
      control: 'boolean',
      description: 'The pressed state of the toggle',
    },
    defaultPressed: {
      control: 'boolean',
      description: 'The initial pressed state of the toggle',
    },
  },
  args: {
    onPressedChange: fn(),
  },
};

export default meta;

export const Default = {
  args: {
    children: <Bold className="size-4" />,
    'aria-label': 'Toggle bold',
  },
};

export const Outline = {
  args: {
    variant: 'outline',
    children: <Italic className="size-4" />,
    'aria-label': 'Toggle italic',
  },
};

export const Pressed = {
  args: {
    defaultPressed: true,
    children: <Underline className="size-4" />,
    'aria-label': 'Toggle underline',
  },
};

export const Small = {
  args: {
    size: 'sm',
    children: <Bold className="size-3.5" />,
    'aria-label': 'Toggle bold',
  },
};

export const Large = {
  args: {
    size: 'lg',
    children: <Bold className="size-4" />,
    'aria-label': 'Toggle bold',
  },
};

export const WithText = {
  args: {
    children: (
      <>
        <Bold className="size-4" />
        Bold
      </>
    ),
    'aria-label': 'Toggle bold',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: <Bold className="size-4" />,
    'aria-label': 'Toggle bold',
  },
};
