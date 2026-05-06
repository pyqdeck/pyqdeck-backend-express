import { DeleteSubjectDialogView } from './delete-subject-dialog.view';
import { fn } from '@storybook/test';

/**
 * A dialog to confirm the deletion of a subject from the curriculum.
 * It displays a warning message and lists the consequences of deletion.
 */
const meta = {
  title: 'Studio/Academics/DeleteSubjectDialog',
  component: DeleteSubjectDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    subject: {
      control: 'object',
      description:
        'The subject object containing at least the name for display',
      table: {
        type: { summary: 'object' },
      },
    },
    open: {
      control: 'boolean',
      description: 'Whether the dialog is currently visible',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Event handler called when the dialog open state changes',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    onDelete: {
      action: 'onDelete',
      description: 'Event handler called when the user confirms deletion',
      table: {
        type: { summary: '() => void' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the deletion process is currently ongoing',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;

const mockSubject = {
  id: 'sub_123',
  name: 'Operating Systems & System Programming',
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
