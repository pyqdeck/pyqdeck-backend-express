import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

export default {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export const Default = {
  render: (args) => (
    <Tabs defaultValue="account" {...args} className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="pt-4">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="pt-4">
        Change your password here.
      </TabsContent>
    </Tabs>
  ),
};

export const Line = {
  render: (args) => (
    <Tabs defaultValue="all" {...args} className="w-[400px]">
      <TabsList variant="line">
        <TabsTrigger value="all">All Items</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="pt-4">
        Viewing all items.
      </TabsContent>
    </Tabs>
  ),
};
