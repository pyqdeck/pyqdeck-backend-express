'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function SearchGapsView({ gaps }) {
  return (
    <Card className="border-border/50 border-2 shadow-none">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="bg-warning/10 dark:bg-warning/10 rounded-full p-2">
          <Search className="text-warning h-5 w-5" />
        </div>
        <div>
          <CardTitle>Zero-Result Searches</CardTitle>
          <CardDescription>
            Content gaps identified by student queries.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {gaps.map((search, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{search.query}</span>
                <span className="text-muted-foreground text-xs">
                  {search.count} students searched
                </span>
              </div>
              <Badge
                variant="outline"
                className="border-warning/30 bg-warning/10 text-warning dark:bg-warning/10"
              >
                Gap Identified
              </Badge>
            </div>
          ))}
          <div className="mt-2 text-center">
            <p className="text-muted-foreground text-xs italic">
              Tip: Upload papers for these topics to increase retention.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
