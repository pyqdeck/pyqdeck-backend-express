'use client';

import * as React from 'react';
import { EditUniversityDialog } from './edit-university-dialog';
import { DeleteUniversityDialog } from './delete-university-dialog';
import { UniversitiesTableView } from './universities-table-view';

export function UniversitiesTable({ initialUniversities = [], pagination }) {
  const [search, setSearch] = React.useState('');

  // Dialog States
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedUniversity, setSelectedUniversity] = React.useState(null);

  const filteredUniversities = initialUniversities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(search.toLowerCase()) ||
      uni.shortName.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (uni) => {
    setSelectedUniversity(uni);
    setEditOpen(true);
  };

  const handleDelete = (uni) => {
    setSelectedUniversity(uni);
    setDeleteOpen(true);
  };

  return (
    <>
      <UniversitiesTableView
        universities={filteredUniversities}
        pagination={pagination}
        search={search}
        onSearchChange={setSearch}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Action Dialogs */}
      <EditUniversityDialog
        university={selectedUniversity}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteUniversityDialog
        university={selectedUniversity}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
