import { fn } from '@storybook/test';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
} from './sidebar';
import {
  Home,
  BookOpen,
  GraduationCap,
  Search,
  Settings,
  Plus,
  Users,
  FileText,
} from 'lucide-react';

/**
 * The Sidebar component is a complex layout component that provides navigation and actions.
 * It works in conjunction with `SidebarProvider`, `SidebarTrigger`, `SidebarInset`, and other sub-components.
 */
const meta = {
  title: 'UI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right'],
      description: 'The side of the viewport the sidebar is on.',
      table: { defaultValue: { summary: 'left' } },
    },
    variant: {
      control: 'select',
      options: ['sidebar', 'floating', 'inset'],
      description: 'The visual variant of the sidebar.',
      table: { defaultValue: { summary: 'sidebar' } },
    },
    collapsible: {
      control: 'select',
      options: ['offcanvas', 'icon', 'none'],
      description: 'The collapsible behavior of the sidebar.',
      table: { defaultValue: { summary: 'offcanvas' } },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'The default open state of the sidebar.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};

export default meta;

const navigationItems = [
  { title: 'Dashboard', url: '#', icon: Home },
  { title: 'Universities', url: '#', icon: GraduationCap },
  { title: 'Branches', url: '#', icon: BookOpen },
  { title: 'Papers', url: '#', icon: FileText },
  { title: 'Search', url: '#', icon: Search },
];

const adminItems = [
  { title: 'Users', url: '#', icon: Users },
  { title: 'Settings', url: '#', icon: Settings },
];

const Template = (args) => {
  const { defaultOpen, ...sidebarProps } = args;
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-svh w-full">
        <Sidebar {...sidebarProps}>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <Plus className="size-4" />
              </div>
              <span className="font-semibold">PyqDeck</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                Delhi Technological University
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Admin</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <div className="bg-muted flex size-8 items-center justify-center rounded-full">
                    <Users className="size-4" />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xs font-medium">John Doe</span>
                    <span className="text-muted-foreground text-[10px]">
                      Admin
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger onClick={fn()} />
          </header>
          <div className="p-4">
            <h1 className="text-2xl font-bold">Main Content</h1>
            <p className="text-muted-foreground mt-2">
              The sidebar is{' '}
              {args.side === 'right' ? 'to the right' : 'to the left'}. Current
              variant: <strong>{args.variant}</strong>. Collapsible:{' '}
              <strong>{args.collapsible}</strong>.
            </p>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export const Default = {
  render: Template,
  args: {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'offcanvas',
    defaultOpen: true,
  },
};

export const Floating = {
  render: Template,
  args: {
    ...Default.args,
    variant: 'floating',
  },
};

export const Inset = {
  render: Template,
  args: {
    ...Default.args,
    variant: 'inset',
  },
};

export const Collapsed = {
  render: Template,
  args: {
    ...Default.args,
    defaultOpen: false,
    collapsible: 'icon',
  },
};

export const RightSide = {
  render: Template,
  args: {
    ...Default.args,
    side: 'right',
  },
};

export const NoCollapsible = {
  render: Template,
  args: {
    ...Default.args,
    collapsible: 'none',
  },
};
