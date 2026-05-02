import React from 'react';
import { Stats } from './Stats';

export default {
  title: 'Landing/Stats',
  component: Stats,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <div className="bg-background py-20">
      <Stats />
    </div>
  ),
};

export const DarkMode = {
  parameters: {
    themes: {
      default: 'dark',
    },
  },
  render: () => (
    <div className="bg-background dark py-20">
      <Stats />
    </div>
  ),
};
