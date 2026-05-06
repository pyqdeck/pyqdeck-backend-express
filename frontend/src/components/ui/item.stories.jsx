import { fn } from '@storybook/test';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemGroup,
  ItemSeparator,
  ItemHeader,
  ItemFooter,
} from './item';
import {
  User,
  Settings,
  ChevronRight,
  Mail,
  Bell,
  ExternalLink,
} from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

/**
 * A flexible item component used for lists, menus, and data displays.
 */
const meta = {
  title: 'UI/Item',
  component: Item,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'muted'],
      description: 'The visual style of the item.',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'xs'],
      description: 'The size of the item.',
      table: { defaultValue: { summary: 'default' } },
    },
    asChild: {
      control: false,
    },
  },
  args: {
    variant: 'default',
    size: 'default',
  },
};

export default meta;

const Template = (args) => (
  <Item {...args} className={cn('max-w-md', args.className)}>
    <ItemMedia variant="icon">
      <User />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>University of Mumbai</ItemTitle>
      <ItemDescription>
        Established in 1857, one of the oldest universities in India.
      </ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button variant="ghost" size="icon-sm" onClick={fn()}>
        <ChevronRight />
      </Button>
    </ItemActions>
  </Item>
);

export const Default = {
  render: Template,
  args: {},
};

export const Outline = {
  render: Template,
  args: {
    variant: 'outline',
  },
};

export const Muted = {
  render: Template,
  args: {
    variant: 'muted',
  },
};

export const Small = {
  render: Template,
  args: {
    size: 'sm',
  },
};

export const ExtraSmall = {
  render: Template,
  args: {
    size: 'xs',
  },
};

export const WithImage = {
  render: (args) => (
    <Item {...args} className="max-w-md">
      <ItemMedia variant="image">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=100&h=100&auto=format&fit=crop"
          alt="University Campus"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>IIT Bombay</ItemTitle>
        <ItemDescription>
          Premier engineering institute located in Powai, Mumbai.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const Complex = {
  render: (args) => (
    <Item {...args} className="max-w-md flex-col items-stretch p-4">
      <ItemHeader>
        <div className="flex items-center gap-2">
          <ItemMedia variant="icon">
            <Bell className="size-4" />
          </ItemMedia>
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Notification
          </span>
        </div>
        <span className="text-muted-foreground text-xs">2 hours ago</span>
      </ItemHeader>

      <div className="flex items-start gap-3 py-3">
        <ItemContent>
          <ItemTitle className="text-base">New Paper Uploaded</ItemTitle>
          <ItemDescription className="line-clamp-3">
            A new question paper for &quot;Digital Signal Processing&quot; (Sem
            5) has been uploaded for Mumbai University. Please review and
            approve.
          </ItemDescription>
        </ItemContent>
      </div>

      <ItemFooter>
        <div className="flex gap-2">
          <Button size="sm">Approve</Button>
          <Button size="sm" variant="outline">
            Reject
          </Button>
        </div>
        <Button size="icon-sm" variant="ghost">
          <ExternalLink />
        </Button>
      </ItemFooter>
    </Item>
  ),
};

export const Group = {
  render: () => (
    <ItemGroup className="max-w-md">
      <Item>
        <ItemMedia variant="icon">
          <Mail />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Messages</ItemTitle>
          <ItemDescription>You have 3 unread messages.</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia variant="icon">
          <Settings />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Settings</ItemTitle>
          <ItemDescription>Manage your account preferences.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};
