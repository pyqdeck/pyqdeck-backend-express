'use client';

import * as React from 'react';
import {
  Upload,
  FileText,
  Trash2,
  Edit2,
  Check,
  AlertCircle,
  X,
  FileSpreadsheet,
  ClipboardCheck,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { UniversityForm } from './university-form';

export function ImportUniversitiesView({
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
  universitySchema,
}) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('upload');

  // Helper to validate a single row
  const getRowStatus = (row) => {
    try {
      universitySchema.parse(row);
      return { valid: true };
    } catch (err) {
      return { valid: false, errors: err.errors || [] };
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

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
      slug: '',
      websiteUrl: '',
      state: '',
      country: 'India',
      logo: '',
      description: '',
      isActive: true,
    };
    onDataChange([newRow, ...data]);
    setEditingIndex(0);
    editForm.reset(newRow);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="font-roboto flex h-full w-full max-w-[95vw] flex-col gap-0 overflow-hidden border-l-2 p-0 shadow-2xl transition-all lg:max-w-6xl">
        <SheetHeader className="bg-muted/5 border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex size-9 items-center justify-center rounded-xl">
                <FileSpreadsheet className="text-primary size-5" />
              </div>
              <div>
                <SheetTitle className="text-xl leading-none font-black tracking-tight">
                  Import Universities
                </SheetTitle>
                <SheetDescription className="mt-1 text-xs">
                  Bulk import institutions via CSV or paste.
                </SheetDescription>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          {!file && data.length === 0 && (
            <div className="flex h-full flex-col p-8">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex h-full w-full flex-col"
              >
                <div className="bg-muted/20 mx-auto mb-6 flex w-fit items-center justify-center gap-1.5 rounded-full p-1">
                  <Button
                    variant={activeTab === 'upload' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTab('upload')}
                    className={cn(
                      'font-roboto h-8 rounded-full px-6 text-xs font-bold transition-all',
                      activeTab === 'upload'
                        ? 'shadow-sm'
                        : 'text-muted-foreground'
                    )}
                  >
                    <Upload className="mr-2 size-4" />
                    Upload File
                  </Button>
                  <Button
                    variant={activeTab === 'paste' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTab('paste')}
                    className={cn(
                      'font-roboto h-8 rounded-full px-6 text-xs font-bold transition-all',
                      activeTab === 'paste'
                        ? 'shadow-sm'
                        : 'text-muted-foreground'
                    )}
                  >
                    <ClipboardCheck className="mr-2 size-4" />
                    Paste CSV
                  </Button>
                </div>

                <TabsContent
                  value="upload"
                  className="mt-0 flex-1 outline-none"
                >
                  <div className="flex h-full min-h-[300px] flex-col items-center justify-center">
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-10 transition-all ${
                        isDragging
                          ? 'border-primary bg-primary/5 scale-[1.02]'
                          : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30'
                      }`}
                    >
                      <div className="bg-primary/10 flex size-16 items-center justify-center rounded-full">
                        <Upload className="text-primary size-8" />
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">
                          Drop your CSV file here
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm">
                          or click to browse your files
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".csv"
                        className="hidden"
                        id="csv-upload"
                        onChange={(e) => onFileChange(e.target.files[0])}
                      />
                      <Button
                        asChild
                        variant="outline"
                        className="mt-2 border-2 font-bold"
                      >
                        <label htmlFor="csv-upload" className="cursor-pointer">
                          Select File
                        </label>
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="paste" className="mt-0 flex-1 outline-none">
                  <div className="flex h-full flex-col gap-4">
                    <div className="relative flex-1">
                      <Textarea
                        placeholder="Paste your CSV content here (including header row)..."
                        className="bg-muted/10 h-full min-h-[250px] resize-none border-2 p-4 font-mono text-xs focus-visible:ring-0"
                        value={pastedText}
                        onChange={(e) => onPastedTextChange(e.target.value)}
                      />
                      {pastedText && (
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 border font-bold shadow-sm"
                            onClick={() => onPastedTextChange('')}
                          >
                            Clear
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center gap-3">
                      <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="min-w-[120px] border-2 font-bold"
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={!pastedText.trim()}
                        onClick={onProcessPaste}
                        className="min-w-[160px] font-bold"
                      >
                        <Plus className="mr-2 size-4" /> Process Data
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <p className="text-muted-foreground mt-4 flex items-center justify-center gap-1.5 text-center text-xs">
                <AlertCircle className="size-3" />
                Only .csv format is supported. Ensure the first row contains
                headers.
              </p>
            </div>
          )}

          {(file || data.length > 0) && (
            <div className="flex h-full flex-col overflow-hidden p-0">
              <div className="bg-muted/30 flex items-center justify-between border-b px-6 py-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex size-8 items-center justify-center rounded-lg">
                    <FileText className="text-primary size-4" />
                  </div>
                  <div>
                    <p className="max-w-[200px] truncate text-xs font-bold">
                      {file ? file.name : 'Pasted Content'}
                    </p>
                    <p className="text-muted-foreground text-[9px] font-bold tracking-wider uppercase">
                      {file ? `${(file.size / 1024).toFixed(1)} KB • ` : ''}
                      {data.length} Rows
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addRow}
                    className="bg-background hover:bg-muted h-8 border-2 px-3 text-xs font-bold"
                  >
                    <Plus className="mr-2 size-3.5" /> Add Row
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onFileChange(null);
                      onDataChange([]);
                    }}
                    className="text-destructive hover:bg-destructive/10 h-8 px-3 text-xs font-bold"
                  >
                    <Trash2 className="mr-2 size-3.5" /> Clear All
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 text-muted-foreground sticky top-0 z-20 grid grid-cols-[2fr_1fr_120px_80px] gap-4 border-b px-6 py-2 text-[10px] font-black tracking-widest uppercase">
                <div>University Details</div>
                <div>Location</div>
                <div>Status</div>
                <div className="text-right">Actions</div>
              </div>

              {errors && errors.length > 0 && (
                <div className="p-4 px-8">
                  <Alert
                    variant="destructive"
                    className="bg-destructive/5 border-2"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="font-bold">
                      Parsing Warnings
                    </AlertTitle>
                    <AlertDescription className="custom-scrollbar mt-1 max-h-[100px] overflow-y-auto pr-2 text-xs">
                      Some rows have issues and were skipped or modified:
                      <ul className="mt-2 list-disc space-y-1 pl-4">
                        {errors.map((err, i) => (
                          <li key={i}>
                            Row {err.row}: {err.message}
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <ScrollArea className="h-[500px] w-full flex-1">
                <div className="divide-y pb-20">
                  {data.length === 0 ? (
                    <div className="text-muted-foreground flex h-40 items-center justify-center font-medium italic">
                      No data found to display.
                    </div>
                  ) : (
                    data.map((row, index) => {
                      const status = getRowStatus(row);
                      return (
                        <div
                          key={index}
                          className="group hover:bg-muted/20 grid grid-cols-[2fr_1fr_120px_80px] items-center gap-4 px-6 py-2.5 transition-all"
                        >
                          <div className="min-w-0">
                            <div className="mb-0.5 flex items-center gap-2">
                              {!status.valid && (
                                <AlertCircle className="text-destructive size-3.5 shrink-0" />
                              )}
                              <span className="text-foreground block truncate text-sm leading-tight font-bold">
                                {row.name || (
                                  <span className="text-destructive font-normal italic">
                                    Missing Name
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground bg-muted rounded px-1 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                                {row.shortName || 'NO SHORTNAME'}
                              </span>
                              <span className="text-muted-foreground truncate text-[9px] font-medium">
                                /{row.slug || 'no-slug'}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col truncate text-xs">
                            <span className="leading-tight font-semibold">
                              {row.state || 'N/A'}
                            </span>
                            <span className="text-muted-foreground text-[10px]">
                              {row.country || 'India'}
                            </span>
                          </div>

                          <div>
                            <Badge
                              variant={status.valid ? 'outline' : 'destructive'}
                              className={
                                status.valid
                                  ? 'bg-success/5 text-success border-success/20 h-5 px-1.5 text-[9px] font-bold tracking-wider uppercase'
                                  : 'h-5 px-1.5 text-[9px] font-bold tracking-wider uppercase'
                              }
                            >
                              {status.valid ? 'Ready' : 'Invalid'}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-end gap-0.5">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-muted/0 hover:bg-primary/10 hover:text-primary size-8 transition-all"
                              onClick={() => {
                                setEditingIndex(index);
                                editForm.reset(row);
                              }}
                            >
                              <Edit2 className="size-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive/70 hover:bg-destructive/10 hover:text-destructive size-8 transition-all"
                              onClick={() => removeRow(index)}
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {(file || data.length > 0) && (
          <SheetFooter className="bg-muted/10 border-t px-6 py-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-10 border-2 font-bold"
            >
              Cancel
            </Button>
            <Button
              disabled={
                data.length === 0 ||
                isImporting ||
                data.some((row) => !getRowStatus(row).valid)
              }
              onClick={onImport}
              className="h-10 min-w-[160px] font-bold"
            >
              {isImporting ? (
                <>Importing...</>
              ) : (
                <>
                  <Check className="mr-2 size-4" />
                  Commit {data.length} Records
                </>
              )}
            </Button>
          </SheetFooter>
        )}
      </SheetContent>

      <Sheet
        open={editingIndex !== null}
        onOpenChange={(open) => !open && setEditingIndex(null)}
      >
        <SheetContent className="font-roboto flex flex-col overflow-hidden border-l-2 p-0 shadow-none sm:max-w-md">
          <SheetHeader className="border-b p-6">
            <SheetTitle className="text-xl font-bold">Edit Row Data</SheetTitle>
            <SheetDescription>
              Modify university details before importing.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <UniversityForm form={editForm} idPrefix="edit-import-" />
          </div>
          <SheetFooter className="bg-muted/10 gap-3 border-t p-6">
            <Button
              variant="outline"
              onClick={() => setEditingIndex(null)}
              className="border-2 font-bold"
            >
              Cancel
            </Button>
            <Button
              onClick={editForm.handleSubmit(onEditSubmit)}
              className="font-bold"
            >
              Save Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Sheet>
  );
}
