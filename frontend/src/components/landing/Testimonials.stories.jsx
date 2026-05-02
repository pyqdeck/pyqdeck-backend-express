import React from 'react';
import { Testimonials } from './Testimonials';

export default {
  title: 'Landing/Testimonials',
  component: Testimonials,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <div className="bg-background">
      <Testimonials />
    </div>
  ),
};
