'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { WipeDbCardView } from './wipe-db-card.view';
import { useApi } from '@/hooks/use-api';

export function WipeDbCard() {
  const [isWiping, setIsWiping] = useState(false);
  const api = useApi();

  const handleWipe = async () => {
    setIsWiping(true);
    const toastId = toast.loading('Wiping database content...');

    try {
      await api.maintenance.wipeDatabase();
      toast.success('Database wiped successfully', { id: toastId });
    } catch (error) {
      console.error('Wipe failed:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An error occurred during wipe';
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsWiping(false);
    }
  };

  return <WipeDbCardView isWiping={isWiping} onWipe={handleWipe} />;
}
