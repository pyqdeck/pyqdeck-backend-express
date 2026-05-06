import { fn } from '@storybook/test';
import {
  BookOpen,
  GraduationCap,
  Info,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs.',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    onValueChange: {
      description: 'Event handler called when the value changes.',
    },
  },
  args: {
    onValueChange: fn(),
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <Tabs defaultValue="overview" {...args} className="w-[600px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="programs">Programs</TabsTrigger>
        <TabsTrigger value="admissions">Admissions</TabsTrigger>
        <TabsTrigger value="research">Research</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4 pt-4">
        <h3 className="text-lg font-medium">University Overview</h3>
        <p className="text-muted-foreground text-sm">
          Our university is a leading institution dedicated to excellence in
          teaching, research, and innovation. Founded in 1950, we have a rich
          history of academic achievement.
        </p>
      </TabsContent>
      <TabsContent value="programs" className="space-y-4 pt-4">
        <h3 className="text-lg font-medium">Academic Programs</h3>
        <p className="text-muted-foreground text-sm">
          We offer a wide range of undergraduate and postgraduate programs
          across various disciplines, including Engineering, Sciences, Arts, and
          Business.
        </p>
      </TabsContent>
      <TabsContent value="admissions" className="space-y-4 pt-4">
        <h3 className="text-lg font-medium">Admissions</h3>
        <p className="text-muted-foreground text-sm">
          Join our diverse community of scholars. Learn about our admission
          requirements, application process, and scholarship opportunities.
        </p>
      </TabsContent>
      <TabsContent value="research" className="space-y-4 pt-4">
        <h3 className="text-lg font-medium">Research & Innovation</h3>
        <p className="text-muted-foreground text-sm">
          Our university is at the forefront of groundbreaking research,
          addressing global challenges and driving technological advancements.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const Line = {
  render: (args) => (
    <Tabs defaultValue="overview" {...args} className="w-[600px]">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="faculty">Faculty</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="events">Events</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-4">
        General overview of the department.
      </TabsContent>
      <TabsContent value="faculty" className="pt-4">
        List of faculty members and their research interests.
      </TabsContent>
      <TabsContent value="students" className="pt-4">
        Student resources and organizations.
      </TabsContent>
      <TabsContent value="events" className="pt-4">
        Upcoming departmental events and seminars.
      </TabsContent>
    </Tabs>
  ),
};

export const Pill = {
  render: (args) => (
    <Tabs defaultValue="all" {...args} className="w-[600px]">
      <TabsList variant="pill">
        <TabsTrigger value="all">All Departments</TabsTrigger>
        <TabsTrigger value="engineering">Engineering</TabsTrigger>
        <TabsTrigger value="science">Science</TabsTrigger>
        <TabsTrigger value="arts">Arts</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="pt-4">
        Showing all university departments.
      </TabsContent>
      <TabsContent value="engineering" className="pt-4">
        Information about the Faculty of Engineering.
      </TabsContent>
    </Tabs>
  ),
};

export const Vertical = {
  render: (args) => (
    <Tabs
      defaultValue="general"
      {...args}
      orientation="vertical"
      className="flex w-[600px] gap-6"
    >
      <TabsList className="min-w-[160px]">
        <TabsTrigger value="general">General Settings</TabsTrigger>
        <TabsTrigger value="academic">Academic Config</TabsTrigger>
        <TabsTrigger value="users">User Management</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent value="general">
          Manage general university settings and branding.
        </TabsContent>
        <TabsContent value="academic">
          Configure semesters, credit systems, and grading scales.
        </TabsContent>
        <TabsContent value="users">
          Administer student, faculty, and staff accounts.
        </TabsContent>
        <TabsContent value="security">
          Update security protocols and access controls.
        </TabsContent>
      </div>
    </Tabs>
  ),
};

export const WithIcons = {
  render: (args) => (
    <Tabs defaultValue="dashboard" {...args} className="w-[600px]">
      <TabsList>
        <TabsTrigger value="dashboard">
          <LayoutDashboard className="size-4" />
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="courses">
          <BookOpen className="size-4" />
          Courses
        </TabsTrigger>
        <TabsTrigger value="students">
          <Users className="size-4" />
          Students
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="size-4" />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard" className="pt-4">
        University analytics and metrics dashboard.
      </TabsContent>
      <TabsContent value="courses" className="pt-4">
        Course catalog and curriculum management.
      </TabsContent>
    </Tabs>
  ),
};

export const MixedIconsAndLabels = {
  render: (args) => (
    <Tabs defaultValue="info" {...args} className="w-[600px]">
      <TabsList variant="line">
        <TabsTrigger value="info">
          <Info className="size-4" />
          Info
        </TabsTrigger>
        <TabsTrigger value="graduates">
          <GraduationCap className="size-4" />
          Graduates
        </TabsTrigger>
        <TabsTrigger value="programs">Programs</TabsTrigger>
      </TabsList>
      <TabsContent value="info" className="pt-4">
        University basic information.
      </TabsContent>
    </Tabs>
  ),
};
