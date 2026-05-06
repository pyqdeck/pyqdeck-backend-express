import { useState } from 'react';
import { DirectionProvider } from './direction';
import { Button } from './button';
import { Input } from './input';

const meta = {
  title: 'UI/Direction',
  component: DirectionProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'The direction of the text',
      table: {
        defaultValue: { summary: 'ltr' },
      },
    },
    direction: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'Explicit direction override',
    },
    children: {
      control: false,
    },
  },
};

export default meta;

const Template = (args) => (
  <DirectionProvider {...args}>
    <div dir={args.dir} className="w-[400px] space-y-4 rounded-lg border p-4">
      <p className="text-sm">
        Current Direction:{' '}
        <span className="font-bold uppercase">{args.dir || 'ltr'}</span>
      </p>
      <div className="flex items-center gap-2">
        <Input placeholder="Enter text..." className="flex-1" />
        <Button>Send</Button>
      </div>
      <p className="text-muted-foreground text-xs">
        Notice how the input and button swap places in RTL mode if using flex or
        logical properties.
      </p>
    </div>
  </DirectionProvider>
);

export const Interactive = {
  render: () => {
    const [dir, setDir] = useState('ltr');

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={() => setDir('ltr')}
            variant={dir === 'ltr' ? 'default' : 'outline'}
          >
            LTR
          </Button>
          <Button
            onClick={() => setDir('rtl')}
            variant={dir === 'rtl' ? 'default' : 'outline'}
          >
            RTL
          </Button>
        </div>

        <DirectionProvider dir={dir}>
          <div dir={dir} className="w-[400px] space-y-4 rounded-lg border p-4">
            <p className="text-sm">
              Current Direction:{' '}
              <span className="font-bold uppercase">{dir}</span>
            </p>
            <div className="flex items-center gap-2">
              <Input placeholder="Enter text..." className="flex-1" />
              <Button>Send</Button>
            </div>
            <p className="text-muted-foreground text-xs">
              Notice how the input and button swap places in RTL mode if using
              flex or logical properties.
            </p>
          </div>
        </DirectionProvider>
      </div>
    );
  },
};

export const LTR = {
  render: Template,
  args: {
    dir: 'ltr',
  },
};

export const RTL = {
  render: Template,
  args: {
    dir: 'rtl',
  },
};
