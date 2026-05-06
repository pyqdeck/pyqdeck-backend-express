import { fn } from '@storybook/test';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from './label';

export default {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the radio group is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'The default value of the radio group',
    },
    onValueChange: {
      description: 'Event handler called when the value changes',
    },
  },
  args: {
    onValueChange: fn(),
  },
};

const Template = (args) => (
  <RadioGroup {...args}>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="option-1" id="option-1" />
      <Label htmlFor="option-1">Option One</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="option-2" id="option-2" />
      <Label htmlFor="option-2">Option Two</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="option-3" id="option-3" />
      <Label htmlFor="option-3">Option Three</Label>
    </div>
  </RadioGroup>
);

export const Default = {
  render: Template,
  args: {
    defaultValue: 'option-1',
  },
};

export const Disabled = {
  render: Template,
  args: {
    defaultValue: 'option-1',
    disabled: true,
  },
};

export const SemesterSelection = {
  render: (args) => (
    <RadioGroup {...args}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
        <div key={sem} className="flex items-center space-x-2">
          <RadioGroupItem value={`sem-${sem}`} id={`sem-${sem}`} />
          <Label htmlFor={`sem-${sem}`}>Semester {sem}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
  args: {
    defaultValue: 'sem-1',
  },
};
