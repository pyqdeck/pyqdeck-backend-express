import { Separator } from './separator';

const meta = {
  title: 'UI/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator.',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    decorative: {
      control: 'boolean',
      description:
        'Whether the component is purely decorative and should be ignored by assistive technology.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;

const Template = (args) => (
  <div className="w-full max-w-md">
    <div className="space-y-1">
      <h4 className="text-sm leading-none font-medium">
        Anna University, Chennai
      </h4>
      <p className="text-muted-foreground text-sm">
        A premier technical university in Tamil Nadu, India.
      </p>
    </div>
    <Separator className="my-4" {...args} />
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Branches</div>
      <Separator orientation="vertical" />
      <div>Semesters</div>
      <Separator orientation="vertical" />
      <div>Papers</div>
    </div>
  </div>
);

export const Default = {
  render: Template,
  args: {
    orientation: 'horizontal',
  },
};

export const Vertical = {
  render: (args) => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Computer Science</div>
      <Separator {...args} />
      <div>Information Technology</div>
      <Separator {...args} />
      <div>Electronics</div>
    </div>
  ),
  args: {
    orientation: 'vertical',
  },
};

export const Decorative = {
  render: Template,
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
};
