import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './accordion';

/**
 * A multi-layered component for managing collapsible content sections.
 */
export default {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description:
        'Determines whether one or multiple items can be opened at the same time.',
      table: {
        defaultValue: { summary: 'single' },
      },
    },
    collapsible: {
      control: 'boolean',
      description:
        'When type is "single", allows closing content when clicking trigger for an open item.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description:
        'When true, prevents the user from interacting with the accordion and all its items.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

const Template = (args) => (
  <Accordion {...args} className="w-[400px]">
    <AccordionItem value="item-1">
      <AccordionTrigger>What is PYQ Deck?</AccordionTrigger>
      <AccordionContent>
        PYQ Deck is a platform for students to access previous year questions
        (PYQs) and study materials for their university exams.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>How can I contribute?</AccordionTrigger>
      <AccordionContent>
        You can contribute by uploading question papers from your university or
        by helping verify existing content.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Is it free to use?</AccordionTrigger>
      <AccordionContent>
        Yes, PYQ Deck is free for students to access and download study
        materials.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export const Default = {
  render: Template,
  args: {
    type: 'single',
    collapsible: true,
  },
};

export const Multiple = {
  render: Template,
  args: {
    type: 'multiple',
  },
};

export const Disabled = {
  render: Template,
  args: {
    type: 'single',
    disabled: true,
  },
};
