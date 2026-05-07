import { fn } from '@storybook/test';
import { WipeDbCardView } from './wipe-db-card.view';

const meta = {
  title: 'Studio/Settings/WipeDbCard',
  component: WipeDbCardView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isWiping: {
      control: 'boolean',
      description: 'Whether the database is currently being wiped',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onWipe: {
      description: 'Callback function called when the wipe action is confirmed',
      table: {
        type: { summary: 'function' },
      },
    },
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
