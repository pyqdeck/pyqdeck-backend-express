import { AspectRatio } from './aspect-ratio';

const meta = {
  title: 'UI/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'number' },
      description: 'The aspect ratio of the container',
    },
  },
  render: (args) => (
    <div className="w-[450px]">
      <AspectRatio
        {...args}
        className="bg-muted text-muted-foreground flex items-center justify-center overflow-hidden rounded-md border"
      >
        <img
          src="https://raw.githubusercontent.com/hasanraiyan/hasanraiyan/refs/heads/main/portfolio.png"
          alt="Portfolio"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export default meta;

export const Default = {
  args: {
    ratio: 16 / 9,
  },
};

export const Square = {
  args: {
    ratio: 1,
  },
};

export const Classic = {
  args: {
    ratio: 4 / 3,
  },
};
