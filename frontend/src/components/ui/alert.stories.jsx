import { Alert, AlertTitle, AlertDescription, AlertAction } from './alert';
import { Terminal, AlertCircle } from 'lucide-react';
import { Button } from './button';

export default {
  title: 'UI/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive'],
    },
  },
};

export const Default = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert {...args}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive = {
  args: {
    variant: 'destructive',
  },
  render: (args) => (
    <Alert {...args}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

export const WithAction = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert {...args}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>
        A new version of the software is available. Please update now.
      </AlertDescription>
      <AlertAction>
        <Button variant="outline" size="sm">
          Update
        </Button>
      </AlertAction>
    </Alert>
  ),
};
