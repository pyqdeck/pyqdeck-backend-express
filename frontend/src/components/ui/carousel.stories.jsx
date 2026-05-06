import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './card';
import { cn } from '@/lib/utils';

export default {
  title: 'UI/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the carousel.',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    opts: {
      control: 'object',
      description: 'Embla Carousel options.',
    },
    plugins: {
      control: 'object',
      description: 'Embla Carousel plugins.',
    },
    setApi: {
      control: false,
      description: 'Function to set the carousel API.',
    },
  },
};

const academicPapers = [
  {
    title: 'Engineering Physics',
    year: '2024',
    code: 'PH101',
    university: 'Mumbai University',
  },
  {
    title: 'Data Structures',
    year: '2023',
    code: 'CS201',
    university: 'Pune University',
  },
  {
    title: 'Discrete Mathematics',
    year: '2022',
    code: 'MA301',
    university: 'Delhi University',
  },
  {
    title: 'Operating Systems',
    year: '2024',
    code: 'CS401',
    university: 'Anna University',
  },
  {
    title: 'Computer Networks',
    year: '2023',
    code: 'CS402',
    university: 'VTU',
  },
];

const CarouselTemplate = (args) => (
  <div
    className={cn(
      'flex w-full justify-center px-12 py-10',
      args.orientation === 'vertical' ? 'h-[400px]' : ''
    )}
  >
    <Carousel
      {...args}
      className={cn(
        'w-full max-w-xs',
        args.orientation === 'vertical'
          ? 'h-full [&_[data-slot=carousel-content]]:h-full'
          : ''
      )}
    >
      <CarouselContent
        className={cn(args.orientation === 'vertical' ? 'h-full' : '')}
      >
        {academicPapers.map((paper, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-sm font-bold">
                    {paper.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {paper.code}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex aspect-square flex-col items-center justify-center p-6 text-center">
                  <span className="text-4xl font-bold">{paper.year}</span>
                  <p className="text-muted-foreground mt-2 text-xs">
                    {paper.university}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);

export const Default = {
  render: CarouselTemplate,
  args: {
    orientation: 'horizontal',
  },
};

export const Vertical = {
  render: CarouselTemplate,
  args: {
    orientation: 'vertical',
  },
};

export const Looping = {
  render: CarouselTemplate,
  args: {
    orientation: 'horizontal',
    opts: {
      loop: true,
    },
  },
};

export const MultipleSlides = {
  render: (args) => (
    <div className="flex w-full justify-center px-12 py-10">
      <Carousel {...args} className="w-full max-w-lg">
        <CarouselContent>
          {academicPapers.map((paper, index) => (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="truncate text-xs font-bold">
                      {paper.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex aspect-video flex-col items-center justify-center p-4 text-center">
                    <span className="text-2xl font-bold">{paper.year}</span>
                    <p className="text-muted-foreground mt-1 text-[10px]">
                      {paper.university}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  args: {
    orientation: 'horizontal',
  },
};
