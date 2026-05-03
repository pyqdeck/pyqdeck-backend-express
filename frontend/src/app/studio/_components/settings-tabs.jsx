'use client';

import * as React from 'react';
import { Settings2Icon, WrenchIcon, BrainIcon } from 'lucide-react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GeneralSettingsCard } from './general-settings-card';
import { AiConfigCard } from './ai-config-card';
import { WipeDbCard } from './wipe-db-card';
import { SystemInfoCard } from './system-info-card';

const SETTINGS_TABS = [
  { id: 'platform', label: 'Platform', icon: Settings2Icon },
  { id: 'ai', label: 'AI Config', icon: BrainIcon },
  { id: 'maintenance', label: 'Maintenance', icon: WrenchIcon },
];

export function SettingsTabs({ platformConfig, health }) {
  const [activeTab, setActiveTab] = React.useState('platform');

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-4">
        {/* Pill style tabs matching UsersTableView */}
        <div className="flex flex-wrap items-center gap-1.5">
          {SETTINGS_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'font-roboto h-8 rounded-full border-2 px-3.5 text-xs font-bold transition-all',
                  !isActive && 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="mr-1.5 h-3.5 w-3.5" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        <Tabs value={activeTab} className="w-full">
          {/* 4. Added a subtle fade-in animation to smooth out tab switching */}
          <TabsContent
            value="platform"
            className="mt-2 animate-in fade-in-50 duration-300"
          >
            <GeneralSettingsCard initialConfig={platformConfig} />
          </TabsContent>

          <TabsContent
            value="ai"
            className="mt-2 animate-in fade-in-50 duration-300"
          >
            <AiConfigCard initialConfig={platformConfig} />
          </TabsContent>

          <TabsContent
            value="maintenance"
            className="mt-2 animate-in fade-in-50 duration-300"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              <WipeDbCard />
              <SystemInfoCard initialHealth={health} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}