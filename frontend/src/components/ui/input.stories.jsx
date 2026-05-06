import { fn } from '@storybook/test';
import { Input } from './input';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'file'],
      description: 'The type of the input',
      table: { defaultValue: { summary: 'text' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
      table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Makes the input read-only',
      table: { defaultValue: { summary: 'false' } },
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'Indicates the input is invalid',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export default meta;

export const Default = {
  args: {
    placeholder: 'Enter your name',
    type: 'text',
  },
};

export const Email = {
  args: {
    placeholder: 'john.doe@example.com',
    type: 'email',
  },
};

export const Password = {
  args: {
    placeholder: '••••••••',
    type: 'password',
  },
};

export const Number = {
  args: {
    placeholder: '42',
    type: 'number',
  },
};

export const File = {
  args: {
    type: 'file',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    defaultValue: 'Disabled input value',
  },
};

export const ReadOnly = {
  args: {
    readOnly: true,
    defaultValue: 'Read-only input value',
  },
};

export const Invalid = {
  args: {
    'aria-invalid': true,
    defaultValue: 'Invalid input value',
  },
};
