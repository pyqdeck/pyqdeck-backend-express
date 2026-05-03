'use client';

import * as React from 'react';
import { OfferingsTableView } from './offerings-table-view';

export function OfferingsTable({
  offerings = [],
  pagination,
  search,
  onDelete,
  loading = false,
}) {
  return (
    <OfferingsTableView
      offerings={offerings}
      pagination={pagination}
      search={search}
      loading={loading}
      onDelete={onDelete}
    />
  );
}
