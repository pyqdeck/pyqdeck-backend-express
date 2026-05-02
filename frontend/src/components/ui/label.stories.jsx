import { Label } from './label';
import { Input } from './input';

export default {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
};

export const Default = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email" {...args}>
        Email
      </Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};
