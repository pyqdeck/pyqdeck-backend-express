import { GeneralSettingsCardView } from './general-settings-card.view';

const meta = {
  title: 'Studio/Settings/GeneralSettingsCard',
  component: GeneralSettingsCardView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onToggle: { action: 'toggled' },
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

export const UpdatingDevMode = {
  args: {
    settings: defaultSettings,
    isUpdating: 'devMode',
  },
};

export const UpdatingContentFreeze = {
  args: {
    settings: defaultSettings,
    isUpdating: 'contentFreeze',
  },
};

export const UpdatingMaintenanceMode = {
  args: {
    settings: defaultSettings,
    isUpdating: 'maintenanceMode',
  },
};
