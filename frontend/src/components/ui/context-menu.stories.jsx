import { fn } from '@storybook/test';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from './context-menu';

const meta = {
  title: 'UI/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onOpenChange: {
      action: 'onOpenChange',
      description:
        'Event handler called when the open state of the context menu changes.',
    },
    modal: {
      control: 'boolean',
      description:
        'The modality of the context menu. When set to true, interaction with outside elements will be disabled and only menu content will be visible to screen readers.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    onOpenChange: fn(),
  },
};

export default meta;

const Template = (args) => (
  <ContextMenu {...args}>
    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
      Right click here
    </ContextMenuTrigger>
    <ContextMenuContent className="w-64">
      <ContextMenuItem inset>
        Back
        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset disabled>
        Forward
        <ContextMenuShortcut>⌘]</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset>
        Reload
        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-48">
          <ContextMenuItem>
            Save Page As...
            <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>Create Shortcut...</ContextMenuItem>
          <ContextMenuItem>Name Window...</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Developer Tools</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuCheckboxItem checked>
        Show Bookmarks Bar
        <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
      </ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
      <ContextMenuSeparator />
      <ContextMenuRadioGroup value="pedro">
        <ContextMenuLabel inset>People</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioItem value="pedro">
          Pedro Duarte
        </ContextMenuRadioItem>
        <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
      </ContextMenuRadioGroup>
    </ContextMenuContent>
  </ContextMenu>
);

export const Default = {
  render: Template,
  args: {},
};

export const Minimal = {
  render: (args) => (
    <ContextMenu {...args}>
      <ContextMenuTrigger className="flex h-[100px] w-[200px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Settings</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Logout</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Destructive = {
  render: (args) => (
    <ContextMenu {...args}>
      <ContextMenuTrigger className="flex h-[100px] w-[200px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          Delete
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
