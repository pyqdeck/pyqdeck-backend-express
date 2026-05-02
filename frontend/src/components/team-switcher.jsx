'use client';

import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { BellIcon } from 'lucide-react';

export function TeamSwitcher({ teams }) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-1">
        <SidebarMenuButton
          size="lg"
          className="cursor-default hover:bg-transparent active:bg-transparent"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            {activeTeam.logo}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-bold">{activeTeam.name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {activeTeam.plan}
            </span>
          </div>
        </SidebarMenuButton>
        <button className="text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mr-2 rounded-lg p-2 transition-colors">
          <BellIcon className="size-5" />
        </button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
