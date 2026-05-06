# Storybook Story Writing Skill

Use this skill whenever you are asked to **create, fix, or review a Storybook story** in this repo.

## Project Setup

| Setting | Value |
|---|---|
| Storybook | v10.x |
| Framework | `@storybook/nextjs-vite` |
| File format | `.stories.jsx` (JSX, not TSX) |
| Addons | `addon-docs`, `addon-a11y`, `addon-vitest`, `addon-onboarding` |
| Global decorator | `TooltipProvider` (already applied in `preview.jsx`) |
| Global param | `nextjs: { appDirectory: true }` |
| Story discovery | `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)` |

**Official docs:**
- Writing stories: https://storybook.js.org/docs/writing-stories
- Args & controls: https://storybook.js.org/docs/writing-stories/args
- Decorators: https://storybook.js.org/docs/writing-stories/decorators
- Play function: https://storybook.js.org/docs/writing-stories/play-function
- Autodocs: https://storybook.js.org/docs/writing-docs/autodocs
- CSF format: https://storybook.js.org/docs/api/csf
- Interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
- Naming & hierarchy: https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy

---

## Story File Rules

1. **Always use CSF3** — default export is the meta object, named exports are stories.
2. **Always add `tags: ['autodocs']`** so the Docs tab is generated automatically.
3. **Never import from `@clerk/express` or wrap with ClerkProvider** — stories are for pure view components only.
4. **Never add `import React from 'react'`** — the project uses the new JSX transform.
5. **Always use `fn()` from `@storybook/test`** for callback props (`onClick`, `onSubmit`, `onOpenChange`, etc.).
6. **Realistic mock data** — use domain-accurate names/values (university names, branch codes, etc.), not generic `foo`/`bar`.
7. **`parameters.layout`** — use `'centered'` for dialogs/cards, `'fullscreen'` for full-page views, omit for inline components.

---

## Naming Conventions

| Story location | Title format | Example |
|---|---|---|
| `components/ui/` | `UI/<ComponentName>` | `UI/Button`, `UI/Accordion` |
| `app/studio/_components/` — dialog | `Studio/<Domain>/<ActionDialog>` | `Studio/Academics/AddBranchDialog` |
| `app/studio/_components/` — table view | `Studio/<Domain>/<Entity>Table` | `Studio/Academics/BranchesTable` |
| `app/studio/_components/` — chart/analytics | `Studio/Analytics/<ChartName>` | `Studio/Analytics/TrafficChart` |
| `app/studio/_components/` — shared card | `Studio/Shared/<CardName>` | `Studio/Shared/MetricCard` |
| `app/studio/_components/` — settings | `Studio/Settings/<CardName>` | `Studio/Settings/GeneralSettingsCard` |

Domain groupings for Studio:
- `Academics` — branches, semesters, subjects, offerings, topics
- `Analytics` — charts, trends, gaps, radar, queue
- `Universities` — university dialogs and tables
- `Papers` — pending papers, paper-related views
- `Settings` — system info, wipe DB, general settings, AI config
- `Shared` — metric card, reusable widgets

---

## Template: UI Component Story

Use this for files in `frontend/src/components/ui/`.

```jsx
import { fn } from '@storybook/test';
import { ComponentName } from './component-name';

export default {
  title: 'UI/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    // Define controls for each prop
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Visual style variant',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Size variant',
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the component',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

// Cover all meaningful variants — one export per distinct visual state
export const Default = {
  args: {
    children: 'Label',
    variant: 'default',
  },
};

export const Destructive = {
  args: { children: 'Delete', variant: 'destructive' },
};

export const Outline = {
  args: { children: 'Outline', variant: 'outline' },
};

export const Disabled = {
  args: { children: 'Disabled', disabled: true },
};
```

For components that need a render wrapper (e.g., multi-part components like Accordion, Card):

```jsx
const Template = (args) => (
  <Accordion {...args} className="w-[400px]">
    <AccordionItem value="item-1">
      <AccordionTrigger>Question one?</AccordionTrigger>
      <AccordionContent>Answer one.</AccordionContent>
    </AccordionItem>
  </Accordion>
);

export const Default = {
  render: Template,
  args: { type: 'single', collapsible: true },
};
```

---

## Template: Studio View Story — Simple (no form)

Use this for view components that receive all data via props (tables, charts, cards, delete dialogs).

