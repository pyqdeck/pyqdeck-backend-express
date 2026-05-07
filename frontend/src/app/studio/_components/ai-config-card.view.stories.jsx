import { fn } from '@storybook/test';
import { useState } from 'react';
import { AiConfigCardView } from './ai-config-card.view';

/**
 * AiConfigCardView allows administrators to configure AI provider settings,
 * including enabling/disabling AI features, selecting a provider, and managing API keys.
 */
const meta = {
  title: 'Studio/Settings/AiConfigCardView',
  component: AiConfigCardView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    form: {
      control: 'object',
      description: 'The current state of the AI configuration form',
      table: {
        type: {
          summary: 'object',
          detail:
            '{ enabled: boolean, provider: string, apiKey: string, baseUrl: string | null, model: string | null }',
        },
      },
    },
    hasApiKey: {
      control: 'boolean',
      description: 'Indicates if an API key is already saved in the backend',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isSaving: {
      control: 'boolean',
      description: 'Indicates if the configuration is currently being saved',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onFormChange: {
      description: 'Callback triggered when a form field value changes',
      table: {
        type: { summary: '(key: string, value: any) => void' },
      },
    },
    onClearApiKey: {
      description: 'Callback triggered when the "Clear key" button is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    onSave: {
      description:
        'Callback triggered when the "Save AI Config" button is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    onFormChange: fn(),
    onClearApiKey: fn(),
    onSave: fn(),
  },
};

export default meta;

/**
 * A wrapper component to manage the internal state of the AI configuration form,
 * making the stories interactive.
 */
const InteractiveWrapper = ({
  initialForm,
  initialHasApiKey = false,
  ...args
}) => {
  const [form, setForm] = useState(initialForm);
  const [hasApiKey, setHasApiKey] = useState(initialHasApiKey);

  const handleFormChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    args.onFormChange(key, value);
  };

  const handleClearApiKey = () => {
    setHasApiKey(false);
    setForm((prev) => ({ ...prev, apiKey: '' }));
    args.onClearApiKey();
  };

  return (
    <div className="w-[500px]">
      <AiConfigCardView
        {...args}
        form={form}
        hasApiKey={hasApiKey}
        onFormChange={handleFormChange}
        onClearApiKey={handleClearApiKey}
      />
    </div>
  );
};

const defaultForm = {
  enabled: false,
  provider: 'openai',
  apiKey: '',
  baseUrl: null,
  model: 'gpt-4o',
};

export const Default = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    initialForm: defaultForm,
    hasApiKey: false,
    isSaving: false,
  },
};

/**
 * Demonstrates the configuration for OpenAI with AI features enabled.
 */
export const EnabledOpenAI = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    initialForm: {
      ...defaultForm,
      enabled: true,
      model: 'gpt-4o',
    },
    initialHasApiKey: true,
  },
};

/**
 * Demonstrates the configuration for an OpenAI-compatible provider (e.g., Ollama).
 * This view includes an additional "Base URL" field.
 */
export const OpenAICompatible = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    initialForm: {
      ...defaultForm,
      enabled: true,
      provider: 'openai-compatible',
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    },
  },
};

/**
 * Demonstrates the configuration for Anthropic.
 */
export const Anthropic = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    initialForm: {
      ...defaultForm,
      enabled: true,
      provider: 'anthropic',
      model: 'claude-3-5-sonnet-20240620',
    },
  },
};

/**
 * Visualizes the card in a saving state.
 */
export const Saving = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    initialForm: {
      ...defaultForm,
      enabled: true,
    },
    isSaving: true,
  },
};

/**
 * Demonstrates the state where an API key is already saved in the backend.
 */
export const WithSavedKey = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    initialForm: {
      ...defaultForm,
      enabled: true,
      apiKey: '',
    },
    initialHasApiKey: true,
  },
};
