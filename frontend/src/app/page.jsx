/**
 * PyqDeck - Next-Generation Exam Learning Platform
 *
 * @copyright (c) 2026 PyqDeck. All rights reserved.
 * @license Proprietary
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by the PyqDeck Team <admin@pyqdeck.in>
 */

'use client';

import React from 'react';
import { Hero } from '@/components/landing/Hero';
import { Stats } from '@/components/landing/Stats';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Testimonials } from '@/components/landing/Testimonials';
import { PartnerSpotlight } from '@/components/landing/PartnerSpotlight';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <PartnerSpotlight />
      <FinalCTA />
      <Footer />
    </div>
  );
}
