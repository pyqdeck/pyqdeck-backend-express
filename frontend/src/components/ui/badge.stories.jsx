import { Badge } from './badge';

export default {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
        'teal',
        'purple',
        'amber',
        'emerald',
      ],
    },
  },
};

export const Default = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Destructive = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Teal = {
  args: {
    children: 'New Paper',
    variant: 'teal',
  },
};

export const Purple = {
  args: {
    children: 'Module 1',
    variant: 'purple',
  },
};

export const Amber = {
  args: {
    children: 'High Weightage',
    variant: 'amber',
  },
};

export const Emerald = {
  args: {
    children: 'Solved',
    variant: 'emerald',
  },
};
