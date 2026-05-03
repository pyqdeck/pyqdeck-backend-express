'use client';

import * as React from 'react';
import { Settings2Icon, WrenchIcon, BrainIcon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { GeneralSettingsCard } from './general-settings-card';
import { AiConfigCard } from './ai-config-card';
import { WipeDbCard } from './wipe-db-card';
import { SystemInfoCard } from './system-info-card';

export function SettingsTabs({ platformConfig, health }) {
  return (
    <Tabs defaultValue="platform">
      <TabsList variant="line" className="w-full justify-start border-none pb-0">
        <TabsTrigger value="platform" className="font-roboto gap-1.5">
          <Settings2Icon className="h-4 w-4" />
          Platform
        </TabsTrigger>
        <TabsTrigger value="ai" className="font-roboto gap-1.5">
          <BrainIcon className="h-4 w-4" />
          AI
        </TabsTrigger>
        <TabsTrigger value="maintenance" className="font-roboto gap-1.5">
          <WrenchIcon className="h-4 w-4" />
          Maintenance
        </TabsTrigger>
      </TabsList>

      <TabsContent value="platform" className="mt-6">
        <GeneralSettingsCard initialConfig={platformConfig} />
      </TabsContent>

      <TabsContent value="ai" className="mt-6">
        <AiConfigCard initialConfig={platformConfig} />
      </TabsContent>

      <TabsContent value="maintenance" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2">
          <WipeDbCard />
          <SystemInfoCard initialHealth={health} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
