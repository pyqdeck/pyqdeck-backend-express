import React from 'react';
import { GoogleIcon } from './icons';

export default {
  title: 'Components/Icons',
  component: GoogleIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Google = {
  args: {
    className: 'size-12 text-[#4285F4]',
  },
};

export const Grid = {
  render: () => (
    <div className="bg-muted/20 grid grid-cols-4 gap-8 rounded-xl border p-8">
      <div className="flex flex-col items-center gap-2">
        <GoogleIcon className="size-8 text-[#4285F4]" />
        <span className="font-mono text-xs">GoogleIcon</span>
      </div>
      {/* Add more icons here as they are added to icons.jsx */}
    </div>
  ),
};
