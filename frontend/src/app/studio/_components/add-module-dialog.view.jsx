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
      <DialogContent className="overflow-hidden border-2 bg-white p-0 shadow-xl sm:max-w-[550px] dark:bg-zinc-950">
        <DialogHeader className="border-b-2 bg-indigo-50/50 px-6 pt-6 pb-4 dark:bg-indigo-950/20">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none">
              <Layers className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="font-roboto text-2xl font-black text-indigo-950 dark:text-indigo-50">
                New Curriculum Module
              </DialogTitle>
              <DialogDescription className="font-roboto text-sm font-medium text-indigo-700/70 dark:text-indigo-300/70">
                Define a new unit and its learning objectives.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 bg-slate-50/50 p-6 dark:bg-zinc-900/20">
            <FieldGroup>
              <div className="grid grid-cols-2 gap-6">
                <Field data-invalid={!!errors.moduleNumber}>
                  <FieldLabel className="font-roboto text-muted-foreground mb-1.5 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                    <Hash className="h-3.5 w-3.5" /> Module Number
                  </FieldLabel>
                  <Controller
                    name="moduleNumber"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        min="1"
                        className="font-roboto h-12 border-2 bg-white text-lg font-bold shadow-sm focus-visible:border-indigo-600 focus-visible:ring-indigo-600/20 dark:bg-zinc-900"
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
                  <FieldLabel className="font-roboto text-muted-foreground mb-1.5 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                    <Percent className="h-3.5 w-3.5" /> Exam Weightage
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
                        className="font-roboto h-12 border-2 bg-white text-lg font-bold shadow-sm focus-visible:border-indigo-600 focus-visible:ring-indigo-600/20 dark:bg-zinc-900"
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

              <div className="space-y-6">
                <Field data-invalid={!!errors.title}>
                  <FieldLabel className="font-roboto text-muted-foreground mb-1.5 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                    <BookOpen className="h-3.5 w-3.5" /> Module Title
                  </FieldLabel>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="e.g. Introduction to Neural Networks"
                        className="font-roboto h-12 border-2 bg-white text-base font-semibold shadow-sm focus-visible:border-indigo-600 focus-visible:ring-indigo-600/20 dark:bg-zinc-900"
                        aria-invalid={!!errors.title}
                      />
                    )}
                  />
                  <FieldError errors={[errors.title]} />
                </Field>

                <Field data-invalid={!!errors.coMapping}>
                  <FieldLabel className="font-roboto text-muted-foreground mb-1.5 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                    <ClipboardList className="h-3.5 w-3.5" /> CO Mapping
                  </FieldLabel>
                  <Controller
                    name="coMapping"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="e.g. CO1, CO2"
                        className="font-roboto h-11 border-2 bg-white text-sm shadow-sm focus-visible:border-indigo-600 focus-visible:ring-indigo-600/20 dark:bg-zinc-900"
                        aria-invalid={!!errors.coMapping}
                      />
                    )}
                  />
                  <FieldDescription className="text-xs italic">
                    Map this unit to specific Course Outcomes.
                  </FieldDescription>
                  <FieldError errors={[errors.coMapping]} />
                </Field>

                <Field data-invalid={!!errors.description}>
                  <FieldLabel className="font-roboto text-muted-foreground mb-1.5 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                    Learning Objectives
                  </FieldLabel>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Detail the scope and objectives of this module..."
                        className="font-roboto min-h-[120px] resize-none border-2 bg-white text-sm shadow-sm focus-visible:border-indigo-600 focus-visible:ring-indigo-600/20 dark:bg-zinc-900"
                        aria-invalid={!!errors.description}
                      />
                    )}
                  />
                  <FieldError errors={[errors.description]} />
                </Field>
              </div>
            </FieldGroup>
          </div>

          <DialogFooter className="bg-muted/20 border-t-2 px-6 py-4 pb-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-roboto h-12 w-full border-2 bg-indigo-600 text-base font-black tracking-wider text-white uppercase shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-600/40 active:scale-[0.98] dark:shadow-none"
            >
              {isSubmitting ? (
                'Creating Module...'
              ) : (
                <>
                  <Plus className="mr-2 h-5 w-5" /> Add Module to Curriculum
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
