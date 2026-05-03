'use client';

import * as React from 'react';
import { Pie, PieChart, Cell } from 'recharts';
import { ChartPie, FileStack } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/components/ui/empty';

export function PopularityChartView({ data }) {
  const chartData = React.useMemo(() => {
    return (data || []).map((item, index) => ({
      subject: item.subject,
      count: item.count,
      fill: `var(--chart-${(index % 5) + 1})`,
    }));
  }, [data]);

  const chartConfig = React.useMemo(() => {
    const config = {
      count: { label: 'Papers' },
    };
    chartData.forEach((item, index) => {
      config[item.subject] = {
        label: item.subject,
        color: `var(--chart-${(index % 5) + 1})`,
      };
    });
    return config;
  }, [chartData]);

  return (
    <Card className="flex h-full flex-col shadow-none">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="bg-primary/10 dark:bg-primary/10 rounded-full p-2">
          <ChartPie className="text-primary h-5 w-5" />
        </div>
        <div>
          <CardTitle>Subject Popularity</CardTitle>
          <CardDescription>Most uploaded subjects overall</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-4 flex-1 pb-0">
        {chartData.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center">
            <Empty className="border-none shadow-none">
              <EmptyMedia
                variant="icon"
                className="rounded-full bg-slate-50 dark:bg-slate-900/50"
              >
                <FileStack className="text-muted-foreground/50 h-6 w-6" />
              </EmptyMedia>
              <EmptyHeader>
                <EmptyTitle className="text-base">
                  No papers uploaded yet
                </EmptyTitle>
                <EmptyDescription>
                  Upload papers to see subject popularity
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="subject"
                innerRadius={60}
                strokeWidth={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
