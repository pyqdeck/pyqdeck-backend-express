import React from 'react';
import { Footer } from './Footer';

export default {
  title: 'Landing/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <div className="bg-background">
      <Footer />
    </div>
  ),
};
