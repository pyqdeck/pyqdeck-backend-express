import { fn } from '@storybook/test';
import { PackageOpen, Plus, Search, FileQuestion } from 'lucide-react';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './empty';
import { Button } from './button';
import { cn } from '@/lib/utils';

/**
 * Empty state component used when there is no content to display.
 * It provides a consistent layout for icons, titles, descriptions, and call-to-action buttons.
 */
const meta = {
  title: 'UI/Empty',
  component: Empty,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
    children: {
      control: false,
      description: 'Content of the empty state',
    },
  },
};

export default meta;

const Template = (args) => (
  <Empty {...args} className={cn('min-h-[400px]', args.className)} />
);

export const Default = {
  render: Template,
  args: {
    children: (
      <>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PackageOpen />
          </EmptyMedia>
          <EmptyTitle>No universities found</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t added any universities to the system yet.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={fn()}>
            <Plus className="mr-2 size-4" />
            Add University
          </Button>
        </EmptyContent>
      </>
    ),
  },
};

export const SearchResults = {
  render: Template,
  args: {
    children: (
      <>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Search />
          </EmptyMedia>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            We couldn&apos;t find any branches matching your search. Try a
            different term or clear the filter.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" onClick={fn()}>
            Clear Filter
          </Button>
        </EmptyContent>
      </>
    ),
  },
};

export const NoData = {
  render: Template,
  args: {
    children: (
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileQuestion />
        </EmptyMedia>
        <EmptyTitle>No papers available</EmptyTitle>
        <EmptyDescription>
          There are no question papers uploaded for this subject yet.
        </EmptyDescription>
      </EmptyHeader>
    ),
  },
};

export const Simple = {
  render: Template,
  args: {
    children: (
      <EmptyHeader>
        <EmptyTitle>No notifications</EmptyTitle>
        <EmptyDescription>You&apos;re all caught up!</EmptyDescription>
      </EmptyHeader>
    ),
  },
};

export const Minimal = {
  render: Template,
  args: {
    children: (
      <EmptyHeader>
        <EmptyTitle>No entries yet</EmptyTitle>
      </EmptyHeader>
    ),
  },
};
