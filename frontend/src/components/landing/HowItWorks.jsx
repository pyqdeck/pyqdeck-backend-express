'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const steps = [
  {
    number: '1',
    title: 'Select Your University',
    description:
      'Choose your university and branch from our growing database of verified institutions.',
  },
  {
    number: '2',
    title: 'Browse Your Subjects',
    description:
      'Navigate to your semester and pick the specific subject you are preparing for today.',
  },
  {
    number: '3',
    title: 'Access Papers & Solutions',
    description:
      'Download high-quality question papers and detailed step-by-step solutions instantly.',
  },
  {
    number: '4',
    title: 'Bookmark for Later',
    description:
      'Save important questions and solutions to your personal collection for quick access later.',
  },
  {
    number: '5',
    title: 'Ask AI for Help',
    description:
      'Get instant, clear explanations for complex engineering concepts using our built-in AI tutor.',
  },
  {
    number: '6',
    title: 'Practice & Ace',
    description:
      'Prepare effectively with curated materials and track your progress to ensure exam success.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section: Heading + Image */}
        <div className="mb-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="outline"
              className="mb-6 gap-1.5 rounded-full px-4 py-1.5"
            >
              <CheckCircle2 className="text-success size-3.5" />
              Simple Process
            </Badge>
            <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Start finding papers <br />
              <span className="text-primary">in minutes</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed lg:text-xl">
              PyqDeck simplifies your exam preparation by bringing all the
              resources you need into one modern, searchable platform. No more
              hunting through broken links or messy drives.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="bg-primary/20 absolute -inset-4 rounded-3xl blur-3xl" />
            <div className="border-border bg-card relative overflow-hidden rounded-3xl border shadow-2xl">
              <img
                src="/images/laptop-mockup.png"
                alt="PyqDeck Dashboard Mockup"
                width={800}
                height={500}
                className="w-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Steps Grid */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-5"
            >
              <div className="flex-shrink-0">
                <div className="flex size-10 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {step.number}
                </div>
              </div>
              <div className="space-y-2 pt-1">
                <h3 className="text-lg font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
