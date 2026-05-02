'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import {
  BookOpen,
  Plus,
  ChevronRight,
  Layout,
  FileText,
  Settings2,
  Trash2,
  Edit,
  Layers,
  Sparkles,
  GraduationCap,
  MoreVertical,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AddModuleDialog } from './add-module-dialog';
import { AddTopicDialog } from './add-topic-dialog';
import { EditModuleDialog } from './edit-module-dialog';
import { EditTopicDialog } from './edit-topic-dialog';
import { EditSyllabusDialog } from './edit-syllabus-dialog';

export function SyllabusBuilder({
  offerings = [],
  currentOfferingId,
  syllabus,
  modules = [],
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const api = useApi();
  const [loading, setLoading] = React.useState(false);

  // Dialog State
  const [editingSyllabus, setEditingSyllabus] = React.useState(null);
  const [editingModule, setEditingModule] = React.useState(null);
  const [editingTopic, setEditingTopic] = React.useState(null);
  const [deletingModule, setDeletingModule] = React.useState(null);
  const [deletingTopic, setDeletingTopic] = React.useState(null);

  const handleOfferingChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set('offeringId', value);
    router.push(`?${params.toString()}`);
  };

  const handleInitialize = async () => {
    if (!currentOfferingId) return;
    try {
      setLoading(true);
      await api.syllabus.createSyllabus({
        subjectOfferingId: currentOfferingId,
        description: 'Initial syllabus',
      });
      router.refresh();
    } catch (error) {
      console.error('Failed to initialize syllabus:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSyllabusUpdate = async (id, data) => {
    await api.syllabus.updateSyllabus(id, data);
    router.refresh();
  };

  const handleModuleAdd = async (data) => {
    await api.modules.createModule(data);
    router.refresh();
  };

  const handleTopicAdd = async (data) => {
    await api.topics.createTopic(data);
    router.refresh();
  };

  const handleModuleUpdate = async (id, data) => {
    await api.modules.updateModule(id, data);
    router.refresh();
  };

  const handleTopicUpdate = async (id, data) => {
    await api.topics.updateTopic(id, data);
    router.refresh();
  };

  const handleModuleDelete = async () => {
    if (!deletingModule) return;
    try {
      await api.modules.deleteModule(deletingModule.id || deletingModule._id);
      setDeletingModule(null);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete module:', error);
    }
  };

  const handleTopicDelete = async () => {
    if (!deletingTopic) return;
    try {
      await api.topics.deleteTopic(deletingTopic.id || deletingTopic._id);
      setDeletingTopic(null);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete topic:', error);
    }
  };

  const currentOffering = offerings.find((o) => o.id === currentOfferingId);

  return (
    <div className="animate-in fade-in flex flex-col gap-8 duration-500">
      {/* Dialogs */}
      <EditSyllabusDialog
        syllabus={editingSyllabus}
        open={!!editingSyllabus}
        onOpenChange={(open) => !open && setEditingSyllabus(null)}
        onUpdate={handleSyllabusUpdate}
      />
      <EditModuleDialog
        module={editingModule}
        open={!!editingModule}
        onOpenChange={(open) => !open && setEditingModule(null)}
        onUpdate={handleModuleUpdate}
      />
      <EditTopicDialog
        topic={editingTopic}
        open={!!editingTopic}
        onOpenChange={(open) => !open && setEditingTopic(null)}
        onUpdate={handleTopicUpdate}
      />

      {/* AlertDialogs for Deletion */}
      <AlertDialog
        open={!!deletingModule}
        onOpenChange={(open) => !open && setDeletingModule(null)}
      >
        <AlertDialogContent className="border-2 shadow-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-roboto text-xl font-bold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-roboto">
              This will permanently delete the module{' '}
              <span className="text-foreground font-roboto font-bold">
                "{deletingModule?.title}"
              </span>{' '}
              and all its associated topics. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-roboto border-2 font-bold">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleModuleDelete}
              className="font-roboto bg-destructive hover:bg-destructive/90 border-2 font-bold shadow-none"
            >
              Delete Module
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
              Are you sure you want to remove the topic{' '}
              <span className="text-foreground font-roboto font-bold">
                "{deletingTopic?.title}"
              </span>{' '}
              from this module?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-roboto border-2 font-bold">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleTopicDelete}
              className="font-roboto bg-destructive hover:bg-destructive/90 border-2 font-bold shadow-none"
            >
              Remove Topic
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header Selection Section */}
      <Card className="border-border/50 bg-muted/20 overflow-hidden border-2 shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h3 className="font-roboto text-foreground text-xl font-bold tracking-tight">
                Select Subject Offering
              </h3>
              <p className="text-muted-foreground font-roboto max-w-sm text-sm">
                Choose the academic track you want to build the curriculum for.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Select
                  value={currentOfferingId}
                  onValueChange={handleOfferingChange}
                >
                  <SelectTrigger className="font-roboto h-14 w-[350px] border-2 bg-white px-4 shadow-none focus:ring-0 dark:bg-zinc-950">
                    <SelectValue placeholder="Select a subject offering..." />
                  </SelectTrigger>
                  <SelectContent className="border-2 p-1 shadow-xl">
                    {offerings.map((o) => (
                      <SelectItem
                        key={o.id}
                        value={o.id}
                        className="font-roboto rounded-lg py-3 focus:bg-indigo-50 focus:text-indigo-900"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className="text-sm font-bold whitespace-nowrap">
                            {o.subjectId?.name}
                          </span>
                          <span className="text-muted-foreground/30">•</span>
                          <span className="text-muted-foreground text-[10px] font-medium tracking-widest whitespace-nowrap uppercase">
                            {o.universityId?.shortName} •{' '}
                            {o.branchId?.shortName} • Sem {o.semesterId?.number}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentOfferingId && !syllabus && (
                <div className="flex-shrink-0">
                  <Button
                    size="lg"
                    onClick={handleInitialize}
                    disabled={loading}
                    className="font-roboto h-14 bg-indigo-600 px-10 text-sm font-black tracking-wider uppercase shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.98] dark:shadow-none"
                  >
                    {loading ? (
                      'Initializing...'
                    ) : (
                      <>
                        <Sparkles className="mr-3 h-5 w-5" />
                        Initialize Syllabus
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {!currentOfferingId ? (
        <Card className="border-border/40 bg-muted/5 border-2 border-dashed py-24 text-center shadow-none">
          <CardContent className="flex flex-col items-center gap-4">
            <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full border-2">
              <BookOpen className="text-muted-foreground h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-roboto text-xl font-bold">
                No Offering Selected
              </h3>
              <p className="text-muted-foreground font-roboto max-w-xs leading-relaxed">
                Please select a subject offering from the dropdown above to
                start managing its curriculum.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : syllabus ? (
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content: Modules List */}
          <div className="col-span-12 flex flex-col gap-6 lg:col-span-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="font-roboto text-foreground text-2xl font-bold tracking-tight">
                  Curriculum Modules
                </h2>
                <p className="text-muted-foreground font-roboto text-sm">
                  Organize your units and learning objectives.
                </p>
              </div>
              <AddModuleDialog
                syllabusId={syllabus.id || syllabus._id}
                onAdd={handleModuleAdd}
              />
            </div>

            {modules.length === 0 ? (
              <Card className="bg-muted/10 border-2 border-dashed py-20 text-center shadow-none">
                <CardContent className="flex flex-col items-center gap-3">
                  <div className="rounded-full border-2 bg-white p-4 shadow-sm dark:bg-zinc-900">
                    <Layers className="text-muted-foreground h-6 w-6" />
                  </div>
                  <p className="text-muted-foreground font-roboto max-w-[240px] italic">
                    Your curriculum is empty. Add your first unit to get
                    started.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col gap-6">
                {modules
                  .sort((a, b) => a.moduleNumber - b.moduleNumber)
                  .map((mod) => (
                    <Card
                      key={mod.id}
                      className="group overflow-hidden border-2 p-0 shadow-none transition-all hover:border-indigo-300 dark:hover:border-indigo-800"
                    >
                      <CardHeader className="bg-muted/30 border-b px-6 py-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="font-roboto flex h-11 w-11 items-center justify-center rounded-xl border-2 bg-white text-xl font-black text-indigo-600 shadow-sm dark:bg-zinc-900 dark:text-indigo-400">
                              {mod.moduleNumber}
                            </div>
                            <div className="space-y-0.5">
                              <CardTitle className="font-roboto text-lg leading-tight font-bold">
                                {mod.title}
                              </CardTitle>
                              <div className="flex items-center gap-3">
                                <Badge
                                  variant="secondary"
                                  className="font-roboto border bg-white px-2 py-0 text-[10px] font-bold dark:bg-zinc-800"
                                >
                                  UNIT {mod.moduleNumber}
                                </Badge>
                                {mod.weightage > 0 && (
                                  <span className="text-muted-foreground font-roboto text-[10px] font-bold tracking-widest uppercase">
                                    Weightage: {mod.weightage}%
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="opacity-0 transition-opacity group-hover:opacity-100">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="hover:bg-muted/50 h-9 w-9 border-2 transition-colors"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="font-roboto w-48 border-2 p-2 shadow-xl"
                              >
                                <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-[10px] font-bold tracking-widest uppercase">
                                  Module Actions
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="my-1" />
                                <DropdownMenuItem
                                  className="group cursor-pointer rounded-md py-2.5 focus:bg-indigo-50 focus:text-indigo-600"
                                  onClick={() => setEditingModule(mod)}
                                >
                                  <Edit className="mr-3 h-4 w-4" />
                                  <span className="font-medium">
                                    Edit Module
                                  </span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="my-1" />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive focus:bg-destructive/10 group cursor-pointer rounded-md py-2.5"
                                  onClick={() => setDeletingModule(mod)}
                                >
                                  <Trash2 className="mr-3 h-4 w-4" />
                                  <span className="font-bold">
                                    Delete Module
                                  </span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          {mod.description && (
                            <p className="text-muted-foreground font-roboto border-l-4 border-indigo-100 py-1 pl-4 text-sm leading-relaxed italic">
                              {mod.description}
                            </p>
                          )}

                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-indigo-600" />
                                <h4 className="font-roboto text-muted-foreground text-xs font-bold tracking-widest uppercase">
                                  Topics / Sub-units
                                </h4>
                              </div>
                              <AddTopicDialog
                                moduleId={mod.id || mod._id}
                                onAdd={handleTopicAdd}
                              />
                            </div>

                            {(mod.topics || []).length === 0 ? (
                              <div className="bg-muted/5 flex items-center justify-center rounded-lg border-2 border-dashed py-8">
                                <span className="font-roboto text-muted-foreground text-xs italic">
                                  No topics defined yet. Click "Add Topic" to
                                  begin.
                                </span>
                              </div>
                            ) : (
                              <div className="grid gap-2.5">
                                {mod.topics
                                  .sort((a, b) => a.order - b.order)
                                  .map((topic) => (
                                    <div
                                      key={topic.id || topic._id}
                                      className="group/topic bg-muted/30 flex items-center justify-between rounded-xl border-2 border-transparent p-3 transition-all hover:border-indigo-100 hover:bg-white dark:hover:border-indigo-900 dark:hover:bg-zinc-900"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="rounded-md border bg-white p-1 text-indigo-400 shadow-xs transition-all group-hover/topic:scale-110 group-hover/topic:text-indigo-600 dark:bg-zinc-800">
                                          <ChevronRight className="h-3.5 w-3.5" />
                                        </div>
                                        <span className="font-roboto text-sm font-medium">
                                          {topic.title}
                                        </span>
                                      </div>
                                      <div className="opacity-0 transition-opacity group-hover/topic:opacity-100">
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="hover:bg-muted/50 h-8 w-8 rounded-full transition-colors"
                                            >
                                              <MoreVertical className="h-4 w-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent
                                            align="end"
                                            className="font-roboto w-48 border-2 p-2 shadow-xl"
                                          >
                                            <DropdownMenuItem
                                              className="group cursor-pointer rounded-md py-2 focus:bg-indigo-50 focus:text-indigo-600"
                                              onClick={() =>
                                                setEditingTopic(topic)
                                              }
                                            >
                                              <Edit className="mr-3 h-3.5 w-3.5" />
                                              <span className="text-sm font-medium">
                                                Edit Topic
                                              </span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              className="text-destructive focus:text-destructive focus:bg-destructive/10 group cursor-pointer rounded-md py-2"
                                              onClick={() =>
                                                setDeletingTopic(topic)
                                              }
                                            >
                                              <Trash2 className="mr-3 h-3.5 w-3.5" />
                                              <span className="text-sm font-bold">
                                                Remove Topic
                                              </span>
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </div>

          {/* Sidebar: Syllabus Info */}
          <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
            <Card className="sticky top-6 overflow-hidden border-2 p-0 pb-2 shadow-xl shadow-indigo-500/5 dark:shadow-none">
              <CardHeader className="border-b-2 bg-indigo-50/50 px-5 py-3 dark:bg-indigo-900/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-lg bg-indigo-600 p-1.5 text-white shadow-sm">
                      <Settings2 className="h-4 w-4" />
                    </div>
                    <CardTitle className="font-roboto text-lg font-bold">
                      Syllabus Metadata
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-indigo-600 transition-colors hover:bg-indigo-100 hover:text-indigo-700"
                    onClick={() => setEditingSyllabus(syllabus)}
                  >
                    <Edit className="h-4.5 w-4.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 px-6 pt-6">
                <div className="flex flex-col gap-2.5">
                  <label className="font-roboto text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                    Curriculum Description
                  </label>
                  <div className="font-roboto text-foreground bg-muted/40 group/desc relative rounded-xl border-2 p-4 text-sm leading-relaxed">
                    {syllabus.description ||
                      'No detailed description provided for this curriculum track.'}
                    <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-indigo-400 opacity-0 transition-opacity group-hover/desc:opacity-100" />
                  </div>
                </div>

                <Separator className="border-b-2" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 flex flex-col gap-1 rounded-xl border-2 p-4">
                    <span className="font-roboto text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Total Units
                    </span>
                    <span className="font-roboto text-foreground text-2xl font-black">
                      {modules.length}
                    </span>
                  </div>
                  <div className="bg-muted/30 flex flex-col gap-1 rounded-xl border-2 p-4">
                    <span className="font-roboto text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Weightage
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`font-roboto text-2xl font-black ${
                          modules.reduce(
                            (acc, m) => acc + (m.weightage || 0),
                            0
                          ) === 100
                            ? 'text-emerald-600'
                            : 'text-amber-600'
                        }`}
                      >
                        {modules.reduce(
                          (acc, m) => acc + (m.weightage || 0),
                          0
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border-2 border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-900/30 dark:bg-indigo-900/10">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-indigo-600 p-2 text-white">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-roboto text-xs font-bold tracking-tighter text-indigo-600 uppercase dark:text-indigo-400">
                        Academic Status
                      </span>
                      <span className="font-roboto text-sm font-black text-indigo-900 dark:text-indigo-100">
                        {syllabus.isActive
                          ? 'Active Curriculum'
                          : 'Draft / Archived'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : null}
    </div>
  );
}
