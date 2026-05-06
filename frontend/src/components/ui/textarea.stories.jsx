import { fn } from '@storybook/test';

import { Field, FieldDescription, FieldError, FieldLabel } from './field';
import { Textarea } from './textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description:
        'The placeholder text to display when the textarea is empty.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled.',
      table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the textarea is read-only.',
      table: { defaultValue: { summary: 'false' } },
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'Whether the textarea is in an invalid state.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export default meta;

export const Default = {
  args: {
    placeholder: 'Enter course objectives...',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    placeholder: 'System maintenance in progress...',
    defaultValue:
      'This textarea is currently disabled while the academic records are being updated.',
  },
};

export const ReadOnly = {
  args: {
    readOnly: true,
    defaultValue:
      'The Bachelor of Science in Computer Science (BSCS) focuses on the theoretical foundations of computing and their practical applications.',
  },
};

export const Invalid = {
  args: {
    'aria-invalid': true,
    defaultValue: 'Short text.',
    placeholder: 'Please enter at least 50 characters...',
  },
};

export const WithLabel = {
  render: (args) => (
    <Field>
      <FieldLabel>Research Abstract</FieldLabel>
      <Textarea {...args} />
    </Field>
  ),
  args: {
    placeholder: 'Summarize your research findings and methodology...',
  },
};

export const WithDescription = {
  render: (args) => (
    <Field>
      <FieldLabel>Program Feedback</FieldLabel>
      <Textarea {...args} />
      <FieldDescription>
        Provide constructive feedback about your experience in the engineering
        program.
      </FieldDescription>
    </Field>
  ),
  args: {
    placeholder: 'I found the curriculum to be very comprehensive...',
  },
};

export const WithError = {
  render: (args) => (
    <Field>
      <FieldLabel>Course Syllabus</FieldLabel>
      <Textarea {...args} aria-invalid={true} />
      <FieldError>
        The syllabus content must be provided for all new course proposals.
      </FieldError>
    </Field>
  ),
  args: {
    placeholder: 'Paste the full course syllabus here...',
  },
};
