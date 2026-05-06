import { fn } from '@storybook/test';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from './input-otp';

/**
 * An accessible and customizable one-time password component.
 */
const meta = {
  title: 'UI/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    maxLength: {
      control: { type: 'number' },
      description: 'The maximum number of characters allowed in the OTP.',
      table: { defaultValue: { summary: '6' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the OTP input is disabled.',
      table: { defaultValue: { summary: 'false' } },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether the OTP input should be auto-focused.',
      table: { defaultValue: { summary: 'false' } },
    },
    inputMode: {
      control: 'select',
      options: ['numeric', 'text', 'tel', 'email', 'url', 'search', 'none'],
      description: 'The input mode of the OTP input.',
      table: { defaultValue: { summary: 'numeric' } },
    },
  },
  args: {
    maxLength: 6,
    disabled: false,
    autoFocus: false,
    onChange: fn(),
    onComplete: fn(),
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const WithSeparator = {
  render: (args) => (
    <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const FourDigits = {
  render: (args) => (
    <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  ),
  args: {
    maxLength: 4,
  },
};

export const Disabled = {
  render: (args) => (
    <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
  args: {
    disabled: true,
  },
};
