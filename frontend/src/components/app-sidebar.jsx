'use client';

import * as React from 'react';
import { useUser } from '@clerk/nextjs';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  BuildingIcon,
  BookOpenIcon,
  Settings2Icon,
  FileTextIcon,
  LibraryIcon,
  UsersIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
} from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

// PyqDeck Admin/Editor data structure
const navData = {
  teams: [
    {
      name: 'PyqDeck Admin',
      logo: <GraduationCapIcon />,
      plan: 'Management',
    },
  ],
  navMain: [
    {
      title: 'Overview',
      url: '/studio',
      icon: <LayoutDashboardIcon />,
      isActive: true,
    },
    {
      title: 'Dashboard',
      url: '/studio/dashboard',
      icon: <LayoutDashboardIcon />,
    },
    {
      title: 'Analytics',
      url: '/studio/analytics',
      icon: <LibraryIcon />,
    },
    {
      title: 'Academics',
      url: '/studio/academics',
      icon: <BuildingIcon />,
      items: [
        {
          title: 'Universities',
          url: '/studio/universities',
        },
        {
          title: 'Branches',
          url: '/studio/branches',
        },
      ],
    },
    {
      title: 'Content',
      url: '/studio/content',
      icon: <BookOpenIcon />,
      items: [
        {
          title: 'Subjects',
          url: '/studio/subjects',
        },
        {
          title: 'Papers',
          url: '/studio/papers',
        },
      ],
    },
    {
      title: 'Settings',
      url: '/studio/settings',
      icon: <Settings2Icon />,
      items: [
        {
          title: 'General',
          url: '/studio/settings/general',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Upload Paper',
      url: '/studio/upload',
      icon: <FileTextIcon />,
    },
    {
      name: 'Subject Offerings',
      url: '/studio/subject-offerings',
      icon: <LibraryIcon />,
    },
    {
      name: 'Manage Users',
      url: '/studio/users',
      icon: <UsersIcon />,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user, isLoaded } = useUser();

  const userData = {
    name: user?.fullName || 'Admin User',
    email: user?.primaryEmailAddress?.emailAddress || 'admin@pyqdeck.in',
    avatar: user?.imageUrl || '',
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
        <NavProjects projects={navData.projects} />
      </SidebarContent>
      <SidebarFooter>
        {!isLoaded ? (
          <div className="flex items-center gap-3 p-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="flex flex-col gap-1 overflow-hidden">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ) : (
          <NavUser user={userData} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
