import { fn } from '@storybook/test';
import { Checkbox } from './checkbox';
import { Label } from './label';

export default {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The controlled checked state of the checkbox',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'The default checked state of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description:
        'When true, prevents the user from interacting with the checkbox',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description:
        'When true, indicates that the user must check the checkbox before the owning form can be submitted',
      table: { defaultValue: { summary: 'false' } },
    },
    onCheckedChange: {
      description:
        'Event handler called when the checked state of the checkbox changes',
      action: 'checked change',
    },
  },
  args: {
    onCheckedChange: fn(),
  },
};

export const Default = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">
        I accept the university&apos;s terms of service
      </Label>
    </div>
  ),
};

export const Checked = {
  args: {
    defaultChecked: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" {...args} />
      <Label htmlFor="checked">Mark paper as reviewed</Label>
    </div>
  ),
};

export const Indeterminate = {
  args: {
    checked: 'indeterminate',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="indeterminate" {...args} />
      <Label htmlFor="indeterminate">Select all modules</Label>
    </div>
  ),
};

export const Disabled = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled" {...args} />
      <Label htmlFor="disabled">This option is currently unavailable</Label>
    </div>
  ),
};

export const Required = {
  args: {
    required: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="required" {...args} />
      <Label htmlFor="required">
        Agree to privacy policy <span className="text-destructive">*</span>
      </Label>
    </div>
  ),
};
