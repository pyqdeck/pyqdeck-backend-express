import React from 'react';
import { Features } from './Features';

export default {
  title: 'Landing/Features',
  component: Features,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <div className="bg-background">
      <Features />
    </div>
  ),
};

export const MobileView = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => <Features />,
};
