'use client';

import * as React from 'react';
import { OfferingsTableView } from './offerings-table-view';

export function OfferingsTable({
  offerings = [],
  pagination,
  search,
  onSearchChange,
  onDelete,
  loading = false,
}) {
  return (
    <OfferingsTableView
      offerings={offerings}
      pagination={pagination}
      search={search}
      onSearchChange={onSearchChange}
      loading={loading}
      onDelete={onDelete}
    />
  );
}
