import { fn } from '@storybook/test';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from './menubar';

/**
 * A horizontal menu bar typically visible at the top of an application, contains buttons that open menus.
 */
const meta = {
  title: 'UI/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the menubar.',
    },
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={fn()}>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={fn()}>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled onSelect={fn()}>
            New Incognito Window
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onSelect={fn()}>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onSelect={fn()}>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={fn()}>Undo</MenubarItem>
          <MenubarItem onSelect={fn()}>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  args: {},
};

export const Complex = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>Academics</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={fn()}>
            New Branch <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={fn()}>
            Import CSV <MenubarShortcut>⌘I</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Syllabus</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onSelect={fn()}>View All</MenubarItem>
              <MenubarItem onSelect={fn()}>Export PDF</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem variant="destructive" onSelect={fn()}>
            Delete All Data
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem onSelect={fn()}>
            Show Sidebar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem checked onSelect={fn()}>
            Show Analytics
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset onSelect={fn()}>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="admin">
            <MenubarLabel inset>Role</MenubarLabel>
            <MenubarSeparator />
            <MenubarRadioItem value="admin" onSelect={fn()}>
              Admin
            </MenubarRadioItem>
            <MenubarRadioItem value="moderator" onSelect={fn()}>
              Moderator
            </MenubarRadioItem>
            <MenubarRadioItem value="student" onSelect={fn()}>
              Student
            </MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  args: {
    className: 'w-fit',
  },
};
