import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

/**
 * A responsive table component for displaying tabular data.
 */
const meta = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the table container',
    },
  },
};

export default meta;

const universities = [
  {
    name: 'Stanford University',
    location: 'Stanford, CA',
    established: '1885',
    status: 'Private',
    endowment: '$36.3 billion',
  },
  {
    name: 'Massachusetts Institute of Technology',
    location: 'Cambridge, MA',
    established: '1861',
    status: 'Private',
    endowment: '$23.5 billion',
  },
  {
    name: 'University of California, Berkeley',
    location: 'Berkeley, CA',
    established: '1868',
    status: 'Public',
    endowment: '$6.9 billion',
  },
  {
    name: 'Harvard University',
    location: 'Cambridge, MA',
    established: '1636',
    status: 'Private',
    endowment: '$50.7 billion',
  },
  {
    name: 'California Institute of Technology',
    location: 'Pasadena, CA',
    established: '1891',
    status: 'Private',
    endowment: '$3.5 billion',
  },
];

const TableTemplate = (args) => (
  <Table {...args}>
    <TableCaption>A list of top-tier universities in the US.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[300px]">University</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>Established</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Endowment</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {universities.map((university) => (
        <TableRow key={university.name}>
          <TableCell className="font-medium">{university.name}</TableCell>
          <TableCell>{university.location}</TableCell>
          <TableCell>{university.established}</TableCell>
          <TableCell>{university.status}</TableCell>
          <TableCell className="text-right">{university.endowment}</TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={4}>Total Endowment (Listed)</TableCell>
        <TableCell className="text-right">$120.9 billion</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
);

export const Default = {
  render: TableTemplate,
  args: {},
};

export const Empty = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>No universities found.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">University</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Established</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Endowment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={5} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  args: {},
};
