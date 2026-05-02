import { DeleteBranchDialogView } from './delete-branch-dialog.view';
import { fn } from '@storybook/test';

export default {
  title: 'Studio/Academics/DeleteBranchDialog',
  component: DeleteBranchDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const mockBranch = {
  id: 'b1',
  name: 'Computer Engineering',
  universityId: 'u1',
};

export const Default = {
  args: {
    branch: mockBranch,
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
