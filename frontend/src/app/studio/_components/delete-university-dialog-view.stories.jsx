import { DeleteUniversityDialogView } from './delete-university-dialog-view';
import { fn } from '@storybook/test';

export default {
  title: 'Studio/Academics/DeleteUniversityDialogView',
  component: DeleteUniversityDialogView,
  tags: ['autodocs'],
  args: {
    open: true,
    onOpenChange: fn(),
    onDelete: fn(),
    university: {
      id: '1',
      name: 'University of Mumbai',
    },
    loading: false,
  },
};

export const Default = {
  args: {},
};

export const Deleting = {
  args: {
    loading: true,
  },
};
