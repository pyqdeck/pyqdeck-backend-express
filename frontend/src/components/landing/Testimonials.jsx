'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

export function Testimonials() {
  return (
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
  );
}
