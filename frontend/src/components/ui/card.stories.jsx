import { fn } from '@storybook/test';
import { Settings } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from './card';
import { Button } from './button';

export default {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['default', 'sm'],
      description: 'The size variant of the card.',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
};

export const Default = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Advanced Algorithms</CardTitle>
        <CardDescription>Mumbai University • Semester 7</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            Paper Details
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted/50 rounded-lg p-2">
              <p className="text-muted-foreground text-[10px]">Year</p>
              <p className="font-medium">Dec 2023</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-2">
              <p className="text-muted-foreground text-[10px]">Type</p>
              <p className="font-medium">End Sem</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={fn()}>
          View Syllabus
        </Button>
        <Button onClick={fn()}>Download PDF</Button>
      </CardFooter>
    </Card>
  ),
};

export const Small = {
  args: {
    size: 'sm',
  },
  render: (args) => (
    <Card {...args} className="w-[280px]">
      <CardHeader>
        <CardTitle>Pending Reviews</CardTitle>
        <CardDescription>Academics Team</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">12</p>
        <p className="text-muted-foreground text-xs">+2 from yesterday</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" className="w-full" onClick={fn()}>
          Open Queue
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>System Configuration</CardTitle>
        <CardDescription>
          Manage your global application settings.
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon" className="size-8" onClick={fn()}>
            <Settings className="size-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This card includes an action button in the header area.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={fn()}>
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const WithImage = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <img
        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
        alt="Library"
        className="aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardTitle>Library Resources</CardTitle>
        <CardDescription>Access digital journals and e-books.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          The card automatically adjusts top padding when an image is the first
          child.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full" onClick={fn()}>
          Browse Library
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const NoFooter = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Quick Announcement</CardTitle>
        <CardDescription>Campus closed on Friday</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Due to the upcoming holiday, the campus will remain closed. Online
          classes will proceed as scheduled.
        </p>
      </CardContent>
    </Card>
  ),
};
