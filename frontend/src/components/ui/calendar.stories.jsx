import { Calendar } from './calendar';
import * as React from 'react';

export default {
  title: 'UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};

export const Default = {
  render: () => {
    const [date, setDate] = React.useState(new Date('2024-05-02'));
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    );
  },
};

export const Range = {
  render: () => {
    const [date, setDate] = React.useState({
      from: new Date('2024-05-02'),
      to: new Date('2024-05-10'),
    });
    return (
      <Calendar
        mode="range"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    );
  },
};
