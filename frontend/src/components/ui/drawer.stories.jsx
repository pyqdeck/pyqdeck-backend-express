import { fn } from '@storybook/test';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';
import { Button } from './button';

/**
 * A drawer component that slides in from the edge of the screen, powered by `vaul`.
 */
const meta = {
  title: 'UI/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
      description: 'The direction from which the drawer slides in.',
      table: { defaultValue: { summary: 'bottom' } },
    },
    dismissible: {
      control: 'boolean',
      description:
        'Whether the drawer can be dismissed by clicking outside or swiping.',
      table: { defaultValue: { summary: 'true' } },
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Callback fired when the drawer open state changes.',
    },
  },
};

export default meta;

const Template = (args) => (
  <Drawer {...args}>
    <DrawerTrigger asChild>
      <Button variant="outline">View Syllabus Details</Button>
    </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Data Structures and Algorithms</DrawerTitle>
          <DrawerDescription>
            Mumbai University • Computer Engineering • Semester 3
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Course Objectives</h4>
            <p className="text-muted-foreground text-sm">
              To understand the concepts of data structures and their
              applications in programming and problem solving.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Core Modules</h4>
            <ul className="text-muted-foreground list-inside list-disc text-sm">
              <li>Sorting and Searching Algorithms</li>
              <li>Stacks, Queues and Linked Lists</li>
              <li>Trees and Binary Search Trees</li>
              <li>Graph Algorithms and Traversals</li>
            </ul>
          </div>
        </div>
        <DrawerFooter>
          <Button className="w-full">Download Syllabus</Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
);

export const Default = {
  render: Template,
  args: {
    direction: 'bottom',
  },
};

export const Top = {
  render: Template,
  args: {
    direction: 'top',
  },
};

export const Left = {
  render: Template,
  args: {
    direction: 'left',
  },
};

export const Right = {
  render: Template,
  args: {
    direction: 'right',
  },
};

export const NotDismissible = {
  render: Template,
  args: {
    direction: 'bottom',
    dismissible: false,
  },
};
