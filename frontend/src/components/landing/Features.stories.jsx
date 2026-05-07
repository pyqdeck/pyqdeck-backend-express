import { Features } from './Features';
import {
  Search,
  Building2,
  FileText,
  Bookmark,
  Filter,
  ShieldCheck,
} from 'lucide-react';

/**
 * The Features component highlights the key capabilities of the PyqDeck platform.
 * It uses a grid of cards to display different features with icons and descriptions.
 */
const meta = {
  title: 'Landing/Features',
  component: Features,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    badgeText: {
      control: 'text',
      description: 'Text displayed in the badge above the title',
    },
    title: {
      control: 'text',
      description: 'Main heading for the features section',
    },
    description: {
      control: 'text',
      description: 'Sub-heading providing more context',
    },
    features: {
      control: 'object',
      description: 'Array of feature objects to display',
    },
  },
};

export default meta;

const defaultFeatures = [
  {
    icon: Search,
    title: 'Smart Search',
    description:
      'Find papers instantly by university, branch, semester, or subject with our powerful search engine.',
    color: 'text-info',
    bg: 'bg-info-bg',
  },
  {
    icon: Building2,
    title: 'Multi-University',
    description:
      'Access question papers from universities across India, all organized in one place.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: FileText,
    title: 'Complete Papers',
    description:
      'Get full question papers with solutions, organized by year and exam type.',
    color: 'text-success',
    bg: 'bg-success-bg',
  },
  {
    icon: Bookmark,
    title: 'Bookmarks',
    description:
      'Save your favorite papers and solutions for quick access during exam prep.',
    color: 'text-warning',
    bg: 'bg-warning-bg',
  },
  {
    icon: Filter,
    title: 'Precise Filtering',
    description:
      'Filter by branch, semester, subject, and year to find exactly what you need.',
    color: 'text-destructive',
    bg: 'bg-destructive/10',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Content',
    description:
      'All papers and solutions are reviewed by our editorial team for accuracy.',
    color: 'text-teal',
    bg: 'bg-teal-bg',
  },
];

export const Default = {
  args: {
    badgeText: 'Powerful Features',
    title: 'Everything you need to ace your exams',
    description:
      'PyqDeck brings all your study resources together so you can focus on what matters — learning.',
    features: defaultFeatures,
  },
};

export const CustomContent = {
  args: {
    badgeText: 'Exclusive Benefits',
    title: 'Why Choose PyqDeck?',
    description: 'We provide the best tools for engineering students.',
    features: defaultFeatures.slice(0, 3),
  },
};

export const MobileView = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    ...Default.args,
  },
};
