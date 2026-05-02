'use client';

import * as React from 'react';
import { PendingPapersView } from './pending-papers-view';
import { toast } from 'sonner';

export function PendingPapers({ papers }) {
  const handleApprove = (paper) => {
    toast.success(`Approved paper: ${paper.title}`);
    // API logic will go here
  };

  const handleReject = (paper) => {
    toast.error(`Rejected paper: ${paper.title}`);
    // API logic will go here
  };

  return (
    <PendingPapersView
      papers={papers}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
}
