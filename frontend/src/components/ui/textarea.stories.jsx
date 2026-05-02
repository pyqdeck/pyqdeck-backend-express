import { Textarea } from './textarea';

export default {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    placeholder: 'Type your message here.',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    placeholder: 'Type your message here.',
  },
};
