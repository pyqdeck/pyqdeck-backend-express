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
    colorClass: 'text-purple-600 dark:text-purple-400',
    bgClass: 'bg-purple-100 dark:bg-purple-900/30',
  },
};

export const PapersMetric = {
  args: {
    title: 'Papers & Questions',
    value: '456',
    subLabel: 'Contains 2,345 questions',
    icon: FileText,
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-100 dark:bg-blue-900/30',
  },
};

export const AcademicsMetric = {
  args: {
    title: 'Academics',
    value: '12',
    subLabel: 'Supporting 45 branches',
    icon: GraduationCap,
    colorClass: 'text-green-600 dark:text-green-400',
    bgClass: 'bg-green-100 dark:bg-green-900/30',
  },
};

export const PendingMetric = {
  args: {
    title: 'Pending Reviews',
    value: '8',
    subLabel: 'Papers require your attention',
    icon: Clock,
    colorClass: 'text-orange-600 dark:text-orange-400',
    bgClass: 'bg-orange-100 dark:bg-orange-900/30',
  },
};
