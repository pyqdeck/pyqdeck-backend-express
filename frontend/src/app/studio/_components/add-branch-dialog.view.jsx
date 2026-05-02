'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AddBranchDialogView({
  universities = [],
  form,
  onSubmit,
  open,
  onOpenChange,
  trigger = true,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors = {}, isSubmitting = false } = {},
  } = form || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          <Button className="font-roboto border-2 font-bold shadow-none">
            <Plus className="mr-2 h-4 w-4" /> Add Branch
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="border-2 shadow-none sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="font-roboto text-xl font-bold">
            Add New Branch
          </DialogTitle>
          <DialogDescription className="font-roboto">
            Create a new academic branch for a specific university.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label htmlFor="universityId" className="font-roboto font-bold">
              University
            </Label>
            <Controller
              name="universityId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="font-roboto w-full border-2 focus:ring-0">
                    <SelectValue placeholder="Select a university" />
                  </SelectTrigger>
                  <SelectContent className="border-2 shadow-none">
                    {universities.map((uni) => (
                      <SelectItem
                        key={uni.id}
                        value={uni.id}
                        className="font-roboto"
                      >
                        {uni.name} ({uni.shortName})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.universityId && (
              <p className="font-roboto text-destructive text-xs font-bold">
                {errors.universityId.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name" className="font-roboto font-bold">
              Branch Name
            </Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  placeholder="e.g. Computer Engineering"
                  className="font-roboto border-2 focus-visible:ring-0"
                />
              )}
            />
            {errors.name && (
              <p className="font-roboto text-destructive text-xs font-bold">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="shortName" className="font-roboto font-bold">
                Short Name
              </Label>
              <Controller
                name="shortName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="shortName"
                    placeholder="e.g. COMP"
                    className="font-roboto border-2 focus-visible:ring-0"
                  />
                )}
              />
              {errors.shortName && (
                <p className="font-roboto text-destructive text-xs font-bold">
                  {errors.shortName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="branchCode" className="font-roboto font-bold">
                Branch Code
              </Label>
              <Controller
                name="branchCode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="branchCode"
                    placeholder="e.g. 07"
                    className="font-roboto border-2 focus-visible:ring-0"
                  />
                )}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug" className="font-roboto font-bold">
              URL Slug
            </Label>
            <Controller
              name="slug"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="slug"
                  placeholder="e.g. computer-engineering"
                  className="font-roboto border-2 focus-visible:ring-0"
                />
              )}
            />
            {errors.slug && (
              <p className="font-roboto text-destructive text-xs font-bold">
                {errors.slug.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-roboto w-full border-2 font-bold shadow-none"
            >
              {isSubmitting ? 'Creating Branch...' : 'Create Branch'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
