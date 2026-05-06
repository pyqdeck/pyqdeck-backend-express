import { fn } from '@storybook/test';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './collapsible';
import { Button } from './button';
import { ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * An interactive component which can be expanded or collapsed.
 */
const meta = {
  title: 'UI/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The open state of the collapsible when it is controlled.',
    },
    defaultOpen: {
      control: 'boolean',
      description:
        'The open state of the collapsible when it is initially rendered. Use when you do not need to control its open state.',
    },
    onOpenChange: {
      description:
        'Event handler called when the open state of the collapsible changes.',
    },
    disabled: {
      control: 'boolean',
      description:
        'When true, prevents the user from interacting with the collapsible.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    onOpenChange: fn(),
  },
};

export default meta;

const Template = (args) => (
  <Collapsible
    {...args}
    className={cn('w-[350px] space-y-2', args.className)}
  >
    <div className="flex items-center justify-between space-x-4 px-4">
      <h4 className="text-sm font-semibold">
        Syllabus: Data Structures & Algorithms
      </h4>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 p-0">
          <ChevronsUpDown className="h-4 w-4" />
          <span className="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
    </div>
    <div className="rounded-md border px-4 py-3 font-mono text-sm">
      Module 1: Introduction to Algorithms
    </div>
    <CollapsibleContent className="space-y-2">
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        Module 2: Linked Lists
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        Module 3: Stacks and Queues
      </div>
    </CollapsibleContent>
  </Collapsible>
);

export const Default = {
  render: Template,
  args: {},
};

export const Open = {
  render: Template,
  args: {
    defaultOpen: true,
  },
};

export const Disabled = {
  render: Template,
  args: {
    disabled: true,
  },
};
