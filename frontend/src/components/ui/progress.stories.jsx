import { Progress } from './progress';

export default {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    value: 33,
  },
  render: (args) => (
    <div className="w-[300px]">
      <Progress {...args} />
    </div>
  ),
};

export const Completed = {
  args: {
    value: 100,
  },
  render: (args) => (
    <div className="w-[300px]">
      <Progress {...args} />
    </div>
  ),
};
