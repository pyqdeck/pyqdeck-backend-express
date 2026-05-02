import { Input } from './input';

export default {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'file'],
    },
  },
};

export const Default = {
  args: {
    placeholder: 'Email',
    type: 'email',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const File = {
  args: {
    type: 'file',
  },
};
