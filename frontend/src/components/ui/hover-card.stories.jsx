import { fn } from '@storybook/test';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
import { Button } from './button';
import { CalendarDays } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

/**
 * A hover card allows users to preview content when hovering over an element.
 */
const meta = {
  title: 'UI/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    openDelay: {
      control: { type: 'number' },
      description:
        'The duration from when the mouse enters the trigger until the hover card opens.',
      table: { defaultValue: { summary: '700' } },
    },
    closeDelay: {
      control: { type: 'number' },
      description:
        'The duration from when the mouse leaves the trigger or content until the hover card closes.',
      table: { defaultValue: { summary: '300' } },
    },
    onOpenChange: {
      description:
        'Event handler called when the open state of the hover card changes.',
    },
  },
  args: {
    onOpenChange: fn(),
  },
};

export default meta;

const Template = (args) => (
  <HoverCard {...args}>
    <HoverCardTrigger asChild>
      <Button variant="link">@nextjs</Button>
    </HoverCardTrigger>
    <HoverCardContent className="w-80">
      <div className="flex justify-between space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/vercel.png" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@nextjs</h4>
          <p className="text-sm">
            The React Framework – created and maintained by @vercel.
          </p>
          <div className="flex items-center pt-2">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
            <span className="text-muted-foreground text-xs">
              Joined December 2021
            </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export const Default = {
  render: Template,
  args: {},
};

export const Instant = {
  render: Template,
  args: {
    openDelay: 0,
  },
};

export const BottomAligned = {
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <Button variant="outline">Hover me (Bottom Aligned)</Button>
      </HoverCardTrigger>
      <HoverCardContent side="bottom" align="start" className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@shadcn</h4>
            <p className="text-sm">
              Beautifully designed components built with Radix UI and Tailwind
              CSS.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-muted-foreground text-xs">
                Joined January 2023
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  args: {
    openDelay: 100,
  },
};
