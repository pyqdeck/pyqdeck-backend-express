import { fn } from '@storybook/test';
import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from './native-select';

const meta = {
  title: 'UI/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: 'The size of the select.',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    onChange: fn(),
  },
};

/**
 * A primitive select component using native HTML select element.
 */
export default meta;

const Template = (args) => (
  <NativeSelect {...args} className="w-[240px]">
    <NativeSelectOption value="computer-engineering">
      Computer Engineering
    </NativeSelectOption>
    <NativeSelectOption value="information-technology">
      Information Technology
    </NativeSelectOption>
    <NativeSelectOption value="electronics-communication">
      Electronics & Communication
    </NativeSelectOption>
    <NativeSelectOption value="mechanical-engineering">
      Mechanical Engineering
    </NativeSelectOption>
  </NativeSelect>
);

export const Default = {
  render: Template,
  args: {
    size: 'default',
  },
};

export const Small = {
  render: Template,
  args: {
    size: 'sm',
  },
};

export const Disabled = {
  render: Template,
  args: {
    disabled: true,
  },
};

export const WithGroups = {
  render: (args) => (
    <NativeSelect {...args} className="w-[240px]">
      <NativeSelectOptGroup label="Core Branches">
        <NativeSelectOption value="computer-engineering">
          Computer Engineering
        </NativeSelectOption>
        <NativeSelectOption value="information-technology">
          Information Technology
        </NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Other Branches">
        <NativeSelectOption value="mechanical-engineering">
          Mechanical Engineering
        </NativeSelectOption>
        <NativeSelectOption value="civil-engineering">
          Civil Engineering
        </NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
  args: {
    size: 'default',
  },
};
