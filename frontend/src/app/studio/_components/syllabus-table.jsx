'use client';

import * as React from 'react';
import { useState } from 'react';
import { SyllabusTableView } from './syllabus-table-view';
import { EditModuleDialog } from './edit-module-dialog';
import { EditTopicDialog } from './edit-topic-dialog';
import { AddTopicDialog } from './add-topic-dialog';
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

export function SyllabusTable({
  syllabus,
  modules = [],
  onModuleAdd,
  onModuleUpdate,
  onModuleDelete,
  onTopicAdd,
  onTopicUpdate,
  onTopicDelete,
}) {
  const [editingModule, setEditingModule] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [addingTopicModuleId, setAddingTopicModuleId] = useState(null);
  const [deletingModule, setDeletingModule] = useState(null);
  const [deletingTopic, setDeletingTopic] = useState(null);

  const handleConfirmModuleDelete = async () => {
    if (!deletingModule) return;
    const moduleId = deletingModule.id || deletingModule._id;
    await onModuleDelete(moduleId);
    setDeletingModule(null);
  };

  const handleConfirmTopicDelete = async () => {
    if (!deletingTopic) return;
    const topicId = deletingTopic.id || deletingTopic._id;
    await onTopicDelete(topicId);
    setDeletingTopic(null);
  };

  const handleTopicAddSubmit = async (data) => {
    await onTopicAdd(data);
    setAddingTopicModuleId(null);
  };

  return (
    <>
      <SyllabusTableView
        syllabus={syllabus}
        modules={modules}
        onModuleAdd={onModuleAdd}
        onTopicAdd={(moduleId) => setAddingTopicModuleId(moduleId)}
        onEditModule={setEditingModule}
        onDeleteModule={setDeletingModule}
        onEditTopic={setEditingTopic}
        onDeleteTopic={setDeletingTopic}
      />

      {/* Edit Module Dialog */}
      <EditModuleDialog
        module={editingModule}
        open={!!editingModule}
        onOpenChange={(open) => !open && setEditingModule(null)}
        onUpdate={onModuleUpdate}
      />

      {/* Edit Topic Dialog */}
      <EditTopicDialog
        topic={editingTopic}
        open={!!editingTopic}
        onOpenChange={(open) => !open && setEditingTopic(null)}
        onUpdate={onTopicUpdate}
      />

      {/* Add Topic Dialog */}
      <AddTopicDialog
        moduleId={addingTopicModuleId}
        onAdd={handleTopicAddSubmit}
        open={!!addingTopicModuleId}
        onOpenChange={(open) => !open && setAddingTopicModuleId(null)}
      />

      {/* Delete Module AlertDialog */}
      <AlertDialog
        open={!!deletingModule}
        onOpenChange={(open) => !open && setDeletingModule(null)}
      >
        <AlertDialogContent className="border-2 shadow-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-roboto text-xl font-bold">
              Delete Module?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-roboto">
              This will permanently delete &quot;{deletingModule?.title}&quot;
              and all its associated topics. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-roboto border-2 font-bold">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmModuleDelete}
              className="font-roboto bg-destructive hover:bg-destructive/90 border-2 font-bold shadow-none"
            >
              Delete Module
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Topic AlertDialog */}
      <AlertDialog
        open={!!deletingTopic}
        onOpenChange={(open) => !open && setDeletingTopic(null)}
      >
        <AlertDialogContent className="border-2 shadow-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-roboto text-xl font-bold">
              Remove Topic?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-roboto">
              This will permanently remove &quot;{deletingTopic?.title}&quot;
              from the module. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-roboto border-2 font-bold">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmTopicDelete}
              className="font-roboto bg-destructive hover:bg-destructive/90 border-2 font-bold shadow-none"
            >
              Remove Topic
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
