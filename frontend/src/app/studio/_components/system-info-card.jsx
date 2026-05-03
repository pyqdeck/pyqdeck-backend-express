'use client';

import * as React from 'react';
import { SystemInfoCardView } from './system-info-card.view';
import { useApi } from '@/hooks/use-api';

export function SystemInfoCard({ initialHealth }) {
  const [health, setHealth] = React.useState(initialHealth);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const api = useApi();

  const fetchHealth = React.useCallback(
    async (silent = false) => {
      if (!silent) setIsRefreshing(true);
      try {
        const res = await api.health.getHealthDetailed();
        setHealth(res.data.data);
      } catch (error) {
        console.error('Failed to refresh health data:', error);
      } finally {
        if (!silent) setIsRefreshing(false);
      }
    },
    [api]
  );

  // Polling: refresh every 30 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchHealth(true); // Silent refresh
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchHealth]);

  return (
    <SystemInfoCardView
      health={health}
      isRefreshing={isRefreshing}
      onRefresh={() => fetchHealth()}
    />
  );
}
