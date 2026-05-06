import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu';

/**
 * A responsive navigation menu component for site-wide navigation.
 */
const meta = {
  title: 'UI/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  argTypes: {
    viewport: {
      control: 'boolean',
      description: 'Whether to render a viewport for the content panels.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;

const Template = (args) => (
  <NavigationMenu {...args}>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Academics</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li className="row-span-3">
              <NavigationMenuLink asChild>
                <Link
                  className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                  href="/"
                >
                  <div className="mt-4 mb-2 text-lg font-medium">PYQ Deck</div>
                  <p className="text-muted-foreground text-sm leading-tight">
                    Access previous year questions and study materials for your
                    university exams.
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <Link href="/">Engineering Branches</Link>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <Link href="/">Semester Wise</Link>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <Link href="/">All Subjects</Link>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            href="/"
            className="group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Universities
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            href="/"
            className="group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Papers
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export const Default = {
  render: Template,
  args: {
    viewport: true,
  },
};

export const NoViewport = {
  render: Template,
  args: {
    viewport: false,
  },
};

export const Simple = {
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className="group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className="group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  args: {
    viewport: false,
  },
};
