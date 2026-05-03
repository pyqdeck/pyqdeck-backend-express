'use client';

import * as React from 'react';
import {
  Edit,
  Trash2,
  MoreVertical,
  BookOpen,
  Hash,
  Search,
  FileText,
  Layers,
  GraduationCap,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  CardFooter,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

export function SubjectsTableView({
  subjects = [],
  pagination,
  search,
  onSearchChange,
  onEdit,
  onDelete,
  loading = false,
}) {
  if (loading) {
    return (
      <Card className="border-border/50 border-2 shadow-none">
        <CardHeader className="pb-3">
          <Skeleton className="mb-2 h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[300px]">Subject</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Resources</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 border-2 shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-roboto text-xl">
              Curriculum Database
            </CardTitle>
            <CardDescription className="font-roboto">
              Global repository of academic subjects and course content.
            </CardDescription>
          </div>
          <div className="relative w-72">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search by name or code..."
              className="font-roboto border-2 pl-9 focus-visible:ring-0"
              value={search}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 hover:bg-transparent">
              <TableHead className="font-roboto text-foreground font-bold tracking-wider uppercase">
                Subject
              </TableHead>
              <TableHead className="font-roboto text-foreground font-bold tracking-wider uppercase">
                Code
              </TableHead>
              <TableHead className="font-roboto text-foreground font-bold tracking-wider uppercase">
                Status
              </TableHead>
              <TableHead className="font-roboto text-foreground text-center font-bold tracking-wider uppercase">
                Units
              </TableHead>
              <TableHead className="text-foreground w-[100px] text-right font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="font-roboto text-muted-foreground h-48 text-center italic"
                >
                  {search
                    ? 'No subjects match your search criteria.'
                    : 'No subjects found in the curriculum database.'}
                </TableCell>
              </TableRow>
            ) : (
              subjects.map((subject) => (
                <TableRow
                  key={subject.id}
                  className="group hover:bg-muted/30 border-b transition-colors"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="border-primary/20 bg-primary/5 text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-primary flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-transform group-hover:scale-110">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-roboto text-foreground group-hover:text-primary cursor-pointer font-bold transition-colors">
                          {subject.name}
                        </span>
                        <span className="text-muted-foreground font-roboto text-xs italic">
                          /{subject.slug}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Hash className="text-muted-foreground h-3.5 w-3.5" />
                      <Badge
                        variant="outline"
                        className="bg-muted/50 border-2 font-mono font-bold tracking-tighter uppercase"
                      >
                        {subject.code || 'NO-CODE'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={subject.isActive ? 'success' : 'secondary'}
                      className={`font-roboto border-2 font-bold ${
                        subject.isActive
                          ? 'bg-success/10 text-success hover:bg-success/10 dark:bg-success/10 dark:text-success'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {subject.isActive ? 'Active' : 'Archived'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="font-roboto text-muted-foreground flex items-center gap-1.5 text-xs font-bold">
                        <Layers className="h-3 w-3" />
                        <span>{subject.units?.length || 0} Modules</span>
                      </div>
                    </div>
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
                          Content Management
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1 border-b" />
                        <DropdownMenuItem
                          className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                          onClick={() => onEdit?.(subject)}
                        >
                          <Edit className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                          <span className="font-medium">Edit Curriculum</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5">
                          <FileText className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                          <span className="text-primary font-medium">
                            Syllabus Details
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 border-b" />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5"
                          onClick={() => onDelete?.(subject)}
                        >
                          <Trash2 className="text-destructive/70 group-hover:text-destructive mr-3 h-4 w-4 transition-colors" />
                          <span className="font-bold">Remove Subject</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      {pagination && pagination.pages > 1 && (
        <CardFooter className="border-t-2 pt-6">
          <Pagination className="mx-0 w-auto justify-start">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={
                    pagination.current > 1
                      ? `?page=${pagination.current - 1}`
                      : '#'
                  }
                  className={
                    pagination.current === 1
                      ? 'pointer-events-none opacity-50'
                      : 'border-2'
                  }
                />
              </PaginationItem>

              {[...Array(pagination.pages)].map((_, i) => {
                const pageNumber = i + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === pagination.pages ||
                  (pageNumber >= pagination.current - 1 &&
                    pageNumber <= pagination.current + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href={`?page=${pageNumber}`}
                        isActive={pageNumber === pagination.current}
                        className="font-roboto border-2 font-bold"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                if (
                  pageNumber === pagination.current - 2 ||
                  pageNumber === pagination.current + 2
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  href={
                    pagination.current < pagination.pages
                      ? `?page=${pagination.current + 1}`
                      : '#'
                  }
                  className={
                    pagination.current === pagination.pages
                      ? 'pointer-events-none opacity-50'
                      : 'border-2'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="text-muted-foreground font-roboto ml-auto text-sm">
            Showing{' '}
            <span className="text-foreground font-bold">
              {(pagination.current - 1) * 10 + 1}
            </span>{' '}
            to{' '}
            <span className="text-foreground font-bold">
              {Math.min(pagination.current * 10, pagination.total)}
            </span>{' '}
            of{' '}
            <span className="text-foreground font-bold">
              {pagination.total}
            </span>{' '}
            entries
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
