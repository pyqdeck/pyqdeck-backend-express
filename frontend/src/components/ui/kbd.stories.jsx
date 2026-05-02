import { Kbd, KbdGroup } from './kbd';

export default {
  title: 'UI/Kbd',
  component: Kbd,
  tags: ['autodocs'],
};

export const Default = {
  render: () => <Kbd>⌘</Kbd>,
};

export const Combination = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};
