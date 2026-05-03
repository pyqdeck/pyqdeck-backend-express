'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Loader2 } from 'lucide-react';
import { SyllabusTable } from './syllabus-table';
import { EditSyllabusDialog } from './edit-syllabus-dialog';

export function SyllabusManagement({
  offerings = [],
  currentOfferingId,
  syllabus,
  modules = [],
}) {
  const router = useRouter();
  const api = useApi();

  const [loading, setLoading] = useState(false);
  const [editingSyllabus, setEditingSyllabus] = useState(null);
  const [search, setSearch] = useState('');

  // Filter offerings based on search
  const filteredOfferings = offerings.filter((off) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      off.subjectId?.name?.toLowerCase().includes(searchLower) ||
      off.universityId?.shortName?.toLowerCase().includes(searchLower) ||
      off.branchId?.shortName?.toLowerCase().includes(searchLower)
    );
  });

  const handleOfferingChange = (value) => {
    const url = new URL(window.location);
    if (value) {
      url.searchParams.set('offeringId', value);
    } else {
      url.searchParams.delete('offeringId');
    }
    window.location.href = url.toString();
  };

  const handleInitializeSyllabus = async () => {
    if (!currentOfferingId) return;
    setLoading(true);
    try {
      await api.syllabus.createSyllabus({
        subjectOfferingId: currentOfferingId,
        description: '',
      });
      router.refresh();
    } catch (error) {
      console.error('Failed to initialize syllabus:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSyllabusUpdate = async (id, data) => {
    try {
      await api.syllabus.updateSyllabus(id, data);
      router.refresh();
    } catch (error) {
      console.error('Failed to update syllabus:', error);
    }
  };

  const handleModuleAdd = async (data) => {
    try {
      await api.modules.createModule(data);
      router.refresh();
    } catch (error) {
      console.error('Failed to add module:', error);
    }
  };

  const handleModuleUpdate = async (id, data) => {
    try {
      await api.modules.updateModule(id, data);
      router.refresh();
    } catch (error) {
      console.error('Failed to update module:', error);
    }
  };

  const handleModuleDelete = async (id) => {
    try {
      await api.modules.deleteModule(id);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete module:', error);
    }
  };

  const handleTopicAdd = async (data) => {
    try {
      await api.topics.createTopic(data);
      router.refresh();
    } catch (error) {
      console.error('Failed to add topic:', error);
    }
  };

  const handleTopicUpdate = async (id, data) => {
    try {
      await api.topics.updateTopic(id, data);
      router.refresh();
    } catch (error) {
      console.error('Failed to update topic:', error);
    }
  };

  const handleTopicDelete = async (id) => {
    try {
      await api.topics.deleteTopic(id);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete topic:', error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
            Syllabus Builder
          </h1>
          <p className="text-muted-foreground font-roboto">
            Design and structure curriculum modules and learning topics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Offering Filter */}
          <div className="flex items-center gap-2">
            <Label className="font-roboto text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Offering
            </Label>
            <Select
              value={currentOfferingId || ''}
              onValueChange={handleOfferingChange}
            >
              <SelectTrigger className="font-roboto w-[200px] border-2 text-xs focus:ring-0">
                <SelectValue placeholder="Select Offering" />
              </SelectTrigger>
              <SelectContent className="border-2 shadow-none">
                {filteredOfferings.map((off) => (
                  <SelectItem
                    key={off.id || off._id}
                    value={off.id || off._id}
                    className="font-roboto text-xs"
                  >
                    {off.subjectId?.name} - Sem {off.semesterId?.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search */}
          <div className="relative w-64">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search offerings..."
              className="font-roboto border-2 pl-9 focus-visible:ring-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Initialize Button */}
          {currentOfferingId && !syllabus && (
            <Button
              onClick={handleInitializeSyllabus}
              disabled={loading}
              className="font-roboto bg-primary hover:bg-primary/90 border-2 font-bold shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initializing...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Initialize Syllabus
                </>
              )}
            </Button>
          )}

          {/* Edit Syllabus Button */}
          {syllabus && (
            <Button
              onClick={() => setEditingSyllabus(syllabus)}
              variant="outline"
              className="font-roboto border-2 font-bold"
            >
              Edit Syllabus
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      {currentOfferingId ? (
        syllabus ? (
          <SyllabusTable
            syllabus={syllabus}
            modules={modules}
            onModuleAdd={handleModuleAdd}
            onModuleUpdate={handleModuleUpdate}
            onModuleDelete={handleModuleDelete}
            onTopicAdd={handleTopicAdd}
            onTopicUpdate={handleTopicUpdate}
            onTopicDelete={handleTopicDelete}
          />
        ) : (
          <div className="font-roboto text-muted-foreground py-12 text-center">
            No syllabus found for this offering. Click &quot;Initialize
            Syllabus&quot; to create one.
          </div>
        )
      ) : (
        <div className="font-roboto text-muted-foreground py-12 text-center">
          Select an offering from the dropdown above to view or create its
          syllabus.
        </div>
      )}

      {/* Edit Syllabus Dialog */}
      <EditSyllabusDialog
        syllabus={editingSyllabus}
        open={!!editingSyllabus}
        onOpenChange={(open) => !open && setEditingSyllabus(null)}
        onUpdate={handleSyllabusUpdate}
      />
    </div>
  );
}
