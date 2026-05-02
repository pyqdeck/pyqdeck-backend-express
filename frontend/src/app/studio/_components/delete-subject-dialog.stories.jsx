import { DeleteSubjectDialogView } from './delete-subject-dialog.view';
import { fn } from '@storybook/test';

export default {
  title: 'Studio/Academics/DeleteSubjectDialog',
  component: DeleteSubjectDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const mockSubject = {
  id: 's1',
  name: 'Data Structures and Algorithms',
};

export const Default = {
  args: {
    subject: mockSubject,
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
