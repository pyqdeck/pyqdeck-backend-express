'use client';

import * as React from 'react';
import {
  AlertCircle,
  Check,
  ClipboardCheck,
  Edit2,
  FileSpreadsheet,
  FileText,
  GripVertical,
  MoreVertical,
  Plus,
  Trash2,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { BranchForm } from './branch-form';

// ─── Resizable sheet wrapper ──────────────────────────────────────────────────
const MIN_WIDTH = 380;
const MAX_WIDTH = 1400;
const DEFAULT_WIDTH = 720;

function ResizableSheetContent({ children, className, ...props }) {
  const [width, setWidth] = React.useState(DEFAULT_WIDTH);
  const isResizing = React.useRef(false);
  const startX = React.useRef(0);
  const startWidth = React.useRef(0);

  const onMouseDown = (e) => {
    e.preventDefault();
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = width;
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };

  React.useEffect(() => {
    const onMouseMove = (e) => {
      if (!isResizing.current) return;
      const delta = startX.current - e.clientX;
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth.current + delta));
      setWidth(next);
    };
    const onMouseUp = () => {
      if (!isResizing.current) return;
      isResizing.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [width]);

  const onTouchStart = (e) => {
    isResizing.current = true;
    startX.current = e.touches[0].clientX;
    startWidth.current = width;
  };

  React.useEffect(() => {
    const onTouchMove = (e) => {
      if (!isResizing.current) return;
      const delta = startX.current - e.touches[0].clientX;
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth.current + delta));
      setWidth(next);
    };
    const onTouchEnd = () => { isResizing.current = false; };
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <SheetContent
      {...props}
      style={{ width, maxWidth: '100vw' }}
      className={cn(
        'flex h-full flex-col gap-0 overflow-hidden border-l p-0 shadow-2xl',
        '[&]:sm:max-w-none',
        className
      )}
    >
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className="absolute left-0 top-0 z-50 flex h-full w-3 cursor-ew-resize flex-col items-center justify-center group hover:bg-primary/10 transition-colors"
      >
        <div className="flex flex-col items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <GripVertical className="size-4 text-muted-foreground" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-1 w-px bg-border group-hover:bg-primary/40" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pl-3">
        {children}
      </div>
    </SheetContent>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ImportBranchesView({
  open,
  onOpenChange,
  file,
  onFileChange,
  pastedText,
  onPastedTextChange,
  onProcessPaste,
  data,
  onDataChange,
  errors,
  isImporting,
  onImport,
  editingIndex,
  setEditingIndex,
  editForm,
  onEditSubmit,
  branchSchema,
  universityName,
}) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('upload');

  const getRowStatus = (row) => {
    try {
      branchSchema.parse(row);
      return { valid: true };
    } catch (err) {
      return { valid: false, errors: err.errors || [] };
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      onFileChange(droppedFile);
    }
  };

  const removeRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    onDataChange(newData);
  };

  const addRow = () => {
    const newRow = {
      name: '',
      shortName: '',
      branchCode: '',
      slug: '',
      isActive: true,
    };
    onDataChange([newRow, ...data]);
    setEditingIndex(0);
    editForm.reset(newRow);
  };

  const hasData = file || data.length > 0;
  const allValid = data.length > 0 && data.every((row) => getRowStatus(row).valid);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <ResizableSheetContent>
          <SheetHeader className="shrink-0 border-b bg-muted/5 px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  {hasData ? (
                    <FileText className="size-5 text-primary" />
                  ) : (
                    <FileSpreadsheet className="size-5 text-primary" />
                  )}
                </div>
                <div className="min-w-0">
                  <SheetTitle className="truncate text-base font-black leading-none tracking-tight sm:text-xl">
                    {hasData ? (file ? file.name : 'Pasted Content') : 'Import Branches'}
                  </SheetTitle>
                  <SheetDescription className="mt-0.5 truncate text-xs">
                    {hasData ? (
                      <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-muted-foreground">
                        {file ? `${(file.size / 1024).toFixed(1)} KB · ` : ''}
                        {data.length} records for {universityName}
                      </span>
                    ) : (
                      `Bulk import branches for ${universityName}.`
                    )}
                  </SheetDescription>
                </div>
              </div>

              {hasData && (
                <div className="flex items-center gap-2 pr-8">
                  <Menubar className="h-auto border-none bg-transparent p-0 shadow-none">
                    <MenubarMenu>
                      <MenubarTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </MenubarTrigger>
                      <MenubarContent align="end" sideOffset={8} className="min-w-[160px]">
                        <MenubarItem onClick={addRow} className="cursor-pointer gap-2">
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add Row</span>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem
                          onClick={() => { onFileChange(null); onDataChange([]); }}
                          className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Clear All</span>
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </div>
              )}
            </div>
          </SheetHeader>

          <div className="min-h-0 flex-1 overflow-hidden">
            {!hasData && (
              <div className="flex h-full flex-col px-4 py-6 sm:px-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full flex-col">
                  <TabsList variant="pill" className="mx-auto mb-6">
                    <TabsTrigger value="upload">
                      <Upload className="mr-1.5 size-3.5" />
                      Upload File
                    </TabsTrigger>
                    <TabsTrigger value="paste">
                      <ClipboardCheck className="mr-1.5 size-3.5" />
                      Paste CSV
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="mt-0 flex flex-1 items-center justify-center outline-none">
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={cn(
                        'flex w-full max-w-sm flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 transition-all sm:p-10',
                        isDragging
                          ? 'scale-[1.02] border-primary bg-primary/5'
                          : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30'
                      )}
                    >
                      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 sm:size-16">
                        <Upload className="size-7 text-primary sm:size-8" />
                      </div>
                      <div className="text-center">
                        <p className="text-base font-bold sm:text-lg">Drop your CSV file here</p>
                        <p className="mt-1 text-sm text-muted-foreground">or click to browse your files</p>
                      </div>
                      <input type="file" accept=".csv" className="hidden" id="csv-upload" onChange={(e) => onFileChange(e.target.files?.[0])} />
                      <Button asChild variant="outline" className="mt-2 border-2 font-bold">
                        <label htmlFor="csv-upload" className="cursor-pointer">Select File</label>
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="paste" className="mt-0 flex flex-col gap-4 outline-none">
                    <div className="relative">
                      <Textarea
                        placeholder="Paste your CSV content here (including header row)..."
                        className="h-[380px] w-full resize-none border-2 bg-muted/10 p-4 font-mono text-xs focus-visible:ring-0"
                        value={pastedText}
                        onChange={(e) => onPastedTextChange(e.target.value)}
                      />
                      {pastedText && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute right-3 top-3 h-7 border px-2 text-xs font-bold shadow-sm"
                          onClick={() => onPastedTextChange('')}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <div className="flex justify-center gap-3">
                      <Button variant="outline" onClick={() => onOpenChange(false)} className="min-w-[100px] border-2 font-bold">
                        Cancel
                      </Button>
                      <Button disabled={!pastedText.trim()} onClick={onProcessPaste} className="min-w-[140px] font-bold">
                        <Plus className="size-4" />
                        Process Data
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
                <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                  <AlertCircle className="size-3 shrink-0" />
                  Only .csv format is supported. Ensure the first row contains headers.
                </p>
              </div>
            )}

            {hasData && (
              <div className="flex h-full flex-col overflow-hidden">
                <div className="hidden shrink-0 border-b bg-muted/50 px-4 py-2 sm:grid sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_100px_72px] sm:gap-4 sm:px-6">
                  {['Branch Details', 'Code', 'Status', ''].map((h, i) => (
                    <div key={h + i} className={cn('text-[10px] font-black uppercase tracking-widest text-muted-foreground', i === 3 && 'text-right')}>
                      {h}
                    </div>
                  ))}
                </div>

                {errors?.length > 0 && (
                  <div className="shrink-0 px-4 py-3 sm:px-6">
                    <Alert variant="destructive" className="border-2 bg-destructive/5">
                      <AlertCircle className="size-4" />
                      <AlertTitle className="font-bold">Parsing Warnings</AlertTitle>
                      <AlertDescription className="mt-1 max-h-24 overflow-y-auto pr-2 text-xs">
                        Some rows have issues:
                        <ul className="mt-2 list-disc space-y-1 pl-4">
                          {errors.map((err, i) => (
                            <li key={i}>Row {err.row}: {err.message}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                <ScrollArea className="min-h-0 flex-1">
                  <div className="divide-y pb-4">
                    {data.map((row, index) => {
                      const status = getRowStatus(row);
                      return (
                        <div key={index} className="group flex flex-col gap-2 px-4 py-3 transition-colors hover:bg-muted/20 sm:grid sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_100px_72px] sm:items-center sm:gap-4 sm:px-6 sm:py-2.5">
                          <div className="min-w-0">
                            <div className="mb-0.5 flex items-center gap-1.5">
                              {!status.valid && <AlertCircle className="size-3.5 shrink-0 text-destructive" />}
                              <span className="block truncate text-sm font-bold leading-tight text-foreground">
                                {row.name || <span className="font-normal italic text-destructive">Missing Name</span>}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="rounded bg-muted px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                                {row.shortName || 'NO SHORTNAME'}
                              </span>
                              <span className="truncate text-[9px] font-medium text-muted-foreground">/{row.slug || 'no-slug'}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 sm:flex-col sm:items-start sm:gap-0">
                            <span className="text-xs font-semibold leading-tight">{row.branchCode || 'N/A'}</span>
                          </div>
                          <div className="flex items-center justify-between sm:contents">
                            <Badge variant={status.valid ? 'outline' : 'destructive'} className={cn('h-5 px-1.5 text-[9px] font-bold uppercase tracking-wider', status.valid && 'border-success/20 bg-success/5 text-success')}>
                              {status.valid ? 'Ready' : 'Invalid'}
                            </Badge>
                            <div className="flex items-center gap-0.5 sm:justify-end">
                              <Button variant="ghost" size="icon" className="size-8 hover:bg-primary/10 hover:text-primary" onClick={() => { setEditingIndex(index); editForm.reset(row); }}>
                                <Edit2 className="size-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="size-8 text-destructive/70 hover:bg-destructive/10 hover:text-destructive" onClick={() => removeRow(index)}>
                                <Trash2 className="size-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>

          {hasData && (
            <SheetFooter className="shrink-0 flex-row justify-end gap-2 border-t bg-muted/10 px-4 py-3 sm:px-6 sm:py-4">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="h-10 border-2 font-bold">Cancel</Button>
              <Button disabled={!allValid || isImporting} onClick={onImport} className="h-10 min-w-[140px] font-bold sm:min-w-[160px]">
                {isImporting ? 'Importing…' : <><Check className="mr-2 size-4" />Commit {data.length} Records</>}
              </Button>
            </SheetFooter>
          )}
        </ResizableSheetContent>
      </Sheet>

      <Sheet open={editingIndex !== null} onOpenChange={(isOpen) => !isOpen && setEditingIndex(null)}>
        <SheetContent className="flex w-full flex-col gap-0 overflow-hidden border-l p-0 shadow-none sm:max-w-md">
          <SheetHeader className="shrink-0 border-b p-4 sm:p-6">
            <SheetTitle className="text-lg font-bold sm:text-xl">Edit Branch Data</SheetTitle>
            <SheetDescription>Modify branch details before importing.</SheetDescription>
          </SheetHeader>
          <ScrollArea className="min-h-0 flex-1">
            <div className="p-4 sm:p-6">
              <BranchForm form={editForm} idPrefix="edit-import-" />
            </div>
          </ScrollArea>
          <SheetFooter className="shrink-0 flex-row justify-end gap-3 border-t bg-muted/10 p-4 sm:p-6">
            <Button variant="outline" onClick={() => setEditingIndex(null)} className="border-2 font-bold">Cancel</Button>
            <Button onClick={editForm.handleSubmit(onEditSubmit)} className="font-bold">Save Changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
