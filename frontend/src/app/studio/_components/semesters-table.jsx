'use client';

import * as React from 'react';
import { SemestersTableView } from './semesters-table.view';
import { EditSemesterDialog } from './edit-semester-dialog';
import { DeleteSemesterDialog } from './delete-semester-dialog';

export function SemestersTable({
  semesters = [],
  pagination,
  search,
  onSearchChange,
  onUpdate,
  onDelete,
}) {
  const [selectedSemester, setSelectedSemester] = React.useState(null);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleEdit = (sem) => {
    setSelectedSemester(sem);
    setEditOpen(true);
  };

  const handleDelete = (sem) => {
    setSelectedSemester(sem);
    setDeleteOpen(true);
  };

  return (
    <>
      <SemestersTableView
        semesters={semesters}
        pagination={pagination}
        search={search}
        onSearchChange={onSearchChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {selectedSemester && (
        <>
          <EditSemesterDialog
            semester={selectedSemester}
            open={editOpen}
            onOpenChange={setEditOpen}
            onUpdate={onUpdate}
          />

          <DeleteSemesterDialog
            semester={selectedSemester}
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            onDelete={onDelete}
          />
        </>
      )}
    </>
  );
}
