'use client';

import React from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
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

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium">
            {[
              { label: 'Features', href: '#features' },
              { label: 'How it Works', href: '#how-it-works' },
              { label: 'About', href: '#' },
              { label: 'Privacy', href: '#' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
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
  );
}
