import { Spinner } from './spinner';

/**
 * A loading spinner component based on Lucide's Loader2 icon.
 */
const meta = {
  title: 'UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
    },
  },
};

export default meta;

const Template = (args) => <Spinner {...args} />;

export const Default = {
  render: Template,
  args: {},
};

export const Small = {
  render: Template,
  args: {
    className: 'size-3',
  },
};

export const Large = {
  render: Template,
  args: {
    className: 'size-8',
  },
};

export const Primary = {
  render: Template,
  args: {
    className: 'text-primary',
  },
};

export const Secondary = {
  render: Template,
  args: {
    className: 'text-muted-foreground',
  },
};

export const Destructive = {
  render: Template,
  args: {
    className: 'text-destructive',
  },
};
