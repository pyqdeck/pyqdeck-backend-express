'use client';

import * as React from 'react';
import { BranchesTableView } from './branches-table-view';
import { EditBranchDialog } from './edit-branch-dialog';
import { DeleteBranchDialog } from './delete-branch-dialog';

export function BranchesTable({
  branches = [],
  pagination,
  search,
  onSearchChange,
  onUpdate,
  onDelete,
  loading = false,
}) {
  const [editingBranch, setEditingBranch] = React.useState(null);
  const [deletingBranch, setDeletingBranch] = React.useState(null);

  return (
    <>
      <BranchesTableView
        branches={branches}
        pagination={pagination}
        search={search}
        onSearchChange={onSearchChange}
        loading={loading}
        onEdit={setEditingBranch}
        onDelete={setDeletingBranch}
      />

      <EditBranchDialog
        branch={editingBranch}
        open={!!editingBranch}
        onOpenChange={(open) => !open && setEditingBranch(null)}
        onUpdate={onUpdate}
      />

      <DeleteBranchDialog
        branch={deletingBranch}
        open={!!deletingBranch}
        onOpenChange={(open) => !open && setDeletingBranch(null)}
        onDelete={onDelete}
      />
    </>
  );
}
