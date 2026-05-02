// app/page.tsx (or pages/index.tsx)
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Bookmark,
  Building2,
  DownloadCloud,
  FileText,
  Filter,
  GraduationCap,
  BookOpen,
  Search,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Share2,
  Copy,
  Bot,
  Database,
  Download,
  Check,
  Star,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
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

const steps = [
  {
    step: '01',
    title: 'Select Your University',
    description:
      'Choose your university and branch from our growing database of institutions.',
    icon: GraduationCap,
  },
  {
    step: '02',
    title: 'Browse Your Subjects',
    description:
      'Navigate to your semester and pick the subject you are preparing for.',
    icon: BookOpen,
  },
  {
    step: '03',
    title: 'Access Papers & Solutions',
    description:
      'Download question papers and detailed solutions instantly, for free.',
    icon: DownloadCloud,
  },
];

const stats = [
  { value: 50, suffix: '+', label: 'Universities' },
  { value: 10, suffix: 'K+', label: 'Question Papers' },
  { value: 25, suffix: 'K+', label: 'Solutions' },
  { value: 100, suffix: 'K+', label: 'Students' },
];

const testimonials = [
  {
    quote: 'PyqDeck saved me weeks of searching. Everything is right here.',
    name: 'Priya S.',
    role: 'B.Tech, SPPU',
  },
  {
    quote:
      'The filtering is incredible — found exactly what I needed in seconds.',
    name: 'Arjun M.',
    role: 'B.E., VTU',
  },
  {
    quote:
      'Free, fast, and accurate. This is a must for every engineering student.',
    name: 'Sneha K.',
    role: 'B.Tech, AKTU',
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1200, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LandingPage() {
  const [isCopied, setIsCopied] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      'Define multiplexer and realize a three-input AND gate using a 4x1 multiplexer.'
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'PYQDeck',
      text: 'Check out this question on PYQDeck!',
      url: 'https://pyqdeck.in/',
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      navigator.clipboard.writeText(shareData.url);
    }
  };

  const handleGoogleSearch = () => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        'Define multiplexer and realize a three-input AND gate using a 4x1 multiplexer.'
      )}`,
      '_blank'
    );
  };

  const handleAskAI = () => {
    const prompt = `Hello, I have a university exam question...\n\nDefine multiplexer and realize a three-input AND gate using a 4x1 multiplexer.\n\nExplain clearly.`;
    window.open(
      `https://chat.openai.com/chat?q=${encodeURIComponent(prompt)}`,
      '_blank'
    );
  };

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative flex-1 overflow-hidden px-4 pt-8 pb-24 lg:pt-12 lg:pb-32">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-20">
            {/* Left: Copy */}
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
                organized by university, branch, semester, and subject — all in
                one place.
              </motion.p>

              {/* Social proof row */}
              <motion.div
                variants={fadeUp}
                className="mb-8 flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  {['A', 'R', 'S', 'K'].map((letter, i) => (
                    <div
                      key={letter}
                      className={cn(
                        'border-background text-primary-foreground flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold',
                        ['bg-primary', 'bg-info', 'bg-success', 'bg-warning'][i]
                      )}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="fill-warning text-warning size-3.5"
                      />
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
                  className="bg-primary text-primary-foreground shadow-primary/25 hover:shadow-primary/40 h-12 w-full gap-2 rounded-full px-8 text-base font-semibold shadow-lg transition-all sm:w-auto"
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
                {[
                  'No credit card required',
                  'Always free',
                  'Verified papers',
                ].map((text) => (
                  <span
                    key={text}
                    className="text-muted-foreground flex items-center gap-1.5 text-xs"
                  >
                    <CheckCircle2 className="text-success size-3.5" />
                    {text}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Interactive Card Stack */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative order-1 flex min-h-[480px] w-full items-center justify-center lg:order-2 lg:min-h-[540px] xl:justify-end"
            >
              <div className="relative flex w-full max-w-[460px] flex-col gap-5">
                {/* Background glow */}

                {/* Top card (peek behind) */}
                <div className="border-border bg-background/40 origin-bottom translate-y-3 scale-[0.93] transform rounded-[2rem] border p-5 opacity-40 shadow-sm backdrop-blur-sm select-none">
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="teal">2020</Badge>
                    <Badge variant="purple">Q1a</Badge>
                    <Badge variant="amber">5 Marks</Badge>
                    <Badge variant="emerald">Solved</Badge>
                  </div>
                  <p className="text-muted-foreground decoration-border/50 text-sm leading-snug font-medium line-through">
                    Explain the working of a full adder circuit with truth
                    table.
                  </p>
                </div>

                {/* Active card */}
                <div className="border-border bg-card text-card-foreground relative z-10 rounded-[2.5rem] border p-7 shadow-2xl ring-1 ring-black/5 transition-all dark:ring-white/5">
                  {/* Top meta row */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="teal">2021</Badge>
                      <Badge variant="purple">Q1c</Badge>
                      <Badge variant="amber">2 Marks</Badge>
                      {isSolved && (
                        <motion.div
                          className="inline-flex"
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 20,
                          }}
                        >
                          <Badge variant="emerald">Solved</Badge>
                        </motion.div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Bookmark className="text-muted-foreground hover:text-foreground size-5 cursor-pointer transition-colors" />
                      <Switch
                        checked={isSolved}
                        onCheckedChange={setIsSolved}
                      />
                    </div>
                  </div>

                  {/* Module label */}
                  <div className="text-primary mb-4 flex items-center gap-2">
                    <Database className="size-4" />
                    <span className="text-[11px] font-bold tracking-widest uppercase">
                      Module 2 · Combinational Circuits
                    </span>
                  </div>

                  {/* Question */}
                  <h3 className="text-foreground mb-8 text-lg leading-snug font-bold tracking-tight sm:text-xl">
                    Define multiplexer and realize a three-input AND gate using
                    a 4x1 multiplexer.
                  </h3>

                  {/* Action row */}
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground flex items-center gap-4">
                      {/* Google icon */}
                      <button
                        onClick={handleGoogleSearch}
                        aria-label="Search on Google"
                        className="hover:text-foreground cursor-pointer transition-colors"
                      >
                        <GoogleIcon className="size-5" />
                      </button>

                      <button
                        onClick={handleCopy}
                        aria-label="Copy question"
                        className="hover:text-foreground cursor-pointer transition-colors"
                      >
                        {isCopied ? (
                          <Check className="text-success size-5" />
                        ) : (
                          <Copy className="size-5" />
                        )}
                      </button>

                      <button
                        onClick={handleShare}
                        aria-label="Share question"
                        className="hover:text-foreground cursor-pointer transition-colors"
                      >
                        <Share2 className="size-5" />
                      </button>
                    </div>

                    <Button
                      onClick={handleAskAI}
                      className="bg-primary text-primary-foreground shadow-primary/30 hover:shadow-primary/50 h-10 gap-2 rounded-full px-5 text-sm font-bold shadow-md transition-all active:scale-95"
                    >
                      <Bot className="size-4" />
                      Ask AI
                    </Button>
                  </div>
                </div>

                {/* Bottom card (peek below) */}
                <div className="border-border bg-background/60 relative z-0 origin-top -translate-y-3 scale-[0.95] transform rounded-[2rem] border p-5 opacity-60 shadow-md">
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="teal">2022</Badge>
                    <Badge variant="purple">Q2b</Badge>
                    <Badge variant="amber">10 Marks</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-snug font-medium">
                    Distinguish between Combinational and Sequential circuits
                    with examples.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <Separator />
      <div className="bg-muted/40">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-1 text-center"
              >
                <span className="text-primary text-4xl font-extrabold">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-muted-foreground text-sm font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Separator />

      {/* ── Features ─────────────────────────────────────────────── */}
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
            Powerful Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to ace your exams
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-lg">
            PyqDeck brings all your study resources together so you can focus on
            what matters — learning.
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
              <Card className="group h-full border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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

      <Separator />

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="mx-auto w-full max-w-5xl px-4 py-28"
      >
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
            <CheckCircle2 className="text-success size-3.5" />
            Simple Process
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Start finding papers in minutes
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-lg">
            Three simple steps to access the study materials you need.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex flex-col items-center gap-5 text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="from-border via-border/50 absolute top-5 right-0 left-[calc(50%+2.5rem)] hidden h-px bg-gradient-to-r to-transparent md:block" />
              )}

              {/* Step number bubble */}
              <div className="relative z-10">
                <div className="bg-primary text-primary-foreground shadow-primary/30 flex size-10 items-center justify-center rounded-full text-xs font-bold shadow-md">
                  {step.step}
                </div>
              </div>

              {/* Icon */}
              <div className="bg-muted border-border flex size-16 items-center justify-center rounded-2xl border shadow-sm">
                <step.icon className="text-foreground size-7" />
              </div>

              <div>
                <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                <p className="text-muted-foreground mx-auto max-w-[230px] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="border-border bg-muted/30 border-y py-24">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Loved by students everywhere
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className="fill-warning text-warning size-4"
                        />
                      ))}
                    </div>
                    <p className="text-foreground mb-4 text-sm leading-relaxed">
                      "{t.quote}"
                    </p>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-muted-foreground text-xs">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Spotlight ────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-4xl px-4 py-24">
        <motion.a
          href="https://coursify-website.vercel.app/"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group bg-primary shadow-primary/20 hover:shadow-primary/40 relative block overflow-hidden rounded-3xl p-px shadow-xl transition-all"
        >
          <div className="bg-primary rounded-[calc(1.5rem-1px)] p-8 sm:p-10">
            {/* Noise overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] opacity-10 mix-blend-overlay" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="bg-primary-foreground/15 ring-primary-foreground/20 flex size-16 shrink-0 items-center justify-center rounded-2xl ring-1 backdrop-blur-sm">
                <BookOpen className="text-primary-foreground size-8" />
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <p className="text-primary-foreground/70 text-xs font-bold tracking-widest uppercase">
                  Partner Spotlight
                </p>
                <h3 className="text-primary-foreground text-2xl font-bold tracking-tight sm:text-3xl">
                  Coursify
                </h3>
                <p className="text-primary-foreground/85 max-w-xl text-sm leading-relaxed sm:text-base">
                  Turn YouTube playlists into structured courses with progress
                  tracking, note-taking, and an AI tutor. Free and ad-free.
                </p>
              </div>
              <div className="mt-2 sm:mt-0 sm:ml-auto sm:shrink-0">
                <Button
                  variant="secondary"
                  className="gap-2 rounded-full px-6 font-semibold"
                >
                  Visit Coursify
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </motion.a>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
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
            Join thousands of students who use PyqDeck to prepare for their
            exams. Free forever, no credit card required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground shadow-primary/25 hover:shadow-primary/40 h-12 gap-2 rounded-full px-10 text-base font-semibold shadow-lg"
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

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-border bg-background border-t">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg text-xs font-extrabold shadow-sm">
                PQ
              </div>
              <span className="text-lg font-bold">PyqDeck</span>
            </Link>

            {/* Nav links */}
            <div className="text-muted-foreground flex flex-wrap justify-center gap-6 text-sm font-medium">
              {[
                { href: '#features', label: 'Features' },
                { href: '#how-it-works', label: 'How it Works' },
                { href: '/privacy', label: 'Privacy Policy' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://pyqdeck.en.uptodown.com/android"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground flex items-center gap-1.5 transition-colors"
              >
                <Download className="size-3.5" />
                App
              </a>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="text-muted-foreground flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
            <p>
              © {new Date().getFullYear()} PyqDeck. Built for students, by
              students.
            </p>
            <p>
              Built by{' '}
              <a
                href="https://hasanraiyan.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground decoration-muted-foreground/40 font-semibold underline underline-offset-4 transition-colors"
              >
                Raiyan Hasan
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function GoogleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09zM12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23zM5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84zM12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
