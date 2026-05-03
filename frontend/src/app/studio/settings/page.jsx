import { WipeDbCard } from '../_components/wipe-db-card';
import { SystemInfoCard } from '../_components/system-info-card';
import { getApiServer } from '@/lib/api-server';

export default async function SettingsPage() {
  let health = null;
  try {
    const api = await getApiServer();
    const res = await api.health.getHealthDetailed();
    health = res.data.data;
  } catch (error) {
    console.error('Failed to fetch health data:', error);
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-1">
        <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
          Studio Settings
        </h1>
        <p className="text-muted-foreground font-roboto">
          Manage platform configuration and maintenance tasks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <WipeDbCard />
        <SystemInfoCard initialHealth={health} />
      </div>
    </div>
  );
}
