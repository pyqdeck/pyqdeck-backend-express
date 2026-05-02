import { DirectionProvider } from './direction';
import { Button } from './button';
import { Input } from './input';
import * as React from 'react';

export default {
  title: 'UI/Direction',
  component: DirectionProvider,
  tags: ['autodocs'],
};

export const Default = {
  render: () => {
    const [dir, setDir] = React.useState('ltr');

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={() => setDir('ltr')}
            variant={dir === 'ltr' ? 'primary' : 'outline'}
          >
            LTR
          </Button>
          <Button
            onClick={() => setDir('rtl')}
            variant={dir === 'rtl' ? 'primary' : 'outline'}
          >
            RTL
          </Button>
        </div>

        <DirectionProvider dir={dir}>
          <div dir={dir} className="space-y-4 rounded-lg border p-4">
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
