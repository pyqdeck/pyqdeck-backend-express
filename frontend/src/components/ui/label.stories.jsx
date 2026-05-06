import { Label } from './label';
import { Input } from './input';
import { Checkbox } from './checkbox';

export default {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the label',
    },
    htmlFor: {
      control: 'text',
      description: 'The id of the element the label is associated with',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export const Default = {
  args: {
    children: 'Label Text',
  },
};

export const WithInput = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email" {...args} />
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
  args: {
    children: 'Email Address',
  },
};

export const WithCheckbox = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" {...args} />
    </div>
  ),
  args: {
    children: 'Accept terms and conditions',
  },
};

export const Required = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="username" {...args}>
        {args.children}
        <span className="text-destructive">*</span>
      </Label>
      <Input type="text" id="username" placeholder="Username" required />
    </div>
  ),
  args: {
    children: 'Username',
  },
};

export const Disabled = {
  render: (args) => (
    <div
      className="group grid w-full max-w-sm items-center gap-1.5"
      data-disabled="true"
    >
      <Label htmlFor="disabled-input" {...args} />
      <Input disabled id="disabled-input" placeholder="Disabled input" />
    </div>
  ),
  args: {
    children: 'Disabled Field',
  },
};
