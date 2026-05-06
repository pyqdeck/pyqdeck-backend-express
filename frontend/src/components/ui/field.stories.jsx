import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldSeparator,
  FieldContent,
  FieldTitle,
} from './field';
import { Input } from './input';

/**
 * A flexible field component for forms, supporting various layouts and sub-components.
 */
export default {
  title: 'UI/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal', 'responsive'],
      description: 'Layout orientation of the field',
      table: { defaultValue: { summary: 'vertical' } },
    },
  },
};

const Template = (args) => (
  <Field {...args}>
    <FieldLabel>University Email</FieldLabel>
    <Input placeholder="admin@university.edu" />
    <FieldDescription>
      Use your official university email address.
    </FieldDescription>
    <FieldError />
  </Field>
);

export const Default = {
  render: Template,
  args: {
    orientation: 'vertical',
  },
};

export const WithError = {
  render: (args) => (
    <Field {...args} data-invalid="true">
      <FieldLabel>University ID</FieldLabel>
      <Input defaultValue="invalid-id" />
      <FieldError>
        Please enter a valid university ID (e.g., UNIT-12345).
      </FieldError>
    </Field>
  ),
  args: {
    orientation: 'vertical',
  },
};

export const Horizontal = {
  render: (args) => (
    <Field {...args} className="items-center">
      <FieldLabel className="w-48">Department Name</FieldLabel>
      <div className="flex-1">
        <Input placeholder="e.g., Computer Science" />
      </div>
    </Field>
  ),
  args: {
    orientation: 'horizontal',
  },
};

export const Responsive = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel className="w-48">Branch Code</FieldLabel>
      <div className="flex-1">
        <Input placeholder="e.g., CSE" />
      </div>
    </Field>
  ),
  args: {
    orientation: 'responsive',
  },
};

export const Field_Set = {
  render: () => (
    <FieldSet>
      <FieldLegend>Academic Information</FieldLegend>
      <Field>
        <FieldLabel>University</FieldLabel>
        <Input placeholder="Enter university name" />
      </Field>
      <Field>
        <FieldLabel>Branch</FieldLabel>
        <Input placeholder="Enter branch name" />
      </Field>
    </FieldSet>
  ),
};

export const Field_Group = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel>First Name</FieldLabel>
        <Input placeholder="John" />
      </Field>
      <FieldSeparator>Optional Information</FieldSeparator>
      <Field>
        <FieldLabel>Middle Name</FieldLabel>
        <Input placeholder="Quincy" />
      </Field>
      <FieldSeparator />
      <Field>
        <FieldLabel>Last Name</FieldLabel>
        <Input placeholder="Doe" />
      </Field>
    </FieldGroup>
  ),
};

export const Field_Content = {
  render: () => (
    <Field>
      <FieldTitle>Privacy Settings</FieldTitle>
      <FieldContent>
        <div className="flex items-center gap-2">
          <Input type="checkbox" className="h-4 w-4" />
          <span className="text-sm">Make profile public</span>
        </div>
        <FieldDescription>
          Your profile will be visible to all students and faculty.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const MultiError = {
  render: (args) => (
    <Field {...args} data-invalid="true">
      <FieldLabel>Password</FieldLabel>
      <Input type="password" defaultValue="123" />
      <FieldError
        errors={[
          { message: 'Password must be at least 8 characters long.' },
          { message: 'Password must contain at least one uppercase letter.' },
          { message: 'Password must contain at least one special character.' },
        ]}
      />
    </Field>
  ),
  args: {
    orientation: 'vertical',
  },
};
