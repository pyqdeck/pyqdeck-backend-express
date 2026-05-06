import { fn } from '@storybook/test';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './command';
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  GraduationCap,
  BookOpen,
  School,
  Search,
} from 'lucide-react';

const meta = {
  title: 'UI/Command',
  component: Command,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the command menu',
    },
    shouldFilter: {
      control: 'boolean',
      description:
        'Whether the menu should filter items based on the search query',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    onSelect: fn(),
  },
};

export default meta;

const CommandDemo = (args) => (
  <Command {...args} className="rounded-xl border shadow-md">
    <CommandInput placeholder="Search for universities, branches, or subjects..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Universities">
        <CommandItem onSelect={args.onSelect}>
          <School />
          <span>University of Mumbai</span>
        </CommandItem>
        <CommandItem onSelect={args.onSelect}>
          <School />
          <span>Pune University</span>
        </CommandItem>
        <CommandItem onSelect={args.onSelect}>
          <School />
          <span>Delhi University</span>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Branches">
        <CommandItem onSelect={args.onSelect}>
          <GraduationCap />
          <span>Computer Engineering</span>
        </CommandItem>
        <CommandItem onSelect={args.onSelect}>
          <GraduationCap />
          <span>Information Technology</span>
        </CommandItem>
        <CommandItem onSelect={args.onSelect}>
          <GraduationCap />
          <span>Mechanical Engineering</span>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Quick Actions">
        <CommandItem onSelect={args.onSelect}>
          <User />
          <span>View Profile</span>
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem onSelect={args.onSelect}>
          <Settings />
          <span>Settings</span>
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
);

export const Default = {
  render: (args) => (
    <div className="max-w-[450px]">
      <CommandDemo {...args} />
    </div>
  ),
};

export const WithDialog = {
  render: (args) => {
    return (
      <CommandDialog open={true} {...args}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={args.onSelect}>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem onSelect={args.onSelect}>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem onSelect={args.onSelect}>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={args.onSelect}>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={args.onSelect}>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={args.onSelect}>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    );
  },
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Command Palette',
    description: 'Search for a command to run...',
  },
};

export const WithShortcuts = {
  render: (args) => (
    <div className="max-w-[450px]">
      <Command {...args} className="rounded-xl border shadow-md">
        <CommandInput placeholder="Search actions..." />
        <CommandList>
          <CommandGroup heading="System">
            <CommandItem onSelect={args.onSelect}>
              <Search />
              <span>Search Files</span>
              <CommandShortcut>⌘F</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={args.onSelect}>
              <BookOpen />
              <span>Open Docs</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};
