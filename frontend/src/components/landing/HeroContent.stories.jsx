import React from 'react';
import { HeroContent } from './HeroContent';

export default {
  title: 'Landing/Hero/HeroContent',
  component: HeroContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <div className="max-w-xl">
      <HeroContent />
    </div>
  ),
};
