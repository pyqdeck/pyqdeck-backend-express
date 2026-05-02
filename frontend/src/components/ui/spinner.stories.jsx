import { Spinner } from './spinner';

export default {
  title: 'UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
};

export const Default = {
  render: (args) => <Spinner {...args} />,
};

export const Large = {
  args: {
    className: 'size-8',
  },
};

export const CustomColor = {
  args: {
    className: 'text-primary',
  },
};
