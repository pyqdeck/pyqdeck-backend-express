'use client';

import { useUserProfile } from '@/components/user-profile-provider';

/**
 * Hook to access the current user's profile and role.
 * This is the single source of truth for user information across the frontend.
 */
export function useProfile() {
  return useUserProfile();
}
