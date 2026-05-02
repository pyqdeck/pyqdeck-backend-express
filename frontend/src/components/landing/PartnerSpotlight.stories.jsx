import React from 'react';
import { PartnerSpotlight } from './PartnerSpotlight';

export default {
  title: 'Landing/PartnerSpotlight',
  component: PartnerSpotlight,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <div className="w-[800px]">
      <PartnerSpotlight />
    </div>
  ),
};
