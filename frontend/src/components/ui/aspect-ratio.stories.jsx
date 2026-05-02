import { AspectRatio } from './aspect-ratio';

export default {
  title: 'UI/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
};

export const Default = {
  render: (args) => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2d6c9fd1eac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Photo by Drew Beamer"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};
