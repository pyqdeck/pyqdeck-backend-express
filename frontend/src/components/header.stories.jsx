import React from 'react';
import { Header } from './header';
import { ClerkProvider } from '@clerk/nextjs';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ClerkProvider publishableKey="pk_test_Y2xlcmsuY29tJA">
        <div className="min-h-[200px]">
          <Header />
        </div>
      </ClerkProvider>
    ),
  ],
};

export const Default = {
  render: () => <Header />,
};
