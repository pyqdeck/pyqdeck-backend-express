'use client';

import * as React from 'react';
import {
  Plus,
  Layers,
  Hash,
  BookOpen,
  Percent,
  ClipboardList,
} from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
} from '@/components/ui/field';

export function AddModuleDialogView({
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
          <Button
            size="sm"
            className="font-roboto border-2 bg-indigo-600 font-bold shadow-none hover:bg-indigo-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Module
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="border-2 shadow-none sm:max-w-[500px]">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
              <Layers className="h-5 w-5" />
            </div>
            <DialogTitle className="font-roboto text-xl font-bold">
              New Curriculum Module
            </DialogTitle>
          </div>
          <DialogDescription className="font-roboto text-sm">
            Define a new unit and its learning objectives for this syllabus.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="py-4">
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!errors.moduleNumber}>
                <FieldLabel className="font-roboto font-bold">
                  Module Number
                </FieldLabel>
                <Controller
                  name="moduleNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      className="font-roboto border-2 focus-visible:ring-0"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                      aria-invalid={!!errors.moduleNumber}
                    />
                  )}
                />
                <FieldError errors={[errors.moduleNumber]} />
              </Field>

              <Field data-invalid={!!errors.weightage}>
                <FieldLabel className="font-roboto font-bold">
                  Exam Weightage (%)
                </FieldLabel>
                <Controller
                  name="weightage"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      max="100"
                      className="font-roboto border-2 focus-visible:ring-0"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      aria-invalid={!!errors.weightage}
                    />
                  )}
                />
                <FieldError errors={[errors.weightage]} />
              </Field>
            </div>

            <Field data-invalid={!!errors.title}>
              <FieldLabel className="font-roboto font-bold">
                Module Title
              </FieldLabel>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="e.g. Introduction to Neural Networks"
                    className="font-roboto border-2 focus-visible:ring-0"
                    aria-invalid={!!errors.title}
                  />
                )}
              />
              <FieldError errors={[errors.title]} />
            </Field>

            <Field data-invalid={!!errors.coMapping}>
              <FieldLabel className="font-roboto font-bold">
                CO Mapping
              </FieldLabel>
              <Controller
                name="coMapping"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="e.g. CO1, CO2"
                    className="font-roboto border-2 focus-visible:ring-0"
                    aria-invalid={!!errors.coMapping}
                  />
                )}
              />
              <FieldDescription>
                Map this unit to Course Outcomes.
              </FieldDescription>
              <FieldError errors={[errors.coMapping]} />
            </Field>

            <Field data-invalid={!!errors.description}>
              <FieldLabel className="font-roboto font-bold">
                Learning Objectives
              </FieldLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Detailed scope of the module..."
                    className="font-roboto min-h-[100px] resize-none border-2 focus-visible:ring-0"
                    aria-invalid={!!errors.description}
                  />
                )}
              />
              <FieldError errors={[errors.description]} />
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-roboto h-11 w-full border-2 bg-indigo-600 font-bold shadow-none hover:bg-indigo-700"
            >
              {isSubmitting ? 'Creating...' : 'Add to Syllabus'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
