import React from 'react';
import { FinalCTA } from './FinalCTA';

export default {
  title: 'Landing/FinalCTA',
  component: FinalCTA,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <div className="bg-background">
      <FinalCTA />
    </div>
  ),
};
