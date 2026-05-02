'use client';

import * as React from 'react';
import { Pie, PieChart, Cell } from 'recharts';

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

export function PopularityChart({ data }) {
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
    <Card className="flex h-full flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Subject Popularity</CardTitle>
        <CardDescription>Most uploaded subjects overall</CardDescription>
      </CardHeader>
      <CardContent className="mt-4 flex-1 pb-0">
        {chartData.length === 0 ? (
          <div className="text-muted-foreground flex h-[250px] items-center justify-center text-sm">
            No papers uploaded yet
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
