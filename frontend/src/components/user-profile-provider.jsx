'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { useApi } from '@/hooks/use-api';

const UserProfileContext = createContext({
  profile: null,
  isLoading: true,
  error: null,
  refreshProfile: async () => {},
  isAdmin: false,
  isEditor: false,
  isNormal: false,
  role: 'normal',
});

export function UserProfileProvider({ children }) {
  const { isLoaded: isClerkLoaded, isSignedIn } = useUser();
  const { userId } = useAuth();
  const api = useApi();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    if (!isSignedIn) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await api.users.getCurrentUser();
      const userData = res.data?.data?.user;
      setProfile(userData);
      setError(null);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isClerkLoaded) {
      fetchProfile();
    }
  }, [isClerkLoaded, isSignedIn, userId]);

  const role = profile?.role || 'normal';

  const value = useMemo(() => ({
    profile,
    isLoading: !isClerkLoaded || isLoading,
    error,
    refreshProfile: fetchProfile,
    role,
    isAdmin: role === 'admin',
    isEditor: role === 'editor',
    isNormal: role === 'normal',
  }), [profile, isClerkLoaded, isLoading, error, role]);

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

export const useUserProfile = () => useContext(UserProfileContext);
