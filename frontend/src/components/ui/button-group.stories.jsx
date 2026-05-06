import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from './button-group';
import { Button } from './button';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Settings,
} from 'lucide-react';

export default {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export const Horizontal = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const Vertical = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
};

export const WithIcons = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline" size="icon">
        <Bold className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Italic className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Underline className="size-4" />
      </Button>
    </ButtonGroup>
  ),
};

export const WithSeparators = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline" size="icon">
        <AlignLeft className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <AlignCenter className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <AlignRight className="size-4" />
      </Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Format</Button>
    </ButtonGroup>
  ),
};

export const Mixed = {
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupText>View</ButtonGroupText>
      <Button variant="outline">Desktop</Button>
      <Button variant="outline">Mobile</Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon">
        <Settings className="size-4" />
      </Button>
    </ButtonGroup>
  ),
};
