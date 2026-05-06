import { fn } from '@storybook/test';
import { toast } from 'sonner';
import { Toaster } from './sonner';
import { Button } from './button';

/**
 * An opinionated toast component for React.
 */
const meta = {
  title: 'UI/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'The position of the toasts.',
      table: { defaultValue: { summary: 'bottom-right' } },
    },
    expand: {
      control: 'boolean',
      description: 'Whether the toasts should be expanded by default.',
      table: { defaultValue: { summary: 'false' } },
    },
    richColors: {
      control: 'boolean',
      description: 'Whether the toasts should have rich colors.',
      table: { defaultValue: { summary: 'false' } },
    },
    closeButton: {
      control: 'boolean',
      description: 'Whether to show a close button on the toasts.',
      table: { defaultValue: { summary: 'false' } },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: 'The theme of the toasts.',
      table: { defaultValue: { summary: 'system' } },
    },
  },
};

export default meta;

const Template = (args) => (
  <div>
    <Toaster {...args} />
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast('New announcement available', {
            description:
              'The schedule for the End Semester Exam has been posted.',
          })
        }
      >
        Default Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success('Branch created', {
            description:
              "Branch 'Computer Engineering' has been successfully added.",
          })
        }
      >
        Success Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error('Upload failed', {
            description: 'Could not upload the Paper PDF. Please try again.',
          })
        }
      >
        Error Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info('System update', {
            description: 'The system will be down for maintenance at 12:00 AM.',
          })
        }
      >
        Info Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning('Unsaved changes', {
            description:
              'You have unsaved changes in the Semester configuration.',
          })
        }
      >
        Warning Toast
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          const promise = new Promise((resolve) =>
            setTimeout(() => resolve({ name: 'Mathematics-II' }), 2000)
          );

          toast.promise(promise, {
            loading: 'Updating Subject...',
            success: (data) => `${data.name} has been updated.`,
            error: 'Error updating Subject.',
          });
        }}
      >
        Promise Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast('Paper deleted', {
            description: 'The Paper has been moved to trash.',
            action: {
              label: 'Undo',
              onClick: fn(),
            },
          })
        }
      >
        Toast with Action
      </Button>
    </div>
  </div>
);

export const Default = {
  render: Template,
  args: {
    position: 'bottom-right',
  },
};

export const RichColors = {
  render: Template,
  args: {
    ...Default.args,
    richColors: true,
  },
};

export const CloseButton = {
  render: Template,
  args: {
    ...Default.args,
    closeButton: true,
  },
};

export const TopCenter = {
  render: Template,
  args: {
    ...Default.args,
    position: 'top-center',
  },
};

export const Expanded = {
  render: Template,
  args: {
    ...Default.args,
    expand: true,
  },
};
