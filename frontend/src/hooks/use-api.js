import { useAuth } from '@clerk/nextjs';
import { Api } from '@/lib/api-generated';
import { useMemo } from 'react';

/**
 * A hook that provides an authenticated instance of the PyqDeck API.
 * It automatically handles Clerk token injection for secure endpoints.
 */
export function useApi() {
  const { getToken } = useAuth();

  const api = useMemo(() => {
    return new Api({
      baseURL:
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
      securityWorker: async () => {
        const token = await getToken();
        if (!token) return {};

        return {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    });
  }, [getToken]);

  return api;
}
