import { Progress } from './progress';

export default {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'The progress value.',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the progress bar.',
    },
  },
};

const Template = (args) => (
  <div className="w-[300px]">
    <Progress {...args} />
  </div>
);

export const Default = {
  render: Template,
  args: {
    value: 33,
  },
};

export const HalfWay = {
  render: Template,
  args: {
    value: 50,
  },
};

export const Completed = {
  render: Template,
  args: {
    value: 100,
  },
};

export const Indeterminate = {
  render: Template,
  args: {
    value: null,
  },
};
