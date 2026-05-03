import { DeleteSemesterDialogView } from './delete-semester-dialog.view';
import { fn } from '@storybook/test';

export default {
  title: 'Studio/Academics/DeleteSemesterDialog',
  component: DeleteSemesterDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const mockSemester = {
  id: 'sem1',
  number: 4,
  branchId: 'b1',
};

export const Default = {
  args: {
    semester: mockSemester,
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
