import React from 'react';
import { HeroVisual } from './HeroVisual';

export default {
  title: 'Landing/Hero/HeroVisual',
  component: HeroVisual,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <div className="w-[500px]">
      <HeroVisual />
    </div>
  ),
};
