import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './resizable';

export default {
  title: 'UI/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
};

export const Default = {
  render: (args) => (
    <div className="h-[400px] w-[600px] rounded-lg border">
      <ResizablePanelGroup direction="horizontal" {...args}>
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Header</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Content</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
