import { Kbd, KbdGroup } from './kbd';

/**
 * The Kbd component is used to display keyboard inputs and combinations.
 */
const meta = {
  title: 'UI/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The content to be displayed within the keyboard key.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
    },
  },
};

export default meta;

export const Default = {
  args: {
    children: '⌘',
  },
};

export const Command = {
  args: {
    children: '⌘',
  },
};

export const Shift = {
  args: {
    children: '⇧',
  },
};

export const Enter = {
  args: {
    children: '↵',
  },
};

export const Letter = {
  args: {
    children: 'K',
  },
};

export const Combination = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const ComplexCombination = {
  render: () => (
    <KbdGroup>
      <Kbd>⇧</Kbd>
      <Kbd>⌘</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  ),
};

export const WithinTooltip = {
  render: (args) => (
    <div
      data-slot="tooltip-content"
      className="bg-primary text-primary-foreground rounded-md p-2 text-sm"
    >
      Press <Kbd {...args} /> to search
    </div>
  ),
  args: {
    children: '⌘K',
  },
};
