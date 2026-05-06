import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
} from './combobox';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the combobox is disabled',
      table: { defaultValue: { summary: 'false' } },
    },
    showTrigger: {
      control: 'boolean',
      description: 'Whether to show the dropdown trigger icon',
      table: { defaultValue: { summary: 'true' } },
    },
    showClear: {
      control: 'boolean',
      description: 'Whether to show the clear button',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;

const branches = [
  { value: 'ce', label: 'Computer Engineering' },
  { value: 'it', label: 'Information Technology' },
  { value: 'ece', label: 'Electronics & Communication' },
  { value: 'me', label: 'Mechanical Engineering' },
  { value: 'ee', label: 'Electrical Engineering' },
];

const groupedBranches = [
  {
    label: 'Computing',
    items: [
      { value: 'ce', label: 'Computer Engineering' },
      { value: 'it', label: 'Information Technology' },
    ],
  },
  {
    label: 'Engineering',
    items: [
      { value: 'ece', label: 'Electronics & Communication' },
      { value: 'me', label: 'Mechanical Engineering' },
      { value: 'ee', label: 'Electrical Engineering' },
    ],
  },
];

export const Default = {
  render: (args) => (
    <div className="w-72">
      <Combobox onValueChange={fn()}>
        <ComboboxInput
          placeholder="Select branch..."
          disabled={args.disabled}
          showTrigger={args.showTrigger}
          showClear={args.showClear}
        />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>No branch found.</ComboboxEmpty>
            {branches.map((branch) => (
              <ComboboxItem key={branch.value} value={branch.value}>
                {branch.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
  args: {
    disabled: false,
    showTrigger: true,
    showClear: false,
  },
};

export const WithClearButton = {
  ...Default,
  args: {
    ...Default.args,
    showClear: true,
  },
};

export const Disabled = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const WithGroups = {
  render: (args) => (
    <div className="w-72">
      <Combobox onValueChange={fn()}>
        <ComboboxInput
          placeholder="Search branch..."
          disabled={args.disabled}
          showTrigger={args.showTrigger}
          showClear={args.showClear}
        />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>No branch found.</ComboboxEmpty>
            {groupedBranches.map((group) => (
              <ComboboxGroup key={group.label}>
                <ComboboxLabel>{group.label}</ComboboxLabel>
                {group.items.map((item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
  args: {
    ...Default.args,
  },
};

export const WithChips = {
  render: (args) => (
    <div className="w-72">
      <Combobox multiple onValueChange={fn()}>
        <ComboboxChips>
          <ComboboxChip value="ce">Computer Engineering</ComboboxChip>
          <ComboboxChipsInput placeholder="Select branches..." />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>No branch found.</ComboboxEmpty>
            {branches.map((branch) => (
              <ComboboxItem key={branch.value} value={branch.value}>
                {branch.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
  args: {
    ...Default.args,
  },
};
