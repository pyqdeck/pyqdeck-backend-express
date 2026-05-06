import { useState } from 'react';
import { fn } from '@storybook/test';
import { Calendar } from './calendar';

export default {
  title: 'UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'multiple', 'range', 'default'],
      description: 'Selection mode',
      table: { defaultValue: { summary: 'default' } },
    },
    showOutsideDays: {
      control: 'boolean',
      description:
        'Show days from other months at the beginning/end of the month',
      table: { defaultValue: { summary: 'true' } },
    },
    captionLayout: {
      control: { type: 'select' },
      options: ['label', 'dropdown', 'dropdown-buttons'],
      description: 'Layout for the month/year caption',
      table: { defaultValue: { summary: 'label' } },
    },
    buttonVariant: {
      control: { type: 'select' },
      options: [
        'default',
        'outline',
        'secondary',
        'ghost',
        'destructive',
        'link',
      ],
      description: 'Variant for navigation buttons',
      table: { defaultValue: { summary: 'ghost' } },
    },
    showWeekNumber: {
      control: 'boolean',
      description: 'Show the week number column',
      table: { defaultValue: { summary: 'false' } },
    },
    fixedWeeks: {
      control: 'boolean',
      description: 'Always show 6 weeks per month',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  parameters: {
    layout: 'centered',
  },
  args: {
    onSelect: fn(),
  },
};

export const Default = {
  render: (args) => {
    const [date, setDate] = useState(new Date('2024-05-02'));
    return (
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={(newDate) => {
          setDate(newDate);
          args.onSelect(newDate);
        }}
        className="rounded-md border"
      />
    );
  },
  args: {
    mode: 'single',
    month: new Date('2024-05-01'),
  },
};

export const Range = {
  render: (args) => {
    const [date, setDate] = useState({
      from: new Date('2024-05-02'),
      to: new Date('2024-05-10'),
    });
    return (
      <Calendar
        {...args}
        mode="range"
        selected={date}
        onSelect={(newDate) => {
          setDate(newDate);
          args.onSelect(newDate);
        }}
        className="rounded-md border"
      />
    );
  },
  args: {
    mode: 'range',
    month: new Date('2024-05-01'),
  },
};

export const Dropdown = {
  render: (args) => {
    const [date, setDate] = useState(new Date('2024-05-02'));
    return (
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={(newDate) => {
          setDate(newDate);
          args.onSelect(newDate);
        }}
        className="rounded-md border"
      />
    );
  },
  args: {
    mode: 'single',
    captionLayout: 'dropdown',
    startMonth: new Date(2020, 0),
    endMonth: new Date(2030, 11),
    month: new Date('2024-05-01'),
  },
};

export const Multiple = {
  render: (args) => {
    const [dates, setDates] = useState([
      new Date('2024-05-02'),
      new Date('2024-05-05'),
    ]);
    return (
      <Calendar
        {...args}
        mode="multiple"
        selected={dates}
        onSelect={(newDates) => {
          setDates(newDates);
          args.onSelect(newDates);
        }}
        className="rounded-md border"
      />
    );
  },
  args: {
    mode: 'multiple',
    month: new Date('2024-05-01'),
  },
};
