import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  PopoverDescription,
} from './popover';
import { Button } from './button';
import { Settings } from 'lucide-react';

export default {
  title: 'UI/Popover',
  component: Popover,
  tags: ['autodocs'],
};

export const Default = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-xs">Width</span>
            <div className="bg-muted col-span-2 h-8 rounded" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-xs">Height</span>
            <div className="bg-muted col-span-2 h-8 rounded" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
