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
      url: '/dashboard/admin',
      icon: <LayoutDashboardIcon />,
      isActive: true,
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard/admin',
        },
        {
          title: 'Analytics',
          url: '/dashboard/admin/analytics',
        },
      ],
    },
    {
      title: 'Academics',
      url: '/dashboard/admin/academics',
      icon: <BuildingIcon />,
      items: [
        {
          title: 'Universities',
          url: '/dashboard/admin/universities',
        },
        {
          title: 'Branches',
          url: '/dashboard/admin/branches',
        },
        {
          title: 'Semesters',
          url: '/dashboard/admin/semesters',
        },
      ],
    },
    {
      title: 'Content',
      url: '/dashboard/admin/content',
      icon: <BookOpenIcon />,
      items: [
        {
          title: 'Subjects',
          url: '/dashboard/admin/subjects',
        },
        {
          title: 'Papers',
          url: '/dashboard/admin/papers',
        },
        {
          title: 'Questions',
          url: '/dashboard/admin/questions',
        },
      ],
    },
    {
      title: 'Settings',
      url: '/dashboard/admin/settings',
      icon: <Settings2Icon />,
      items: [
        {
          title: 'General',
          url: '/dashboard/admin/settings/general',
        },
        {
          title: 'Users & Roles',
          url: '/dashboard/admin/settings/users',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Upload Paper',
      url: '/dashboard/admin/papers/upload',
      icon: <FileTextIcon />,
    },
    {
      name: 'Subject Offerings',
      url: '/dashboard/admin/subject-offerings',
      icon: <LibraryIcon />,
    },
    {
      name: 'Manage Users',
      url: '/dashboard/admin/users',
      icon: <UsersIcon />,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user } = useUser();

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
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
