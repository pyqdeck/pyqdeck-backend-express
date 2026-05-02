import { ChartContainer, ChartTooltip, ChartTooltipContent } from './chart';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts';

export default {
  title: 'UI/Chart',
  component: ChartContainer,
  tags: ['autodocs'],
};

const chartData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--primary))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--muted-foreground))',
  },
};

// Mock ResponsiveContainer for tests if needed, but we provide initialDimension
// in ChartContainer, so it should be fine. However, Recharts 3.x might still
// have issues in some headless environments.

export const BarChartExample = {
  render: () => (
    <div className="h-[400px] w-full max-w-2xl">
      <ChartContainer config={chartConfig}>
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  ),
};
