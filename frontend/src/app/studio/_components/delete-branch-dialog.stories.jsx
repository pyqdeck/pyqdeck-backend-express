import { DeleteBranchDialogView } from './delete-branch-dialog.view';
import { fn } from '@storybook/test';

const meta = {
  title: 'Studio/Academics/DeleteBranchDialog',
  component: DeleteBranchDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    branch: {
      control: 'object',
      description: 'The branch object to be deleted',
    },
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
      table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
      description:
        'Callback function called when the dialog open state changes',
    },
    onDelete: {
      description:
        'Callback function called when the delete action is confirmed',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the delete action is in progress',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    onOpenChange: fn(),
    onDelete: fn(),
  },
};

export default meta;

const mockBranch = {
  id: 'b1',
  name: 'Computer Engineering',
  universityId: 'u1',
};

export const Default = {
  args: {
    branch: mockBranch,
    open: true,
    loading: false,
  },
};

export const Deleting = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Closed = {
  args: {
    ...Default.args,
    open: false,
  },
};

export const MissingData = {
  args: {
    ...Default.args,
    branch: null,
  },
};
