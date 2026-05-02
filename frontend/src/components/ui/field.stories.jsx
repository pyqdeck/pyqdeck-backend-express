import { Field, FieldDescription, FieldError, FieldLabel } from './field';
import { Input } from './input';

export default {
  title: 'UI/Field',
  component: Field,
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input placeholder="Enter your email" />
      <FieldDescription>We&apos;ll never share your email.</FieldDescription>
    </Field>
  ),
};

export const WithError = {
  render: () => (
    <Field data-invalid="true">
      <FieldLabel>Username</FieldLabel>
      <Input placeholder="Enter username" />
      <FieldError>Username is already taken.</FieldError>
    </Field>
  ),
};

export const Horizontal = {
  render: () => (
    <Field orientation="horizontal" className="items-center">
      <FieldLabel className="w-32">Username</FieldLabel>
      <div className="flex-1">
        <Input placeholder="Enter username" />
      </div>
    </Field>
  ),
};
