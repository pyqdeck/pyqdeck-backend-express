'use client';

import * as React from 'react';
import {
  MoreVertical,
  ShieldCheck,
  User as UserIcon,
  Search,
  UserCog,
  Mail,
  Calendar,
  ExternalLink,
  UserMinus,
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
import { cn } from '@/lib/utils';

export function UsersTableView({
  users = [],
  pagination,
  search,
  onSearchChange,
  onUpdateRole,
  isUpdating,
}) {
  return (
    <Card className="border-border/50 border-2 shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-roboto text-xl">
              User Directory
            </CardTitle>
            <CardDescription className="font-roboto">
              Total {pagination?.total || users.length} users registered.
            </CardDescription>
          </div>
          <div className="relative w-72">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search users..."
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
                User Identity
              </TableHead>
              <TableHead className="text-foreground font-roboto font-bold">
                Role
              </TableHead>
              <TableHead className="text-foreground font-roboto font-bold">
                Affiliation
              </TableHead>
              <TableHead className="text-foreground font-roboto font-bold">
                Joined
              </TableHead>
              <TableHead className="text-foreground font-roboto w-[100px] text-right font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground font-roboto h-48 text-center italic"
                >
                  {search
                    ? 'No users match your search.'
                    : 'No users found on the platform yet.'}
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.clerkId} className="group border-b">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="border-muted bg-muted/50 h-12 w-12 rounded-lg border-2 after:rounded-lg">
                        <AvatarImage
                          src={user.avatarUrl}
                          alt={user.name}
                          className="rounded-lg"
                        />
                        <AvatarFallback className="rounded-lg">
                          {user.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-foreground group-hover:text-primary font-roboto flex cursor-pointer items-center gap-1 font-bold transition-colors">
                          {user.name}
                          {user.isMe && (
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/10 ml-1 h-4 rounded-full border-none px-1.5 text-[9px] font-bold">
                              YOU
                            </Badge>
                          )}
                          <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                        </span>
                        <span className="text-muted-foreground font-roboto text-xs lowercase">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`font-roboto rounded-full px-2.5 py-0.5 font-semibold ${
                        user.role === 'admin'
                          ? 'bg-success/10 text-success hover:bg-success/10'
                          : user.role === 'editor'
                            ? 'bg-warning/10 text-warning hover:bg-warning/10'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-foreground font-roboto text-sm font-medium">
                        {user.university?.shortName || 'Independent'}
                      </span>
                      <span className="text-muted-foreground font-roboto text-[10px] font-bold tracking-tight uppercase">
                        {user.branch?.name || 'Global'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-muted-foreground font-roboto flex items-center gap-2 text-sm">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(user.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="hover:bg-muted/50 h-9 w-9 border-2 p-0 transition-colors"
                          disabled={isUpdating || user.isMe}
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
                          Permissions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1 border-b" />
                        <DropdownMenuItem
                          className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                          onClick={() => onUpdateRole(user.clerkId, 'admin')}
                        >
                          <ShieldCheck className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                          <span className="font-medium">Make Admin</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                          onClick={() => onUpdateRole(user.clerkId, 'editor')}
                        >
                          <UserCog className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                          <span className="font-medium">Assign Editor</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 border-b" />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5"
                          onClick={() => onUpdateRole(user.clerkId, 'normal')}
                        >
                          <UserMinus className="text-destructive/70 group-hover:text-destructive mr-3 h-4 w-4 transition-colors" />
                          <span className="font-bold">Revoke Permissions</span>
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
                  href={`?page=${Math.max(1, pagination.page - 1)}${
                    search ? `&search=${search}` : ''
                  }`}
                  className={cn(
                    'border-2 font-bold',
                    pagination.page === 1 && 'pointer-events-none opacity-50'
                  )}
                />
              </PaginationItem>

              {[...Array(pagination.pages)].map((_, i) => {
                const pageNumber = i + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === pagination.pages ||
                  (pageNumber >= pagination.page - 1 &&
                    pageNumber <= pagination.page + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href={`?page=${pageNumber}${
                          search ? `&search=${search}` : ''
                        }`}
                        isActive={pageNumber === pagination.page}
                        className="font-roboto border-2 font-bold"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                if (
                  pageNumber === pagination.page - 2 ||
                  pageNumber === pagination.page + 2
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
                  href={`?page=${Math.min(
                    pagination.pages,
                    pagination.page + 1
                  )}${search ? `&search=${search}` : ''}`}
                  className={cn(
                    'border-2 font-bold',
                    pagination.page === pagination.pages &&
                      'pointer-events-none opacity-50'
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="text-muted-foreground font-roboto ml-auto text-sm">
            Showing{' '}
            <span className="text-foreground font-bold">
              {(pagination.page - 1) * pagination.limit + 1}
            </span>{' '}
            to{' '}
            <span className="text-foreground font-bold">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
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
