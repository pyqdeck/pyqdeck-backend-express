'use client';

import * as React from 'react';
import {
  MoreVertical,
  Edit2,
  ExternalLink,
  Trash2,
  Search,
  GraduationCap,
  Layers,
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export function UniversitiesTableView({
  universities,
  pagination,
  search,
  onSearchChange,
  onEdit,
  onDelete,
}) {
  return (
    <Card className="border-border/50 border-2 shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-roboto text-xl">
              Institution Database
            </CardTitle>
            <CardDescription className="font-roboto">
              Total {pagination?.total || universities.length} universities
              registered.
            </CardDescription>
          </div>
          <div className="relative w-72">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search universities..."
              className="font-roboto border-2 pl-9 focus-visible:ring-0"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 hover:bg-transparent">
              <TableHead className="text-foreground font-roboto w-[400px] font-bold">
                Institution
              </TableHead>
              <TableHead className="text-foreground font-roboto font-bold">
                State
              </TableHead>
              <TableHead className="text-foreground font-roboto font-bold">
                Country
              </TableHead>
              <TableHead className="text-foreground font-roboto font-bold">
                Status
              </TableHead>
              <TableHead className="text-foreground font-roboto w-[100px] text-right font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {universities.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground font-roboto h-48 text-center italic"
                >
                  {search
                    ? 'No universities match your search.'
                    : 'No universities found. Add your first institution to get started!'}
                </TableCell>
              </TableRow>
            ) : (
              universities.map((uni) => (
                <TableRow key={uni.id} className="group border-b">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="border-muted bg-muted/50 h-12 w-12 rounded-lg border-2">
                        <AvatarImage src={uni.logo} alt={uni.name} />
                        <AvatarFallback className="rounded-lg">
                          {uni.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-foreground group-hover:text-primary font-roboto flex cursor-pointer items-center gap-1 font-bold transition-colors">
                          {uni.name}
                          <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                        </span>
                        <span className="text-muted-foreground font-roboto text-xs lowercase">
                          /{uni.slug}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-foreground font-roboto text-sm font-medium">
                      {uni.state || 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-muted-foreground font-roboto flex items-center gap-2 text-sm">
                      {uni.country || 'India'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={uni.isActive !== false ? 'default' : 'secondary'}
                      className={`font-roboto rounded-full px-2.5 py-0.5 font-semibold ${
                        uni.isActive !== false
                          ? 'bg-success/10 text-success hover:bg-success/10 dark:bg-success/10 dark:text-success'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {uni.isActive !== false ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="hover:bg-muted/50 h-9 w-9 border-2 p-0 transition-colors"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="font-roboto w-56 border-2 p-2 shadow-none"
                      >
                        <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
                          Management
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1 border-b" />
                        <DropdownMenuItem
                          className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                          onClick={() => onEdit(uni)}
                        >
                          <Edit2 className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                          <span className="font-medium">Edit University</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          asChild
                          className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                        >
                          <Link
                            href={uni.websiteUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center"
                          >
                            <ExternalLink className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                            <span className="font-medium">Visit Website</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 border-b" />
                        <DropdownMenuItem
                          asChild
                          className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                        >
                          <Link
                            href={`/studio/branches?universityId=${uni.id}`}
                            className="flex w-full items-center"
                          >
                            <Layers className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                            <span className="text-primary font-medium">
                              View Branches
                            </span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          asChild
                          className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                        >
                          <Link
                            href={`/studio/semesters?universityId=${uni.id}`}
                            className="flex w-full items-center"
                          >
                            <GraduationCap className="text-muted-foreground group-hover:text-warning mr-3 h-4 w-4 transition-colors" />
                            <span className="text-warning font-medium">
                              View Semesters
                            </span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 border-b" />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5"
                          onClick={() => onDelete(uni)}
                        >
                          <Trash2 className="text-destructive/70 group-hover:text-destructive mr-3 h-4 w-4 transition-colors" />
                          <span className="font-bold">Delete Institution</span>
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
                // Show current page, first, last, and neighbors
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
