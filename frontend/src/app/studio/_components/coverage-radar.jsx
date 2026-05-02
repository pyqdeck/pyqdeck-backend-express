'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Globe } from 'lucide-react';
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from 'recharts';

export function CoverageRadar({ data }) {
  return (
    <Card className="border-border/50 border-2 shadow-none">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
          <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <CardTitle>Subject Coverage</CardTitle>
          <CardDescription>
            Syllabus completion rate across major subjects.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex h-[350px] items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 150]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Coverage"
              dataKey="A"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
