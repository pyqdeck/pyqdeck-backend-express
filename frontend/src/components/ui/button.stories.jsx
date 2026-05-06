import { Mail } from 'lucide-react';
import { Button } from './button';

export default {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: { type: 'select' },
      options: [
        'default',
        'xs',
        'sm',
        'lg',
        'icon',
        'icon-xs',
        'icon-sm',
        'icon-lg',
      ],
    },
  },
};

export const Default = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

export const Destructive = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

export const Outline = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Ghost = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Link = {
  args: {
    children: 'Link',
    variant: 'link',
  },
};

export const Large = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Small = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const ExtraSmall = {
  args: {
    children: 'Extra Small',
    size: 'xs',
  },
};

export const Icon = {
  args: {
    children: <Mail />,
    size: 'icon',
    'aria-label': 'Email',
  },
};

export const IconXS = {
  args: {
    children: <Mail />,
    size: 'icon-xs',
    'aria-label': 'Email',
  },
};

export const IconSM = {
  args: {
    children: <Mail />,
    size: 'icon-sm',
    'aria-label': 'Email',
  },
};

export const IconLG = {
  args: {
    children: <Mail />,
    size: 'icon-lg',
    'aria-label': 'Email',
  },
};

export const AsChild = {
  args: {
    asChild: true,
    children: <a href="https://google.com">External Link</a>,
  },
};
