import { fn } from '@storybook/test';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';

/**
 * A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
 */
const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: {
      control: 'boolean',
      description:
        'The open state of the dialog when it is used as a controlled component.',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description:
        'Event handler called when the open state of the dialog changes.',
      defaultValue: fn(),
    },
    showCloseButton: {
      control: 'boolean',
      description:
        'Whether to show the close button in the top right corner of the content.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'true' },
      },
    },
    showFooterCloseButton: {
      control: 'boolean',
      description: 'Whether to show a "Close" button in the footer.',
      table: {
        category: 'Footer',
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;

const Template = ({ showCloseButton, showFooterCloseButton, ...args }) => (
  <Dialog {...args}>
    <DialogTrigger asChild>
      <Button variant="outline">Edit Profile</Button>
    </DialogTrigger>
    <DialogContent
      className="sm:max-w-[425px]"
      showCloseButton={showCloseButton}
    >
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input
            id="username"
            defaultValue="@peduarte"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter showCloseButton={showFooterCloseButton}>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const Default = {
  render: Template,
  args: {
    showCloseButton: true,
    showFooterCloseButton: false,
    onOpenChange: fn(),
  },
};

export const NoCloseButton = {
  render: Template,
  args: {
    ...Default.args,
    showCloseButton: false,
  },
};

export const WithFooterCloseButton = {
  render: Template,
  args: {
    ...Default.args,
    showFooterCloseButton: true,
  },
};

export const Controlled = {
  render: Template,
  args: {
    ...Default.args,
    open: true,
  },
};
