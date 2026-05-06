import { Skeleton } from './skeleton';

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the skeleton',
    },
  },
};

export default meta;

export const Default = {
  args: {
    className: 'h-4 w-[250px]',
  },
};

export const Circle = {
  args: {
    className: 'h-12 w-12 rounded-full',
  },
};

export const Profile = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="grid gap-2">
        <Skeleton {...args} className="h-4 w-[200px]" />
        <Skeleton {...args} className="h-4 w-[160px]" />
      </div>
    </div>
  ),
};

export const Card = {
  render: (args) => (
    <div className="grid w-[350px] gap-4 rounded-xl border p-4">
      <Skeleton {...args} className="aspect-video w-full rounded-lg" />
      <div className="grid gap-2">
        <Skeleton {...args} className="h-5 w-2/3" />
        <Skeleton {...args} className="h-4 w-full" />
        <Skeleton {...args} className="h-4 w-5/6" />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <Skeleton className="h-9 w-9 rounded-full" />
        <div className="grid gap-1">
          <Skeleton {...args} className="h-3 w-[100px]" />
          <Skeleton {...args} className="h-3 w-[80px]" />
        </div>
      </div>
    </div>
  ),
};

export const List = {
  render: (args) => (
    <div className="grid w-[400px] gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-start gap-4">
          <Skeleton className="h-10 w-10 shrink-0 rounded-md" />
          <div className="grid flex-1 gap-2 pt-1">
            <div className="flex items-center justify-between">
              <Skeleton {...args} className="h-4 w-[140px]" />
              <Skeleton {...args} className="h-3 w-[60px]" />
            </div>
            <Skeleton {...args} className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  ),
};
