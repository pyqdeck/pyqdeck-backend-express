import { fn } from '@storybook/test';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './input-group';
import { Search, Mail, Send, Bell } from 'lucide-react';

/**
 * A flexible input group component that allows combining inputs with icons, buttons, and text addons.
 * Supports both inline and block layouts.
 */
const meta = {
  title: 'UI/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the input group.',
    },
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <InputGroup {...args} className="max-w-sm">
      <InputGroupAddon>
        <Search className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search everything..." />
    </InputGroup>
  ),
};

export const WithIcon = {
  render: (args) => (
    <InputGroup {...args} className="max-w-sm">
      <InputGroupAddon>
        <Mail className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Email address" />
    </InputGroup>
  ),
};

export const WithButton = {
  render: (args) => (
    <InputGroup {...args} className="max-w-sm">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton onClick={fn()}>
          <Search className="size-4" />
          Search
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithPrefixAndSuffix = {
  render: (args) => (
    <InputGroup {...args} className="max-w-sm">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="default" onClick={fn()}>
          <Send className="size-4" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithTextarea = {
  render: (args) => (
    <InputGroup {...args} className="max-w-sm">
      <InputGroupAddon align="block-start">
        <InputGroupText>Message</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Type your message here..." />
      <InputGroupAddon align="block-end">
        <InputGroupButton onClick={fn()}>
          <Send className="size-4" />
          Send Message
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Disabled = {
  render: (args) => (
    <InputGroup {...args} className="max-w-sm">
      <InputGroupAddon>
        <Mail className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Email address" disabled />
    </InputGroup>
  ),
};

export const Invalid = {
  render: (args) => (
    <InputGroup {...args} className="max-w-sm">
      <InputGroupAddon>
        <Bell className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Notifications" aria-invalid="true" />
    </InputGroup>
  ),
};

export const BlockLayout = {
  render: (args) => (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <InputGroup {...args}>
        <InputGroupAddon align="block-start">
          <InputGroupText>Top Label</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="Input with block-start addon" />
      </InputGroup>

      <InputGroup {...args}>
        <InputGroupInput placeholder="Input with block-end addon" />
        <InputGroupAddon align="block-end">
          <InputGroupText>Bottom Helper Text</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup {...args}>
        <InputGroupAddon align="block-start">
          <InputGroupText>Full Layout</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="Everything combined" />
        <InputGroupAddon align="block-end">
          <div className="flex w-full items-center justify-between">
            <InputGroupText>Characters: 0</InputGroupText>
            <InputGroupButton variant="outline" size="xs">
              Action
            </InputGroupButton>
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
