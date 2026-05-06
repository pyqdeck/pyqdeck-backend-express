import { fn } from '@storybook/test';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { Button } from './button';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The open state of the tooltip when it is controlled.',
      table: {
        category: 'State',
      },
    },
    defaultOpen: {
      control: 'boolean',
      description:
        'The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state.',
      table: {
        category: 'State',
      },
    },
    onOpenChange: {
      description:
        'Event handler called when the open state of the tooltip changes.',
      table: {
        category: 'Events',
      },
    },
    delayDuration: {
      control: { type: 'number' },
      description:
        'The duration from when the mouse enters a tooltip trigger until the tooltip opens.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '700' },
      },
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The preferred side of the trigger to render against.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'top' },
      },
    },
    sideOffset: {
      control: 'number',
      description: 'The distance in pixels from the trigger.',
      table: {
        category: 'Content',
        defaultValue: { summary: '0' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'The preferred alignment against the trigger.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'center' },
      },
    },
  },
  args: {
    onOpenChange: fn(),
  },
};

export default meta;

export const Default = {
  render: ({ side, sideOffset, align, ...args }) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">
          <Info className="mr-2 size-4" />
          University Info
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side} sideOffset={sideOffset} align={align}>
        <p>View detailed information about Mumbai University</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Sides = {
  render: ({ side, sideOffset, align, ...args }) => (
    <div className="flex flex-wrap gap-2">
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Computer Engineering Branch</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Information Technology Branch</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Mechanical Engineering Branch</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Civil Engineering Branch</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const Offset = {
  render: ({ side, sideOffset: _sideOffset, align, ...args }) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">Offset Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={20}>
        <p>Custom offset for branch details</p>
      </TooltipContent>
    </Tooltip>
  ),
};
