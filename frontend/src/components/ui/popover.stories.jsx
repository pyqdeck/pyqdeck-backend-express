import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  PopoverDescription,
} from './popover';
import { Button } from './button';
import { Filter } from 'lucide-react';
import { Label } from './label';
import { Input } from './input';

/**
 * Displays rich content in a portal, triggered by a button.
 */
const meta = {
  title: 'UI/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description:
        'The preferred alignment against the trigger. May change when collisions occur.',
      table: {
        defaultValue: { summary: 'center' },
      },
    },
    sideOffset: {
      control: { type: 'number' },
      description: 'The distance in pixels from the trigger.',
      table: {
        defaultValue: { summary: '4' },
      },
    },
  },
};

export default meta;

const Template = ({ align, sideOffset, ...args }) => (
  <Popover {...args}>
    <PopoverTrigger asChild>
      <Button variant="outline" size="sm">
        <Filter className="mr-2 h-4 w-4" />
        Filter Exams
      </Button>
    </PopoverTrigger>
    <PopoverContent align={align} sideOffset={sideOffset} className="w-80">
      <PopoverHeader>
        <PopoverTitle>Filter Options</PopoverTitle>
        <PopoverDescription>
          Narrow down the exam list by university and session.
        </PopoverDescription>
      </PopoverHeader>
      <div className="grid gap-4 pt-2">
        <div className="grid gap-2">
          <Label htmlFor="university">University</Label>
          <Input
            id="university"
            placeholder="e.g. Mumbai University"
            className="h-8"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="branch">Branch</Label>
          <Input
            id="branch"
            placeholder="e.g. Computer Engineering"
            className="h-8"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="semester">Semester</Label>
          <Input id="semester" placeholder="e.g. Semester 5" className="h-8" />
        </div>
      </div>
    </PopoverContent>
  </Popover>
);

export const Default = {
  render: Template,
  args: {
    align: 'center',
    sideOffset: 4,
  },
};

export const AlignStart = {
  render: Template,
  args: {
    ...Default.args,
    align: 'start',
  },
};

export const AlignEnd = {
  render: Template,
  args: {
    ...Default.args,
    align: 'end',
  },
};

export const SideOffset = {
  render: Template,
  args: {
    ...Default.args,
    sideOffset: 20,
  },
};
