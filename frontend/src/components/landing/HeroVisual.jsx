'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Bot, Copy, Database, Share2, Check } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { GoogleIcon } from '@/components/icons';

export function HeroVisual() {
  const [isCopied, setIsCopied] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

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
            Define multiplexer and realize a three-input AND gate using a 4x1
            multiplexer.
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
  );
}