```jsx
import { fn } from '@storybook/test';
import { SomeView } from './some-view';

export default {
  title: 'Studio/Domain/SomeName',
  component: SomeView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered', // use 'fullscreen' for full-page table views
  },
};

const mockItems = [
  { id: '1', name: 'Computer Engineering', code: 'CE', slug: 'computer-engineering' },
  { id: '2', name: 'Information Technology', code: 'IT', slug: 'information-technology' },
];

export const Default = {
  args: {
    items: mockItems,
    loading: false,
    onEdit: fn(),
    onDelete: fn(),
  },
};

export const Loading = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Empty = {
  args: {
    ...Default.args,
    items: [],
  },
};
```

---

## Template: Studio View Story — Form Dialog (react-hook-form)

Use this for dialog view components that accept a `form` prop (add/edit dialogs).

The pattern: create a `FormWrapper` component inside the story file that wires up `useForm` and passes the instance as the `form` prop.

```jsx
import { fn } from '@storybook/test';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AddSomethingDialogView } from './add-something-dialog.view';

// Mirror the zod schema from the real component
const schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

export default {
  title: 'Studio/Domain/AddSomethingDialog',
  component: AddSomethingDialogView,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', slug: '' },
  });

  // Override isSubmitting to let the Submitting story work without a real submit
  const proxiedForm = {
    ...form,
    formState: { ...form.formState, isSubmitting: mockSubmitting },
  };

  return <AddSomethingDialogView {...args} form={proxiedForm} />;
};

const mockRelatedItems = [
  { id: 'r1', name: 'Related Item One' },
  { id: 'r2', name: 'Related Item Two' },
];

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    open: true,
    onOpenChange: fn(),
    onSubmit: fn(),
    relatedItems: mockRelatedItems,
  },
};

export const Submitting = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockSubmitting: true,
  },
};
```

---

## Template: Studio View Story — Edit Dialog

Same as the add dialog template but pre-populate `defaultValues` with an existing item:

```jsx
const FormWrapper = ({ mockSubmitting = false, initialData, ...args }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData ?? { name: '', slug: '' },
  });

  const proxiedForm = {
    ...form,
    formState: { ...form.formState, isSubmitting: mockSubmitting },
  };

  return <EditSomethingDialogView {...args} form={proxiedForm} />;
};

const mockItem = { id: 'b1', name: 'Computer Engineering', slug: 'computer-engineering' };

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    open: true,
    item: mockItem,
    initialData: mockItem,
    onOpenChange: fn(),
    onSubmit: fn(),
  },
};
```

---

## Template: Studio View Story — Delete Dialog

```jsx
import { fn } from '@storybook/test';
import { DeleteSomethingDialogView } from './delete-something-dialog.view';

export default {
  title: 'Studio/Domain/DeleteSomethingDialog',
  component: DeleteSomethingDialogView,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const mockItem = { id: 'b1', name: 'Computer Engineering' };

export const Default = {
  args: {
    item: mockItem,
    open: true,
    onOpenChange: fn(),
    onDelete: fn(),
    loading: false,
  },
};

export const Deleting = {
  args: { ...Default.args, loading: true },
};
```

---

## Common Pitfalls to Fix

| Problem | Fix |
|---|---|
| `Ghost` story uses `variant: 'destructive'` instead of `'ghost'` | Match arg to story name |
| `asChild: {}` passed as an arg | Remove — `asChild` is not a story-level arg |
| `import React from 'react'` at the top | Remove — not needed with new JSX transform |
| Hardcoded `ClerkProvider` with publishable key | Remove entirely — stories must not depend on Clerk |
| Using the container component instead of the view | Import from `*.view.jsx` or `*-view.jsx` |
| Empty or missing stories (only `Default`) | Add `Loading`, `Empty`, `Submitting`, `Disabled`, error states |
| Missing `parameters.layout: 'centered'` on dialogs | Add it so the dialog appears centered in the canvas |
| `argTypes` missing descriptions | Add `description` and `table.defaultValue` to each argType |
| Mock data using `foo`/`bar`/`test` values | Use realistic domain data (university names, branch codes, etc.) |

---

## Checklist Before Marking a Story Done

- [ ] File uses CSF3 (default export meta + named story exports)
- [ ] `tags: ['autodocs']` present on the meta
- [ ] Title follows the naming convention table above
- [ ] All callback props use `fn()` from `@storybook/test`
- [ ] At least `Default` story plus key variant states (`Loading`, `Empty`, `Submitting`, `Disabled` where applicable)
- [ ] Mock data is realistic and domain-accurate
- [ ] No `import React` (not needed)
- [ ] No `ClerkProvider` or external auth wrappers
- [ ] Dialog stories have `parameters: { layout: 'centered' }`
- [ ] Form dialog stories use the `FormWrapper` pattern (not raw `useForm` in args)
- [ ] Component renders without console errors in Storybook
