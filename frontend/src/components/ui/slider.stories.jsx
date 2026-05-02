import { Slider } from './slider';

export default {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
  render: (args) => (
    <div className="w-[300px]">
      <Slider {...args} />
    </div>
  ),
};

export const Range = {
  args: {
    defaultValue: [20, 80],
    max: 100,
    step: 1,
  },
  render: (args) => (
    <div className="w-[300px]">
      <Slider {...args} />
    </div>
  ),
};
