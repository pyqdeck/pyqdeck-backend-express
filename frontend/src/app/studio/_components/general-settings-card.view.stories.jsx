import { fn } from '@storybook/test';
import { GeneralSettingsCardView } from './general-settings-card.view';

/**
 * GeneralSettingsCardView provides a UI for toggling platform-wide operational flags.
 * It displays developer mode, content freeze, and maintenance mode settings.
 */
const meta = {
  title: 'Studio/Settings/GeneralSettingsCard',
  component: GeneralSettingsCardView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    settings: {
      control: 'object',
      description: 'The current state of platform-wide operational flags',
      table: {
        type: {
          summary: 'object',
          detail:
            '{ devMode: boolean, contentFreeze: boolean, maintenanceMode: boolean }',
        },
      },
    },
    isUpdating: {
      control: { type: 'select' },
      options: [null, 'devMode', 'contentFreeze', 'maintenanceMode'],
      description: 'Indicates which setting is currently being updated',
      table: {
        type: {
          summary: 'string | null',
        },
        defaultValue: { summary: 'null' },
      },
    },
    onToggle: {
      description: 'Callback function triggered when a setting is toggled',
      table: {
        type: { summary: '(key: string, value: boolean) => void' },
      },
    },
  },
  args: {
    onToggle: fn(),
  },
};

export default meta;

const defaultSettings = {
  devMode: false,
  contentFreeze: false,
  maintenanceMode: false,
};

export const Default = {
  args: {
    settings: defaultSettings,
    isUpdating: null,
  },
};

/**
 * Visualizes the card when all platform-wide flags are enabled.
 */
export const AllEnabled = {
  args: {
    settings: {
      devMode: true,
      contentFreeze: true,
      maintenanceMode: true,
    },
    isUpdating: null,
  },
};

/**
 * Demonstrates the loading state when the Developer Mode setting is being updated.
 */
export const UpdatingDevMode = {
  args: {
    settings: defaultSettings,
    isUpdating: 'devMode',
  },
};

/**
 * Demonstrates the loading state when the Content Freeze setting is being updated.
 */
export const UpdatingContentFreeze = {
  args: {
    settings: defaultSettings,
    isUpdating: 'contentFreeze',
  },
};

/**
 * Demonstrates the loading state when the Maintenance Mode setting is being updated.
 */
export const UpdatingMaintenanceMode = {
  args: {
    settings: defaultSettings,
    isUpdating: 'maintenanceMode',
  },
};
