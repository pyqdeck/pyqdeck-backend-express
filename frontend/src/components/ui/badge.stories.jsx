import { Badge } from './badge';
import { Star } from 'lucide-react';

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
    asChild: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
};

export const Default = {
  args: {
    children: 'B.Tech',
    variant: 'default',
  },
};

export const Secondary = {
  args: {
    children: 'Semester 4',
    variant: 'secondary',
  },
};

export const Destructive = {
  args: {
    children: 'Critical',
    variant: 'destructive',
  },
};

export const Outline = {
  args: {
    children: 'KTU',
    variant: 'outline',
  },
};

export const Ghost = {
  args: {
    children: 'Ghost Badge',
    variant: 'ghost',
  },
};

export const Link = {
  args: {
    children: 'Link Badge',
    variant: 'link',
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

export const AsChild = {
  args: {
    variant: 'outline',
    asChild: true,
  },
  render: (args) => (
    <Badge {...args}>
      <a href="https://pyqdeck.in">Link Badge</a>
    </Badge>
  ),
};

export const WithIcon = {
  args: {
    variant: 'default',
    children: 'Featured',
  },
  render: ({ children, ...args }) => (
    <Badge {...args}>
      <Star className="mr-1" />
      {children}
    </Badge>
  ),
};
