import { DeleteUniversityDialogView } from './delete-university-dialog-view';
import { fn } from '@storybook/test';

const meta = {
  title: 'Studio/Universities/DeleteUniversityDialog',
  component: DeleteUniversityDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    university: {
      description: 'The university object to be deleted',
      table: {
        type: { summary: 'object' },
      },
    },
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: {
      description: 'Callback called when the open state changes',
    },
    onDelete: {
      description: 'Callback called when the delete action is confirmed',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the delete action is in progress',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;

const mockUniversity = {
  id: 'univ-123',
  name: 'University of Mumbai',
};

export const Default = {
  args: {
    university: mockUniversity,
    open: true,
    onOpenChange: fn(),
    onDelete: fn(),
    loading: false,
  },
};

export const Deleting = {
  args: {
    ...Default.args,
    loading: true,
  },
};
