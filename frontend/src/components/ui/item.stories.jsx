import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from './item';
import { User, Settings, ChevronRight } from 'lucide-react';
import { Button } from './button';

export default {
  title: 'UI/Item',
  component: Item,
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <Item className="max-w-sm">
      <ItemMedia variant="icon">
        <User />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>User Profile</ItemTitle>
        <ItemDescription>Manage your personal information.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-sm">
          <ChevronRight />
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const Outline = {
  render: () => (
    <Item variant="outline" className="max-w-sm">
      <ItemMedia variant="icon">
        <Settings />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Settings</ItemTitle>
        <ItemDescription>
          Configure your application preferences.
        </ItemDescription>
      </ItemContent>
    </Item>
  ),
};
