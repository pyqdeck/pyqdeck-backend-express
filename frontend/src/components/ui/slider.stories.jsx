import { fn } from '@storybook/test';
import { Slider } from './slider';

export default {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: {
    onValueChange: fn(),
    onValueCommit: fn(),
  },
  argTypes: {
    defaultValue: {
      control: 'object',
      description: 'The default value of the slider when it is first rendered.',
    },
    value: {
      control: 'object',
      description: 'The controlled value of the slider.',
    },
    min: {
      control: { type: 'number' },
      description: 'The minimum value of the slider.',
      table: { defaultValue: { summary: '0' } },
    },
    max: {
      control: { type: 'number' },
      description: 'The maximum value of the slider.',
      table: { defaultValue: { summary: '100' } },
    },
    step: {
      control: { type: 'number' },
      description: 'The step value of the slider.',
      table: { defaultValue: { summary: '1' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled.',
      table: { defaultValue: { summary: 'false' } },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the slider.',
      table: { defaultValue: { summary: 'horizontal' } },
    },
  },
};

const Template = (args) => (
  <div className="w-[300px]">
    <Slider {...args} />
  </div>
);

export const Default = {
  render: Template,
  args: {
    defaultValue: [50],
  },
};

export const Range = {
  render: Template,
  args: {
    defaultValue: [25, 75],
  },
};

export const Vertical = {
  render: (args) => (
    <div className="h-[300px]">
      <Slider {...args} />
    </div>
  ),
  args: {
    defaultValue: [50],
    orientation: 'vertical',
  },
};

export const Disabled = {
  render: Template,
  args: {
    defaultValue: [50],
    disabled: true,
  },
};

export const CustomStep = {
  render: Template,
  args: {
    defaultValue: [20],
    step: 10,
    min: 0,
    max: 100,
  },
};
