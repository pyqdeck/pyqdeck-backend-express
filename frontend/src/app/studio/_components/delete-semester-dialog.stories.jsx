import { DeleteSemesterDialogView } from './delete-semester-dialog.view';
import { fn } from '@storybook/test';

const meta = {
  title: 'Studio/Academics/DeleteSemesterDialog',
  component: DeleteSemesterDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    semester: {
      control: 'object',
      description: 'The semester object to be deleted',
    },
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
      table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
      description:
        'Callback function called when the dialog open state changes',
      action: 'onOpenChange',
    },
    onDelete: {
      description: 'Callback function called when the delete button is clicked',
      action: 'onDelete',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the deletion is in progress',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;

const mockSemester = {
  id: 'sem-4-ce',
  number: 4,
  branchId: 'br-comp-eng',
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
