'use server';

import { auth } from '@clerk/nextjs/server';

/**
 * Server action to trigger database content wipe.
 * Protected by admin checks on the backend.
 */
export async function wipeDatabaseAction() {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    const baseUrl = (
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'
    ).replace(/\/+$/, '');

    const response = await fetch(`${baseUrl}/maintenance/wipe-db`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error:
          errorData.message ||
          errorData.error?.message ||
          'Failed to wipe database',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Wipe action failed:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
}
