'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Sparkles,
  Star,
  CheckCircle2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/components/ui/avatar';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export function HeroContent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
    >
      <motion.div variants={fadeUp} className="mb-6">
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/10 text-primary gap-1.5 rounded-full px-4 py-1.5"
        >
          <Sparkles className="size-3.5" />
          Free for all students
        </Badge>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="mb-6 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
      >
        Your Ultimate <br className="hidden lg:block" />
        <span className="text-primary">Exam Paper</span> Hub
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg leading-relaxed sm:text-xl lg:mx-0"
      >
        Access thousands of previous year question papers and solutions,
        organized by university, branch, semester, and subject — all in one
        place.
      </motion.p>

      {/* Social proof row */}
      <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3">
        <AvatarGroup>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Student" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              A
            </AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/maxleiter.png" alt="Student" />
            <AvatarFallback className="bg-info text-info-foreground">
              R
            </AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="Student"
            />
            <AvatarFallback className="bg-success text-success-foreground">
              S
            </AvatarFallback>
          </Avatar>
          <AvatarGroupCount className="bg-warning text-warning-foreground text-[10px] font-bold">
            +100K
          </AvatarGroupCount>
        </AvatarGroup>
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="fill-warning text-warning size-3.5" />
            ))}
          </div>
          <span className="text-muted-foreground text-sm">
            Loved by{' '}
            <span className="text-foreground font-semibold">
              100K+ students
            </span>
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
      >
        <Button
          size="lg"
          className="bg-primary text-primary-foreground shadow-primary/25 hover:shadow-primary/40 h-12 w-full gap-2 rounded-full px-8 text-base font-semibold transition-all sm:w-auto"
          asChild
        >
          <Link href="/sign-up">
            Start Practicing Free
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-12 w-full gap-2 rounded-full px-8 text-base sm:w-auto"
          asChild
        >
          <a
            href="https://pyqdeck.en.uptodown.com/android"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="size-4" />
            Download App
          </a>
        </Button>
      </motion.div>

      {/* Trust signals */}
      <motion.div
        variants={fadeUp}
        className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
      >
        {['No credit card required', 'Always free', 'Verified papers'].map(
          (text) => (
            <span
              key={text}
              className="text-muted-foreground flex items-center gap-1.5 text-xs"
            >
              <CheckCircle2 className="text-success size-3.5" />
              {text}
            </span>
          )
        )}
      </motion.div>
    </motion.div>
  );
}
