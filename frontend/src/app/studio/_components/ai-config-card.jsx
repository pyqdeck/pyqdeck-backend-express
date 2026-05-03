'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { AiConfigCardView } from './ai-config-card.view';
import { useApi } from '@/hooks/use-api';

const DEFAULT_FORM = {
  enabled: false,
  provider: 'openai',
  apiKey: '',
  baseUrl: null,
  model: null,
};

export function AiConfigCard({ initialConfig }) {
  const aiConfig = initialConfig?.ai ?? {};

  const [form, setForm] = React.useState({
    enabled: aiConfig.enabled ?? false,
    provider: aiConfig.provider ?? 'openai',
    apiKey: '',
    baseUrl: aiConfig.baseUrl ?? null,
    model: aiConfig.model ?? null,
  });
  const [hasApiKey, setHasApiKey] = React.useState(aiConfig.hasApiKey ?? false);
  const [isSaving, setIsSaving] = React.useState(false);
  const api = useApi();

  const handleFormChange = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleClearApiKey = async () => {
    setIsSaving(true);
    const toastId = toast.loading('Clearing API key...');
    try {
      await api.platformConfig.updatePlatformConfig({ ai: { apiKey: null } });
      setHasApiKey(false);
      setForm((f) => ({ ...f, apiKey: '' }));
      toast.success('API key cleared', { id: toastId });
    } catch {
      toast.error('Failed to clear API key', { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const toastId = toast.loading('Saving AI config...');
    try {
      const aiPayload = {
        enabled: form.enabled,
        provider: form.provider,
        baseUrl: form.baseUrl,
        model: form.model,
      };

      // Only include apiKey if the user typed something
      if (form.apiKey) {
        aiPayload.apiKey = form.apiKey;
      }

      const res = await api.platformConfig.updatePlatformConfig({
        ai: aiPayload,
      });

      const updatedAi = res.data.data?.ai ?? {};
      setHasApiKey(updatedAi.hasApiKey ?? false);
      setForm((f) => ({
        ...f,
        enabled: updatedAi.enabled ?? f.enabled,
        provider: updatedAi.provider ?? f.provider,
        baseUrl: updatedAi.baseUrl ?? null,
        model: updatedAi.model ?? null,
        apiKey: '',
      }));
      toast.success('AI config saved', { id: toastId });
    } catch {
      toast.error('Failed to save AI config', { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AiConfigCardView
      form={form}
      hasApiKey={hasApiKey}
      isSaving={isSaving}
      onFormChange={handleFormChange}
      onClearApiKey={handleClearApiKey}
      onSave={handleSave}
    />
  );
}
