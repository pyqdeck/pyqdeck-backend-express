import { Switch } from './switch';
import { Label } from './label';

export default {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['default', 'sm'],
    },
  },
};

export const Default = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const Small = {
  args: {
    size: 'sm',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="small-mode" {...args} />
      <Label htmlFor="small-mode" className="text-xs">
        Small Toggle
      </Label>
    </div>
  ),
};

export const Checked = {
  args: {
    defaultChecked: true,
  },
};
