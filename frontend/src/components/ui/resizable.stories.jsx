import { fn } from '@storybook/test';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './resizable';

const meta = {
  title: 'UI/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The direction of the resizable panels.',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    onLayout: {
      description: 'Callback when the layout changes.',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;

export const Default = {
  args: {
    direction: 'horizontal',
    onLayout: fn(),
  },
  render: (args) => (
    <div className="bg-background h-[400px] w-full max-w-2xl overflow-hidden rounded-lg border">
      <ResizablePanelGroup {...args}>
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="bg-muted/50 flex h-full flex-col p-4">
            <h3 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
              University Branches
            </h3>
            <ul className="space-y-1 text-sm">
              <li className="font-medium">Computer Engineering</li>
              <li className="text-muted-foreground">Information Technology</li>
              <li className="text-muted-foreground">Mechanical Engineering</li>
            </ul>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full flex-col p-6">
            <h2 className="text-2xl font-bold">Computer Engineering</h2>
            <p className="text-muted-foreground mt-2">
              Select a semester to view available papers and subjects.
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const Vertical = {
  args: {
    ...Default.args,
    direction: 'vertical',
  },
  render: (args) => (
    <div className="bg-background h-[400px] w-full max-w-md overflow-hidden rounded-lg border">
      <ResizablePanelGroup {...args}>
        <ResizablePanel defaultSize={25}>
          <div className="bg-muted/50 flex h-full items-center justify-center p-6">
            <span className="font-semibold">Semester 7 Header</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Paper List Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const Complex = {
  args: {
    ...Default.args,
    direction: 'horizontal',
  },
  render: (args) => (
    <div className="bg-background h-[500px] w-full max-w-4xl overflow-hidden rounded-lg border">
      <ResizablePanelGroup {...args}>
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="bg-muted/50 flex h-full flex-col p-4">
            <h3 className="text-muted-foreground mb-4 text-xs font-semibold tracking-wider uppercase">
              Academic Studio
            </h3>
            <nav className="space-y-2 text-sm">
              <div className="bg-primary/10 text-primary rounded-md px-2 py-1.5 font-medium">
                Dashboard
              </div>
              <div className="text-muted-foreground px-2 py-1.5">Branches</div>
              <div className="text-muted-foreground px-2 py-1.5">Papers</div>
              <div className="text-muted-foreground px-2 py-1.5">Settings</div>
            </nav>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={15} minSize={10}>
              <div className="flex h-full items-center border-b px-6">
                <h1 className="text-lg font-semibold">Branch Overview</h1>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={85}>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={70}>
                  <div className="flex h-full flex-col p-6">
                    <h2 className="text-xl font-bold">Mumbai University</h2>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Main content area for academic data visualization and
                      management.
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="rounded-xl border p-4">
                        <div className="text-2xl font-bold">128</div>
                        <div className="text-muted-foreground text-xs">
                          Total Papers
                        </div>
                      </div>
                      <div className="rounded-xl border p-4">
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-muted-foreground text-xs">
                          Active Semesters
                        </div>
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30} minSize={20}>
                  <div className="bg-muted/30 flex h-full flex-col p-4">
                    <h4 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                      Properties
                    </h4>
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="text-muted-foreground">Created</div>
                        <div>24 Oct 2023</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Last Modified
                        </div>
                        <div>15 Jan 2024</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Status</div>
                        <div className="font-medium text-green-600">
                          Published
                        </div>
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
