import { MetricCardView } from './metric-card-view';
import { Users, FileText, GraduationCap, Clock } from 'lucide-react';

export default {
  title: 'Studio/Shared/MetricCard',
  component: MetricCardView,
  tags: ['autodocs'],
};

export const UsersMetric = {
  args: {
    title: 'Total Users',
    value: '1,234',
    subLabel: 'Registered users on the platform',
    icon: Users,
    colorClass: 'text-primary',
    bgClass: 'bg-primary/10',
  },
};

export const PapersMetric = {
  args: {
    title: 'Papers & Questions',
    value: '456',
    subLabel: 'Contains 2,345 questions',
    icon: FileText,
    colorClass: 'text-info',
    bgClass: 'bg-info/10',
  },
};

export const AcademicsMetric = {
  args: {
    title: 'Academics',
    value: '12',
    subLabel: 'Supporting 45 branches',
    icon: GraduationCap,
    colorClass: 'text-success',
    bgClass: 'bg-success/10',
  },
};

export const PendingMetric = {
  args: {
    title: 'Pending Reviews',
    value: '8',
    subLabel: 'Papers require your attention',
    icon: Clock,
    colorClass: 'text-warning',
    bgClass: 'bg-warning/10',
  },
};
