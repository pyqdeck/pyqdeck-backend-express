import React from 'react';
import { Hero } from './Hero';
import { ClerkProvider } from '@clerk/nextjs';

export default {
  title: 'Landing/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ClerkProvider publishableKey="pk_test_Y2xlcmsuY29tJA">
        <Story />
      </ClerkProvider>
    ),
  ],
};

export const Default = {
  render: () => <Hero />,
};
