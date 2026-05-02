'use client';

import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useApi } from '@/hooks/use-api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function DeleteUniversityDialog({ university, open, onOpenChange }) {
  const [loading, setLoading] = React.useState(false);
  const api = useApi();
  const router = useRouter();

  async function onDelete() {
    try {
      setLoading(true);
      await api.universities.deleteUniversity(university.id);
      toast.success('University deleted successfully');
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Failed to delete university'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="font-roboto border-2 shadow-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete{' '}
            <span className="text-foreground font-bold">
              {university?.name}
            </span>{' '}
            and remove all associated data. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-2 font-bold">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold"
          >
            {loading ? 'Deleting...' : 'Delete Institution'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
