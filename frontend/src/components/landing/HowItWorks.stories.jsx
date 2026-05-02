import React from 'react';
import { HowItWorks } from './HowItWorks';

export default {
  title: 'Landing/HowItWorks',
  component: HowItWorks,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <div className="bg-background">
      <HowItWorks />
    </div>
  ),
};
