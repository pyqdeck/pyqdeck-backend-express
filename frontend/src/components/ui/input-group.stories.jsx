import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from './input-group';
import { Search, Mail, Send } from 'lucide-react';

export default {
  title: 'UI/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
};

export const WithIcon = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <Mail className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Email address" />
    </InputGroup>
  ),
};

export const WithButton = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>
          <Search className="size-4" />
          Search
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithPrefixAndSuffix = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="primary">
          <Send className="size-4" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};
