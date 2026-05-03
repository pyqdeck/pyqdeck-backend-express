'use client';

import * as React from 'react';
import { Settings2Icon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

function SettingRow({ id, label, description, checked, disabled, onToggle }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <Label
          htmlFor={id}
          className="font-roboto cursor-pointer text-sm font-medium"
        >
          {label}
        </Label>
        <p className="text-muted-foreground font-roboto mt-0.5 text-xs">
          {description}
        </p>
      </div>
      <Switch
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onToggle}
      />
    </div>
  );
}

export function GeneralSettingsCardView({ settings, isUpdating, onToggle }) {
  return (
    <Card className="font-roboto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2Icon className="h-5 w-5" />
          General Settings
        </CardTitle>
        <CardDescription>Platform-wide operational flags.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <SettingRow
          id="devMode"
          label="Developer Mode"
          description="Enables debug logs and dev tooling across the platform."
          checked={settings.devMode}
          disabled={isUpdating === 'devMode'}
          onToggle={(v) => onToggle('devMode', v)}
        />
        <SettingRow
          id="contentFreeze"
          label="Content Freeze"
          description="Blocks all new papers and questions from being created by editors."
          checked={settings.contentFreeze}
          disabled={isUpdating === 'contentFreeze'}
          onToggle={(v) => onToggle('contentFreeze', v)}
        />
        <SettingRow
          id="maintenanceMode"
          label="Maintenance Mode"
          description="Signals that the platform is undergoing maintenance."
          checked={settings.maintenanceMode}
          disabled={isUpdating === 'maintenanceMode'}
          onToggle={(v) => onToggle('maintenanceMode', v)}
        />
      </CardContent>
    </Card>
  );
}
