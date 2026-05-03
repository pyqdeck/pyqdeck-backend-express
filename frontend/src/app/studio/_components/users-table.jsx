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
  const api = useApi();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Debounced URL update
  React.useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) {
        params.set('search', search);
      } else {
        params.delete('search');
      }

      params.set('page', '1'); // Reset to page 1 on new search

      // Only push if the search actually changed to avoid redundant loads
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

  return (
    <UsersTableView
      users={initialUsers}
      pagination={pagination}
      search={search}
      onSearchChange={setSearch}
      onUpdateRole={handleUpdateRole}
      isUpdating={isUpdating}
    />
  );
}
