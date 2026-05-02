'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t px-4 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl text-center"
      >
        <Badge
          variant="outline"
          className="border-success/30 bg-success-bg text-success mb-6 gap-1.5 rounded-full px-4 py-1.5"
        >
          <CheckCircle2 className="size-3.5" />
          Join 100K+ students
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Ready to study smarter?
        </h2>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
          Join thousands of students who use PyqDeck to prepare for their exams.
          Free forever, no credit card required.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground shadow-primary/25 hover:shadow-primary/40 h-12 gap-2 rounded-full px-10 text-base font-semibold"
            asChild
          >
            <Link href="/sign-up">
              Create Free Account
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-background h-12 rounded-full px-8 text-base"
            asChild
          >
            <Link href="/sign-in">Already have an account?</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
