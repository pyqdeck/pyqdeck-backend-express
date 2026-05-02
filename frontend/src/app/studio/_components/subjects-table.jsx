'use client';

import * as React from 'react';
import { SubjectsTableView } from './subjects-table-view';
import { EditSubjectDialog } from './edit-subject-dialog';
import { DeleteSubjectDialog } from './delete-subject-dialog';

export function SubjectsTable({
  subjects = [],
  pagination,
  search,
  onSearchChange,
  onUpdate,
  onDelete,
  loading = false,
}) {
  const [editingSubject, setEditingSubject] = React.useState(null);
  const [deletingSubject, setDeletingSubject] = React.useState(null);

  return (
    <>
      <SubjectsTableView
        subjects={subjects}
        pagination={pagination}
        search={search}
        onSearchChange={onSearchChange}
        loading={loading}
        onEdit={setEditingSubject}
        onDelete={setDeletingSubject}
      />

      <EditSubjectDialog
        subject={editingSubject}
        open={!!editingSubject}
        onOpenChange={(open) => !open && setEditingSubject(null)}
        onUpdate={onUpdate}
      />

      <DeleteSubjectDialog
        subject={deletingSubject}
        open={!!deletingSubject}
        onOpenChange={(open) => !open && setDeletingSubject(null)}
        onDelete={onDelete}
      />
    </>
  );
}
