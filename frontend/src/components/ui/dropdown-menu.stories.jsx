import { fn } from '@storybook/test';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import {
  School,
  GitBranch,
  Calendar,
  BookOpen,
  UserPlus,
  Mail,
  MessageSquare,
  PlusCircle,
  Plus,
  LifeBuoy,
  Cloud,
  Trash2,
  Users,
} from 'lucide-react';

const meta = {
  title: 'UI/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The open state of the dropdown menu',
      table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
      description: 'Event handler called when the open state changes',
      table: { category: 'Events' },
    },
    modal: {
      control: 'boolean',
      description: 'Whether the dropdown menu should be modal',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    onOpenChange: fn(),
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const Template = (args) => (
  <DropdownMenu {...args}>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Open Menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Manage Academics</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <School className="size-4" />
          <span>University Settings</span>
          <DropdownMenuShortcut>⇧⌘U</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <GitBranch className="size-4" />
          <span>Branch Management</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Calendar className="size-4" />
          <span>Semester Config</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <BookOpen className="size-4" />
          <span>Subject Offerings</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserPlus className="size-4" />
            <span>Invite Faculty</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Mail className="size-4" />
                <span>Email Invitation</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="size-4" />
                <span>SMS Invitation</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className="size-4" />
                <span>More Options...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <Plus className="size-4" />
          <span>New Course</span>
          <DropdownMenuShortcut>⌘+N</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LifeBuoy className="size-4" />
        <span>System Support</span>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        <Cloud className="size-4" />
        <span>AI Analytics</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">
        <Trash2 className="size-4" />
        <span>Delete Records</span>
        <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const Default = {
  render: Template,
  args: {},
};

export const RadioGroup = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Switch Context</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Scope Level</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="university">
          <DropdownMenuRadioItem value="university">
            University Level
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="branch">
            Branch Level
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="semester">
            Semester Level
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  args: {},
};

export const Checkboxes = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Display Settings</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>View Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          Show Completed Semesters
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          Show Inactive Branches
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>
          Show Faculty Avatars
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem disabled>
          Include Analytics Data
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  args: {},
};
