'use client';

import * as React from 'react';
import { AiGenerationQueueView } from './ai-generation-queue-view';
import { toast } from 'sonner';

export function AiGenerationQueue({ questions }) {
  const handleGenerate = (question) => {
    toast.info(`Generating solution for question ${question._id}`);
    // API logic will go here
  };

  const handleGenerateAll = () => {
    toast.info('Starting bulk generation');
    // API logic will go here
  };

  return (
    <AiGenerationQueueView
      questions={questions}
      onGenerate={handleGenerate}
      onGenerateAll={handleGenerateAll}
    />
  );
}
