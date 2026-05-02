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
    <div className="flex flex-col gap-6">
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

      <AlertDialog
        open={!!deletingModule}
        onOpenChange={(open) => !open && setDeletingModule(null)}
      >
        <AlertDialogContent className="border-2 shadow-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-roboto font-bold">
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
            <AlertDialogCancel className="font-roboto border-2 font-bold shadow-none">
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
            <AlertDialogTitle className="font-roboto font-bold">
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
            <AlertDialogCancel className="font-roboto border-2 font-bold shadow-none">
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
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground flex items-center gap-3 text-3xl font-bold tracking-tight">
            Syllabus Builder{' '}
            <Sparkles className="h-6 w-6 animate-pulse text-indigo-500" />
          </h1>
          <p className="text-muted-foreground font-roboto">
            Design hierarchical curriculum structures and learning outcomes.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="font-roboto border-2 px-3 py-1 font-bold"
            >
              Select Offering:
            </Badge>
            <Select
              value={currentOfferingId || ''}
              onValueChange={handleOfferingChange}
            >
              <SelectTrigger className="font-roboto w-[280px] border-2 focus:ring-0">
                <SelectValue placeholder="Choose a subject offering..." />
              </SelectTrigger>
              <SelectContent className="border-2 shadow-none">
                {offerings.map((off) => (
                  <SelectItem
                    key={off.id}
                    value={off.id}
                    className="font-roboto"
                  >
                    {off.subjectId?.name} ({off.regulation})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {!currentOfferingId ? (
        <Card className="bg-muted/30 border-2 border-dashed py-20 text-center shadow-none">
          <CardContent className="flex flex-col items-center gap-4">
            <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full border-2">
              <BookOpen className="text-muted-foreground h-8 w-8" />
            </div>
            <div className="max-w-[400px]">
              <h3 className="font-roboto text-lg font-bold">
                No Offering Selected
              </h3>
              <p className="text-muted-foreground font-roboto mt-1 text-sm">
                Select a subject offering from the dropdown above to start
                building its syllabus structure.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : !syllabus ? (
        <Card className="border-2 shadow-none">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="font-roboto text-xl">
                  Syllabus Not Initialized
                </CardTitle>
                <CardDescription className="font-roboto">
                  The subject{' '}
                  <span className="text-foreground font-bold">
                    {currentOffering?.subjectId?.name}
                  </span>{' '}
                  does not have a defined syllabus structure yet.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center pt-4">
            <Button
              onClick={handleInitialize}
              disabled={loading}
              className="font-roboto h-12 border-2 bg-indigo-600 px-8 font-bold shadow-none hover:bg-indigo-700"
            >
              {loading ? 'Initializing...' : 'Initialize Syllabus Structure'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content: Module List */}
          <div className="col-span-12 flex flex-col gap-4 lg:col-span-8">
            <div className="flex items-center justify-between">
              <h2 className="font-roboto flex items-center gap-2 text-xl font-bold">
                <Layers className="h-5 w-5 text-indigo-500" />
                Curriculum Modules
              </h2>
              <AddModuleDialog
                syllabusId={syllabus.id}
                onAdd={handleModuleAdd}
              />
            </div>

            {modules.length === 0 ? (
              <Card className="bg-muted/20 border-2 border-dashed py-12 text-center shadow-none">
                <CardContent className="flex flex-col items-center gap-2">
                  <p className="text-muted-foreground font-roboto italic">
                    No modules defined for this syllabus. Add your first unit to
                    get started.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col gap-4">
                {modules
                  .sort((a, b) => a.moduleNumber - b.moduleNumber)
                  .map((mod) => (
                    <Card
                      key={mod.id}
                      className="group overflow-hidden border-2 p-0 shadow-none transition-colors hover:border-indigo-200"
                    >
                      <CardHeader className="bg-muted/30 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="font-roboto flex h-10 w-10 items-center justify-center rounded-lg border-2 bg-white text-lg font-bold shadow-sm dark:bg-zinc-900">
                              {mod.moduleNumber}
                            </div>
                            <div>
                              <CardTitle className="font-roboto text-lg leading-tight">
                                {mod.title}
                              </CardTitle>
                              <div className="mt-1 flex items-center gap-3">
                                <Badge
                                  variant="secondary"
                                  className="font-roboto border py-0 text-[10px] font-bold"
                                >
                                  WEIGHTAGE: {mod.weightage || 0}%
                                </Badge>
                                {mod.coMapping && (
                                  <Badge
                                    variant="outline"
                                    className="font-roboto border-2 border-indigo-100 py-0 text-[10px] font-bold text-indigo-600 dark:border-indigo-900 dark:text-indigo-400"
                                  >
                                    {mod.coMapping}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 border hover:bg-white dark:hover:bg-zinc-800"
                              onClick={() => setEditingModule(mod)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10 h-8 w-8 border"
                              onClick={() => setDeletingModule(mod)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-4">
                        <p className="font-roboto text-muted-foreground mb-4 text-sm">
                          {mod.description ||
                            'No description provided for this unit.'}
                        </p>

                        {/* Topics List */}
                        <div className="bg-muted/5 rounded-lg border-2 border-dashed p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <span className="font-roboto text-muted-foreground text-xs font-bold tracking-widest uppercase">
                              Topics / Sub-units
                            </span>
                            <AddTopicDialog
                              moduleId={mod.id || mod._id}
                              onAdd={handleTopicAdd}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            {(mod.topics || []).length === 0 ? (
                              <div className="flex items-center justify-center py-4">
                                <span className="font-roboto text-muted-foreground text-xs italic">
                                  No topics defined yet.
                                </span>
                              </div>
                            ) : (
                              <div className="grid gap-2">
                                {mod.topics
                                  .sort((a, b) => a.order - b.order)
                                  .map((topic) => (
                                    <div
                                      key={topic.id || topic._id}
                                      className="group/topic flex items-center justify-between rounded-md border-2 border-transparent bg-white p-2 shadow-sm transition-colors hover:border-emerald-100 dark:bg-zinc-900 dark:hover:border-emerald-900"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="text-emerald-500">
                                          <ChevronRight className="h-4 w-4" />
                                        </div>
                                        <span className="font-roboto text-sm font-medium">
                                          {topic.title}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover/topic:opacity-100">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6"
                                          onClick={() => setEditingTopic(topic)}
                                        >
                                          <Edit className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="text-destructive h-6 w-6"
                                          onClick={() =>
                                            setDeletingTopic(topic)
                                          }
                                        >
                                          <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
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
            <Card className="sticky top-4 border-2 p-0 pb-4 shadow-none">
              <CardHeader className="border-b-2 bg-indigo-50/50 py-2 dark:bg-indigo-900/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-roboto flex items-center gap-2 text-lg">
                    <Settings2 className="h-5 w-5 text-indigo-600" />
                    Syllabus Metadata
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700"
                    onClick={() => setEditingSyllabus(syllabus)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 pt-6">
                <div className="flex flex-col gap-2">
                  <label className="font-roboto text-muted-foreground text-xs font-bold tracking-widest uppercase">
                    Description
                  </label>
                  <p className="font-roboto text-foreground bg-muted/30 rounded-lg border p-3 text-sm leading-relaxed">
                    {syllabus.description || 'No detailed description.'}
                  </p>
                </div>

                <Separator className="border-b-2" />

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-roboto text-muted-foreground text-sm">
                      Total Modules
                    </span>
                    <Badge className="font-roboto bg-indigo-600 font-bold">
                      {modules.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-roboto text-muted-foreground text-sm">
                      Total Weightage
                    </span>
                    <Badge
                      variant="outline"
                      className={`font-roboto border-2 font-bold ${
                        modules.reduce(
                          (acc, m) => acc + (m.weightage || 0),
                          0
                        ) === 100
                          ? 'border-emerald-100 text-emerald-600 dark:border-emerald-900'
                          : 'border-amber-100 text-amber-600 dark:border-amber-900'
                      }`}
                    >
                      {modules.reduce((acc, m) => acc + (m.weightage || 0), 0)}%
                    </Badge>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="font-roboto mt-2 w-full border-2 font-bold shadow-none"
                >
                  Edit Metadata
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
