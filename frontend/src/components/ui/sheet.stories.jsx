import { fn } from '@storybook/test';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';
import { Button } from './button';
import { Item, ItemContent, ItemDescription, ItemTitle } from './item';

/**
 * Extends the Dialog component to display content that complements the main screen content.
 * It is commonly used for navigation, filters, or additional details.
 */
const meta = {
  title: 'UI/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'The edge of the screen where the sheet will appear.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'right' },
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button in the corner.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'true' },
      },
    },
    open: {
      control: 'boolean',
      description: 'The controlled open state of the sheet.',
    },
    onOpenChange: {
      description: 'Event handler called when the open state changes.',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    onOpenChange: fn(),
  },
};

export default meta;

const Template = ({ side, showCloseButton, ...args }) => (
  <Sheet {...args}>
    <SheetTrigger asChild>
      <Button variant="outline">View Branch Details</Button>
    </SheetTrigger>
    <SheetContent side={side} showCloseButton={showCloseButton}>
      <SheetHeader>
        <SheetTitle>Computer Engineering</SheetTitle>
        <SheetDescription>
          Detailed information about the Computer Engineering department and its
          offerings for the current semester.
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-4 p-4">
        <Item>
          <ItemContent>
            <ItemTitle>Department Code</ItemTitle>
            <ItemDescription>CE-2024</ItemDescription>
          </ItemContent>
        </Item>
        <Item>
          <ItemContent>
            <ItemTitle>Head of Department</ItemTitle>
            <ItemDescription>Dr. Sarah Johnson</ItemDescription>
          </ItemContent>
        </Item>
        <Item>
          <ItemContent>
            <ItemTitle>Available Seats</ItemTitle>
            <ItemDescription>120 / 150</ItemDescription>
          </ItemContent>
        </Item>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button variant="outline">Close Details</Button>
        </SheetClose>
        <Button>Edit Branch</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export const Default = {
  render: Template,
  args: {
    side: 'right',
    showCloseButton: true,
  },
};

export const Left = {
  render: Template,
  args: {
    ...Default.args,
    side: 'left',
  },
};

export const Top = {
  render: Template,
  args: {
    ...Default.args,
    side: 'top',
  },
};

export const Bottom = {
  render: Template,
  args: {
    ...Default.args,
    side: 'bottom',
  },
};

export const NoCloseButton = {
  render: Template,
  args: {
    ...Default.args,
    showCloseButton: false,
  },
};

export const Controlled = {
  render: Template,
  args: {
    ...Default.args,
    open: true,
  },
};
