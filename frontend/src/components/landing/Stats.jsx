'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

const stats = [
  { value: 50, suffix: '+', label: 'Universities' },
  { value: 10, suffix: 'K+', label: 'Question Papers' },
  { value: 25, suffix: 'K+', label: 'Solutions' },
  { value: 100, suffix: 'K+', label: 'Students' },
];

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

export function Stats() {
  return (
    <>
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
    </>
  );
}
