'use client';

import * as React from 'react';
import { Fragment } from 'react';
import {
  Edit,
  Trash2,
  MoreVertical,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  GripVertical,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddModuleDialog } from './add-module-dialog';
import { DropdownAction } from '@/components/dropdown-action';
import { cn } from '@/lib/utils';

export function SyllabusTableView({
  syllabus,
  modules = [],
  onModuleAdd,
  onTopicAdd,
  onEditModule,
  onDeleteModule,
  onEditTopic,
  onDeleteTopic,
}) {
  const sortedModules = [...modules].sort(
    (a, b) => (a.moduleNumber || 0) - (b.moduleNumber || 0)
  );

  const totalTopics = modules.reduce(
    (acc, m) => acc + (m.topics?.length || 0),
    0
  );
  const totalWeightage = modules.reduce(
    (acc, m) => acc + (m.weightage || 0),
    0
  );

  const syllabusId = syllabus?.id || syllabus?._id;

  return (
    <Card className="border-border/50 overflow-hidden border-2 p-0 shadow-none">
      <CardHeader className="bg-muted/30 border-b-2 px-6 py-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <CardTitle className="font-roboto text-2xl font-bold">
                Curriculum Structure
              </CardTitle>
              <Badge
                className={cn(
                  'font-roboto rounded-full border-none px-2.5 py-0.5 font-bold',
                  syllabus?.isActive
                    ? 'bg-success/10 text-success'
                    : 'bg-warning/10 text-warning'
                )}
              >
                {syllabus?.isActive ? (
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                ) : (
                  <AlertCircle className="mr-1.5 h-3.5 w-3.5" />
                )}
                {syllabus?.isActive ? 'Active' : 'Draft'}
              </Badge>
            </div>
            <CardDescription className="font-roboto max-w-2xl text-sm">
              {syllabus?.description ||
                'Build and organize the modules and learning outcomes for this academic subject.'}
            </CardDescription>

            <div className="flex flex-wrap items-center gap-6 pt-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground font-roboto text-[10px] font-bold tracking-widest uppercase">
                  Modules
                </span>
                <span className="text-foreground font-roboto text-sm font-bold">
                  {sortedModules.length}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground font-roboto text-[10px] font-bold tracking-widest uppercase">
                  Topics
                </span>
                <span className="text-foreground font-roboto text-sm font-bold">
                  {totalTopics}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground font-roboto text-[10px] font-bold tracking-widest uppercase">
                  Total Weightage
                </span>
                <span
                  className={cn(
                    'font-roboto text-sm font-bold',
                    totalWeightage === 100 ? 'text-success' : 'text-warning'
                  )}
                >
                  {totalWeightage}%
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <AddModuleDialog
              syllabusId={syllabusId}
              onAdd={onModuleAdd}
              trigger={
                <Button className="font-roboto h-10 px-5 font-bold shadow-sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Module
                </Button>
              }
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow className="bg-muted/50 border-b-2 hover:bg-transparent">
                <TableHead className="text-foreground font-roboto h-12 px-6 font-bold tracking-tight">
                  Module / Topic Hierarchy
                </TableHead>
                <TableHead className="text-foreground font-roboto hidden h-12 px-6 font-bold tracking-tight lg:table-cell">
                  Description / Content
                </TableHead>
                <TableHead className="text-foreground font-roboto h-12 px-6 text-center font-bold tracking-tight">
                  Weight
                </TableHead>
                <TableHead className="text-foreground font-roboto hidden h-12 px-6 font-bold tracking-tight sm:table-cell">
                  Mapping
                </TableHead>
                <TableHead className="text-foreground font-roboto h-12 w-[80px] px-6 text-right font-bold tracking-tight">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedModules.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-muted-foreground font-roboto h-64 text-center italic"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <FileText className="h-10 w-10 opacity-20" />
                      <p>
                        No curriculum modules defined for this syllabus yet.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                sortedModules.map((mod) => {
                  const moduleId = mod.id || mod._id;
                  const topics = (mod.topics || []).sort(
                    (a, b) => (a.order || 0) - (b.order || 0)
                  );

                  return (
                    <Fragment key={moduleId}>
                      {/* Module Row */}
                      <TableRow className="group bg-muted/5 hover:bg-muted/20 border-b transition-all">
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 text-primary font-roboto ring-primary/10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black ring-1 transition-transform group-hover:scale-105">
                              {mod.moduleNumber}
                            </div>
                            <div className="flex min-w-0 flex-col gap-0.5">
                              <span className="text-foreground group-hover:text-primary font-roboto truncate text-base font-bold transition-colors">
                                {mod.title}
                              </span>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="none"
                                  className="bg-muted text-muted-foreground font-roboto h-4 rounded-full px-2 text-[9px] font-bold"
                                >
                                  MODULE
                                </Badge>
                                <span className="text-muted-foreground font-roboto text-[11px] font-medium italic">
                                  {topics.length} learning units
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground hidden max-w-[300px] px-6 py-4 lg:table-cell">
                          <p className="line-clamp-2 text-xs leading-relaxed">
                            {mod.description ||
                              'No detailed description provided for this module.'}
                          </p>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-center">
                          <Badge className="bg-primary/5 text-primary font-roboto border-none font-bold">
                            {mod.weightage || 0}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground hidden px-6 py-4 font-mono text-[10px] font-bold sm:table-cell">
                          {mod.coMapping || 'UNMAPPED'}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-right">
                          <DropdownAction
                            trigger={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-muted size-9 rounded-xl border-2 transition-colors"
                              >
                                <MoreVertical className="size-4" />
                              </Button>
                            }
                          >
                            <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-[10px] font-bold tracking-widest uppercase">
                              Module Options
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                              className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                              onClick={() => onEditModule?.(mod)}
                            >
                              <Edit className="text-muted-foreground group-hover:text-primary mr-3 size-4 transition-colors" />
                              <span className="font-medium">Edit Content</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                              onClick={() => onTopicAdd?.(mod)}
                            >
                              <Plus className="text-muted-foreground group-hover:text-success mr-3 size-4 transition-colors" />
                              <span className="font-medium">Add New Topic</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1 border-b" />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5"
                              onClick={() => onDeleteModule?.(mod)}
                            >
                              <Trash2 className="text-destructive/70 group-hover:text-destructive mr-3 size-4 transition-colors" />
                              <span className="font-bold">Remove Module</span>
                            </DropdownMenuItem>
                          </DropdownAction>
                        </TableCell>
                      </TableRow>

                      {/* Topic Rows */}
                      {topics.map((topic, index) => {
                        const topicId = topic.id || topic._id;
                        const isLast = index === topics.length - 1;

                        return (
                          <TableRow
                            key={topicId}
                            className={cn(
                              'group hover:bg-muted/10 border-b transition-colors',
                              isLast && 'border-muted/50 border-b-2'
                            )}
                          >
                            <TableCell className="py-3 pr-6 pl-16">
                              <div className="flex items-center gap-3">
                                <div className="text-muted-foreground/30 shrink-0">
                                  <ChevronRight className="size-3.5" />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-foreground font-roboto text-sm font-semibold">
                                    {topic.title}
                                  </span>
                                  <Badge
                                    variant="none"
                                    className="bg-muted/50 text-muted-foreground/70 h-3.5 w-fit rounded px-1.5 text-[8px] font-bold"
                                  >
                                    TOPIC
                                  </Badge>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground hidden max-w-[300px] px-6 py-3 lg:table-cell">
                              <p className="line-clamp-1 text-xs italic opacity-70">
                                {topic.description || 'No summary available.'}
                              </p>
                            </TableCell>
                            <TableCell className="px-6 py-3 text-center">
                              <span className="text-muted-foreground font-roboto text-xs font-bold opacity-30">
                                —
                              </span>
                            </TableCell>
                            <TableCell className="hidden px-6 py-3 sm:table-cell">
                              <span className="text-muted-foreground font-roboto text-xs font-bold opacity-30">
                                —
                              </span>
                            </TableCell>
                            <TableCell className="px-6 py-3 text-right">
                              <DropdownAction
                                trigger={
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-muted size-8 rounded-lg opacity-0 transition-all group-hover:opacity-100"
                                  >
                                    <MoreVertical className="size-3.5" />
                                  </Button>
                                }
                              >
                                <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-[10px] font-bold tracking-widest uppercase">
                                  Topic Options
                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                  className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                                  onClick={() => onEditTopic?.(topic)}
                                >
                                  <Edit className="text-muted-foreground group-hover:text-primary mr-3 size-3.5 transition-colors" />
                                  <span className="font-medium">
                                    Edit Details
                                  </span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="my-1 border-b" />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5"
                                  onClick={() => onDeleteTopic?.(topic)}
                                >
                                  <Trash2 className="text-destructive/70 group-hover:text-destructive mr-3 size-3.5 transition-colors" />
                                  <span className="font-bold">
                                    Delete Topic
                                  </span>
                                </DropdownMenuItem>
                              </DropdownAction>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </Fragment>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
