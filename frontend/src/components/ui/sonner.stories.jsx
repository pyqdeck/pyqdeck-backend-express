import { Toaster } from './sonner';
import { toast } from 'sonner';
import { Button } from './button';
import * as React from 'react';

export default {
  title: 'UI/Sonner',
  component: Toaster,
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <div>
      <Toaster />
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast('Event has been created', {
              description: 'Sunday, December 03, 2023 at 9:00 AM',
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
            })
          }
        >
          Show Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success('Action successful!')}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error('Something went wrong.')}
        >
          Error
        </Button>
      </div>
    </div>
  ),
};
