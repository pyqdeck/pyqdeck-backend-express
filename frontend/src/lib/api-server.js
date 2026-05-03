import { auth } from '@clerk/nextjs/server';
import { Api } from '@/lib/api-generated';

/**
 * Provides an authenticated instance of the PyqDeck API for use in Server Components and Server Actions.
 * It automatically handles Clerk token injection for secure backend communication.
 *
 * @returns {Promise<Api>} An instance of the generated API client.
 */
export async function getApiServer() {
  const { getToken } = await auth();

  return new Api({
    baseURL: (
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'
    ).replace(/\/+$/, ''),
    securityWorker: async () => {
      const token = await getToken();
      return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    },
  });
}
