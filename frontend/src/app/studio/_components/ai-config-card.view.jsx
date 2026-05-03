'use client';

import * as React from 'react';
import { BrainIcon, KeyRoundIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function AiConfigCardView({
  form,
  hasApiKey,
  isSaving,
  onFormChange,
  onClearApiKey,
  onSave,
}) {
  return (
    <Card className="font-roboto flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BrainIcon className="h-5 w-5" />
              AI Configuration
            </CardTitle>
            <CardDescription className="mt-1">
              Configure the AI provider for future AI-powered features.
            </CardDescription>
          </div>
          <Switch
            id="aiEnabled"
            checked={form.enabled}
            onCheckedChange={(v) => onFormChange('enabled', v)}
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className="font-roboto">Provider</Label>
          <Select
            value={form.provider}
            onValueChange={(v) => onFormChange('provider', v)}
          >
            <SelectTrigger className="font-roboto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="font-roboto">
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="openai-compatible">
                OpenAI-Compatible (Ollama, LiteLLM, etc.)
              </SelectItem>
              <SelectItem value="anthropic">Anthropic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="font-roboto">API Key</Label>
          <Input
            type="password"
            className="font-roboto"
            placeholder={
              hasApiKey ? 'Key saved — type to replace' : 'Enter API key'
            }
            value={form.apiKey}
            onChange={(e) => onFormChange('apiKey', e.target.value)}
            autoComplete="new-password"
          />
          {hasApiKey && !form.apiKey && (
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <span className="flex items-center gap-1">
                <KeyRoundIcon className="h-3 w-3" />
                API key is saved. Leave blank to keep it unchanged.
              </span>
              <button
                type="button"
                onClick={onClearApiKey}
                className="text-destructive hover:underline"
              >
                Clear key
              </button>
            </div>
          )}
        </div>

        {form.provider === 'openai-compatible' && (
          <div className="flex flex-col gap-1.5">
            <Label className="font-roboto">Base URL</Label>
            <Input
              className="font-roboto"
              placeholder="http://localhost:11434/v1"
              value={form.baseUrl ?? ''}
              onChange={(e) => onFormChange('baseUrl', e.target.value || null)}
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <Label className="font-roboto">Model</Label>
          <Input
            className="font-roboto"
            placeholder="e.g. gpt-4o, claude-sonnet-4-6, llama3"
            value={form.model ?? ''}
            onChange={(e) => onFormChange('model', e.target.value || null)}
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={onSave}
          disabled={isSaving}
          className="font-roboto w-full font-bold"
        >
          {isSaving ? 'Saving...' : 'Save AI Config'}
        </Button>
      </CardFooter>
    </Card>
  );
}
