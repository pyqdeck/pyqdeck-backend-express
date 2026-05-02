import { Checkbox } from './checkbox';
import { Label } from './label';

export default {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export const Default = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
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
      <Label htmlFor="checked">Checked item</Label>
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
      <Label htmlFor="disabled">Disabled option</Label>
    </div>
  ),
};
