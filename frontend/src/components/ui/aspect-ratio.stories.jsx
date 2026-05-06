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
      <AspectRatio {...args} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2d6c9fd1eac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Photo by Drew Beamer"
          className="h-full w-full rounded-md object-cover"
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
