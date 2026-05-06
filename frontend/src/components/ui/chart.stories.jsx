import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from './chart';
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  LineChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
} from 'recharts';

export default {
  title: 'UI/Chart',
  component: ChartContainer,
  tags: ['autodocs'],
  argTypes: {
    config: {
      control: 'object',
      description: 'Configuration for the chart colors and labels',
    },
    initialDimension: {
      control: 'object',
      description: 'Initial dimensions for the chart container',
    },
  },
};

const academicData = [
  { month: 'Jan', papers: 186, downloads: 800 },
  { month: 'Feb', papers: 305, downloads: 2000 },
  { month: 'Mar', papers: 237, downloads: 1200 },
  { month: 'Apr', papers: 173, downloads: 1900 },
  { month: 'May', papers: 209, downloads: 1300 },
  { month: 'Jun', papers: 214, downloads: 1400 },
];

const academicConfig = {
  papers: {
    label: 'Papers Uploaded',
    color: 'var(--primary)',
  },
  downloads: {
    label: 'Downloads',
    color: 'var(--chart-2)',
  },
};

const categoryData = [
  { category: 'engineering', count: 400, fill: 'var(--color-engineering)' },
  { category: 'science', count: 300, fill: 'var(--color-science)' },
  { category: 'arts', count: 300, fill: 'var(--color-arts)' },
  { category: 'commerce', count: 200, fill: 'var(--color-commerce)' },
];

const categoryConfig = {
  count: {
    label: 'Papers',
  },
  engineering: {
    label: 'Engineering',
    color: 'var(--chart-1)',
  },
  science: {
    label: 'Science',
    color: 'var(--chart-2)',
  },
  arts: {
    label: 'Arts',
    color: 'var(--chart-3)',
  },
  commerce: {
    label: 'Commerce',
    color: 'var(--chart-4)',
  },
};

export const BarChartVariant = {
  render: (args) => (
    <div className="h-[400px] w-full max-w-2xl">
      <ChartContainer {...args}>
        <BarChart data={academicData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="papers" fill="var(--color-papers)" radius={4} />
          <Bar dataKey="downloads" fill="var(--color-downloads)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  ),
  args: {
    config: academicConfig,
  },
};

export const LineChartVariant = {
  render: (args) => (
    <div className="h-[400px] w-full max-w-2xl">
      <ChartContainer {...args}>
        <LineChart data={academicData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            type="monotone"
            dataKey="papers"
            stroke="var(--color-papers)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="downloads"
            stroke="var(--color-downloads)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  ),
  args: {
    config: academicConfig,
  },
};

export const AreaChartVariant = {
  render: (args) => (
    <div className="h-[400px] w-full max-w-2xl">
      <ChartContainer {...args}>
        <AreaChart data={academicData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            type="monotone"
            dataKey="papers"
            fill="var(--color-papers)"
            fillOpacity={0.4}
            stroke="var(--color-papers)"
          />
          <Area
            type="monotone"
            dataKey="downloads"
            fill="var(--color-downloads)"
            fillOpacity={0.4}
            stroke="var(--color-downloads)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  ),
  args: {
    config: academicConfig,
  },
};

export const PieChartVariant = {
  render: (args) => (
    <div className="h-[400px] w-full max-w-2xl">
      <ChartContainer {...args}>
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={categoryData}
            dataKey="count"
            nameKey="category"
            innerRadius={60}
            strokeWidth={5}
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <ChartLegend
            content={<ChartLegendContent nameKey="category" />}
            className="-translate-y-2 flex-wrap"
          />
        </PieChart>
      </ChartContainer>
    </div>
  ),
  args: {
    config: categoryConfig,
  },
};
