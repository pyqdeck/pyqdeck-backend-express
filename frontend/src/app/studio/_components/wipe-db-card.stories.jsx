import { WipeDbCardView } from './wipe-db-card.view';
import { fn } from '@storybook/test';

const meta = {
  title: 'Studio/Security/WipeDbCard',
  component: WipeDbCardView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default = {
  args: {
    isWiping: false,
    onWipe: fn(),
  },
};

export const Wiping = {
  args: {
    isWiping: true,
    onWipe: fn(),
  },
};
