'use client';

import { motion } from 'framer-motion';
import {
  Search,
  Building2,
  FileText,
  Bookmark,
  Filter,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

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

export function Features({
  badgeText = 'Powerful Features',
  title = 'Everything you need to ace your exams',
  description = 'PyqDeck brings all your study resources together so you can focus on what matters — learning.',
  features = defaultFeatures,
}) {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-4 py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <Badge
          variant="outline"
          className="mb-4 gap-1.5 rounded-full px-4 py-1.5"
        >
          <Zap className="text-warning size-3.5" />
          {badgeText}
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md text-lg">
          {description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="group h-full border transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div
                  className={cn(
                    'mb-4 flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
                    feature.bg
                  )}
                >
                  <feature.icon className={cn('size-6', feature.color)} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="mt-1.5 text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
