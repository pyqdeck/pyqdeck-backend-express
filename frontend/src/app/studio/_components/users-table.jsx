'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { UsersTableView } from './users-table-view';
import { useApi } from '@/hooks/use-api';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function UsersTable({
  initialUsers = [],
  pagination,
  initialSearch = '',
}) {
  const [search, setSearch] = React.useState(initialSearch);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [userStats, setUserStats] = React.useState(null);
  const [isLoadingStats, setIsLoadingStats] = React.useState(false);
  const api = useApi();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Debounced URL update on search input
  React.useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) {
        params.set('search', search);
      } else {
        params.delete('search');
      }

      params.set('page', '1');

      if (params.get('search') !== searchParams.get('search')) {
        router.push(`${pathname}?${params.toString()}`);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [search, pathname, router, searchParams]);

  const handleUpdateRole = async (clerkId, newRole) => {
    setIsUpdating(true);
    const toastId = toast.loading('Updating user role...');
    try {
      await api.users.updateUser(clerkId, { role: newRole });
      toast.success('User role updated successfully', { id: toastId });
      router.refresh();
    } catch (error) {
      console.error('Failed to update role:', error);
      toast.error('Failed to update user role', { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBanUser = async (clerkId) => {
    setIsUpdating(true);
    const toastId = toast.loading('Banning user...');
    try {
      await api.users.updateUser(clerkId, { isActive: false });
      toast.success('User has been banned', { id: toastId });
      router.refresh();
    } catch (error) {
      console.error('Failed to ban user:', error);
      toast.error('Failed to ban user', { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUnbanUser = async (clerkId) => {
    setIsUpdating(true);
    const toastId = toast.loading('Restoring user access...');
    try {
      await api.users.updateUser(clerkId, { isActive: true });
      toast.success('User access restored', { id: toastId });
      router.refresh();
    } catch (error) {
      console.error('Failed to restore user access:', error);
      toast.error('Failed to restore user access', { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenDetail = async (user) => {
    setSelectedUser(user);
    setUserStats(null);
    setIsLoadingStats(true);
    try {
      const res = await api.users.getUserById(user.clerkId);
      setUserStats(res.data.data?.stats ?? null);
    } catch (error) {
      console.error('Failed to load user stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleCloseDetail = () => {
    setSelectedUser(null);
    setUserStats(null);
  };

  return (
    <UsersTableView
      users={initialUsers}
      pagination={pagination}
      search={search}
      onSearchChange={setSearch}
      onUpdateRole={handleUpdateRole}
      onBanUser={handleBanUser}
      onUnbanUser={handleUnbanUser}
      onOpenDetail={handleOpenDetail}
      onCloseDetail={handleCloseDetail}
      selectedUser={selectedUser}
      userStats={userStats}
      isLoadingStats={isLoadingStats}
      isUpdating={isUpdating}
    />
  );
}
