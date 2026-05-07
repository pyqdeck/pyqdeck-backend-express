import { MetricCardView } from './metric-card-view';
import { Users, FileText, GraduationCap, Clock } from 'lucide-react';

const meta = {
  title: 'Studio/Shared/MetricCard',
  component: MetricCardView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the metric card',
    },
    value: {
      control: 'text',
      description: 'The main value displayed in the card',
    },
    subLabel: {
      control: 'text',
      description: 'The secondary label or description',
    },
    icon: {
      control: false,
      description: 'Lucide icon component to display',
    },
    colorClass: {
      control: 'text',
      description: 'Tailwind text color class for the icon',
    },
    bgClass: {
      control: 'text',
      description: 'Tailwind background color class for the icon container',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the card is in a loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;

export const UsersMetric = {
  args: {
    title: 'Total Users',
    value: '12,847',
    subLabel: 'Active students this month',
    icon: Users,
    colorClass: 'text-primary',
    bgClass: 'bg-primary/10',
    loading: false,
  },
};

export const PapersMetric = {
  args: {
    title: 'Question Papers',
    value: '4,520',
    subLabel: 'Across 12 universities',
    icon: FileText,
    colorClass: 'text-info',
    bgClass: 'bg-info/10',
    loading: false,
  },
};

export const AcademicsMetric = {
  args: {
    title: 'Academic Branches',
    value: '18',
    subLabel: 'Supporting 450+ subjects',
    icon: GraduationCap,
    colorClass: 'text-success',
    bgClass: 'bg-success/10',
    loading: false,
  },
};

export const PendingMetric = {
  args: {
    title: 'Pending Reviews',
    value: '24',
    subLabel: 'Requires immediate attention',
    icon: Clock,
    colorClass: 'text-warning',
    bgClass: 'bg-warning/10',
    loading: false,
  },
};

export const Loading = {
  args: {
    ...UsersMetric.args,
    loading: true,
  },
};
