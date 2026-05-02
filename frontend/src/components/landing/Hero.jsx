'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useApi } from '@/hooks/use-api';
import {
  ArrowRight,
  Bookmark,
  Bot,
  Copy,
  Database,
  Download,
  Share2,
  Check,
  Sparkles,
  Star,
  CheckCircle2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { GoogleIcon } from '@/components/icons';

export function Hero() {
  const api = useApi();
  const [isCopied, setIsCopied] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    // Perform health check
    api
      .request({
        path: '/health',
        method: 'GET',
      })
      .then((res) => {
        console.log('Backend Status:', res.data.status);
      })
      .catch((err) => {
        console.error('Health Check Error:', err);
      });
  }, [api]);

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
    <section className="relative flex-1 overflow-hidden px-4 pt-8 pb-24 lg:pt-12 lg:pb-32">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,oklch(0.72_0.15_250/0.12),transparent)]" />
        <div className="bg-primary/5 absolute top-1/3 left-1/4 size-72 rounded-full blur-3xl" />
        <div className="bg-brand-to/5 absolute top-1/2 right-1/4 size-96 rounded-full blur-3xl" />
      </div>

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
              <AvatarGroup>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Student"
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    A
                  </AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/maxleiter.png"
                    alt="Student"
                  />
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
              {/* Top card (peek behind) */}
              <div className="border-border bg-background/40 origin-bottom translate-y-3 scale-[0.93] transform rounded-[2rem] border p-5 opacity-40 shadow-sm backdrop-blur-sm select-none">
                <div className="mb-3 flex items-center gap-2">
                  <Badge variant="teal">2020</Badge>
                  <Badge variant="purple">Q1a</Badge>
                  <Badge variant="amber">5 Marks</Badge>
                  <Badge variant="emerald">Solved</Badge>
                </div>
                <p className="text-muted-foreground decoration-border/50 text-sm leading-snug font-medium line-through">
                  Explain the working of a full adder circuit with truth table.
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
                    <Switch checked={isSolved} onCheckedChange={setIsSolved} />
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
                  Define multiplexer and realize a three-input AND gate using a
                  4x1 multiplexer.
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
                  Distinguish between Combinational and Sequential circuits with
                  examples.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
