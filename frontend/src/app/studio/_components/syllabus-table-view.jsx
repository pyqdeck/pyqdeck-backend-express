'use client';

import * as React from 'react';
import { Fragment } from 'react';
import {
  Edit,
  Trash2,
  MoreVertical,
  Plus,
  BookOpen,
  Hash,
  Layers,
  CheckCircle2,
  AlertCircle,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
    <Card className="border-border/50 border-2 shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <CardTitle className="font-roboto text-xl">
                Curriculum Structure
              </CardTitle>
              <Badge
                variant={syllabus?.isActive ? 'success' : 'secondary'}
                className="font-roboto border-2 font-bold"
              >
                {syllabus?.isActive ? (
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                ) : (
                  <AlertCircle className="mr-1 h-3 w-3" />
                )}
                {syllabus?.isActive ? 'Active' : 'Draft'}
              </Badge>
            </div>
            <CardDescription className="font-roboto">
              {syllabus?.description || 'No description provided.'}
            </CardDescription>
            <div className="mt-3 flex items-center gap-4">
              <span className="text-muted-foreground text-xs font-medium">
                <strong className="text-foreground">
                  {sortedModules.length}
                </strong>{' '}
                Modules
              </span>
              <span className="text-muted-foreground text-xs font-medium">
                <strong className="text-foreground">{totalTopics}</strong>{' '}
                Topics
              </span>
              <span className="text-muted-foreground text-xs font-medium">
                <strong
                  className={
                    totalWeightage === 100 ? 'text-success' : 'text-warning'
                  }
                >
                  {totalWeightage}%
                </strong>{' '}
                Weightage
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AddModuleDialog syllabusId={syllabusId} onAdd={onModuleAdd} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 hover:bg-transparent">
              <TableHead className="font-roboto text-foreground font-bold tracking-wider uppercase">
                Module / Topic
              </TableHead>
              <TableHead className="font-roboto text-foreground font-bold tracking-wider uppercase">
                Description
              </TableHead>
              <TableHead className="font-roboto text-foreground text-center font-bold tracking-wider uppercase">
                Weightage
              </TableHead>
              <TableHead className="font-roboto text-foreground font-bold tracking-wider uppercase">
                CO Mapping
              </TableHead>
              <TableHead className="text-foreground w-[100px] text-right font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedModules.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="font-roboto text-muted-foreground h-48 text-center italic"
                >
                  No modules defined. Add your first module to get started.
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
                    <TableRow className="group hover:bg-muted/30 border-b transition-colors">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="border-primary/20 bg-primary/5 text-primary font-roboto flex h-10 w-10 items-center justify-center rounded-xl border-2 text-lg font-black transition-transform group-hover:scale-110">
                            {mod.moduleNumber}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-roboto text-foreground group-hover:text-primary cursor-pointer font-bold transition-colors">
                              {mod.title}
                            </span>
                            <span className="text-muted-foreground text-xs font-medium">
                              {topics.length} topics
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-[250px] truncate text-sm">
                        {mod.description || '-'}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className="bg-muted/50 font-roboto border-2 font-bold"
                        >
                          {mod.weightage || 0}%
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {mod.coMapping || '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="hover:bg-muted/50 h-9 w-9 rounded-md border-2 p-0 transition-colors"
                            >
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="font-roboto w-56 border-2 p-2 shadow-none"
                          >
                            <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
                              Module Actions
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="my-1 border-b" />
                            <DropdownMenuItem
                              className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                              onClick={() => onEditModule?.(mod)}
                            >
                              <Edit className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                              <span className="font-medium">Edit Module</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                              onClick={() => onTopicAdd?.(moduleId)}
                            >
                              <Plus className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                              <span className="font-medium">Add Topic</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1 border-b" />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5"
                              onClick={() => onDeleteModule?.(mod)}
                            >
                              <Trash2 className="text-destructive/70 group-hover:text-destructive mr-3 h-4 w-4 transition-colors" />
                              <span className="font-bold">Delete Module</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>

                    {/* Topic Rows */}
                    {topics.map((topic) => {
                      const topicId = topic.id || topic._id;
                      return (
                        <TableRow
                          key={topicId}
                          className="group hover:bg-muted/20 bg-muted/10 border-b"
                        >
                          <TableCell className="py-3 pl-12">
                            <div className="flex items-center gap-2">
                              <div className="text-muted-foreground/40 text-xs">
                                └─
                              </div>
                              <span className="font-roboto text-sm">
                                {topic.title}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground max-w-[250px] truncate text-xs">
                            {topic.description || '-'}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-center text-xs">
                            -
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs">
                            -
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="hover:bg-muted/50 h-7 w-7 rounded-md border p-0 transition-colors"
                                >
                                  <MoreVertical className="h-3.5 w-3.5" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="font-roboto w-48 border-2 p-2 shadow-none"
                              >
                                <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
                                  Topic Actions
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="my-1 border-b" />
                                <DropdownMenuItem
                                  className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                                  onClick={() => onEditTopic?.(topic)}
                                >
                                  <Edit className="text-muted-foreground group-hover:text-primary mr-3 h-3.5 w-3.5 transition-colors" />
                                  <span className="font-medium">
                                    Edit Topic
                                  </span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="my-1 border-b" />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5"
                                  onClick={() => onDeleteTopic?.(topic)}
                                >
                                  <Trash2 className="text-destructive/70 group-hover:text-destructive mr-3 h-3.5 w-3.5 transition-colors" />
                                  <span className="font-bold">
                                    Remove Topic
                                  </span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
      </CardContent>
    </Card>
  );
}
