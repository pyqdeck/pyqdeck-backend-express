import { fn } from '@storybook/test';
import { Switch } from './switch';
import { Label } from './label';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The text label for the switch',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm'],
      description: 'The size of the switch',
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
      table: { defaultValue: { summary: 'false' } },
    },
    checked: {
      control: 'boolean',
      description: 'The controlled checked state of the switch',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'The default checked state when initially rendered',
    },
    onCheckedChange: {
      description: 'Event handler called when the checked state changes',
    },
  },
  args: {
    onCheckedChange: fn(),
  },
};

export default meta;

const Template = (args) => {
  const id = `switch-${args.size || 'default'}-${args.disabled ? 'disabled' : 'enabled'}`;
  return (
    <div className="flex items-center space-x-2">
      <Switch id={id} {...args} />
      <Label htmlFor={id} className={args.size === 'sm' ? 'text-xs' : ''}>
        {args.label || 'Switch'}
      </Label>
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    label: 'Show Semester Results',
  },
};

export const Small = {
  render: Template,
  args: {
    size: 'sm',
    label: 'Compact View',
  },
};

export const Checked = {
  render: Template,
  args: {
    label: 'Notifications Enabled',
    defaultChecked: true,
  },
};

export const Disabled = {
  render: Template,
  args: {
    label: 'Automatic Enrollment',
    disabled: true,
  },
};

export const DisabledChecked = {
  render: Template,
  args: {
    label: 'Required Course',
    disabled: true,
    defaultChecked: true,
  },
};
