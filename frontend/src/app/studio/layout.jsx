'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Roboto } from 'next/font/google';

import { useProfile } from '@/hooks/use-user-profile';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function StudioLayout({ children }) {
  const { isLoaded, isSignedIn } = useUser();
  const { profile, isLoading, isAdmin, isEditor, role } = useProfile();

  if (isLoaded && !isSignedIn) {
    redirect('/sign-in');
  }

  // Security Check: Redirect non-admins away from the Studio
  if (!isLoading && !isAdmin && !isEditor) {
    console.warn(
      `🚫 Access Denied: User has role "${role}". Redirecting to dashboard.`
    );
    redirect('/dashboard');
  }

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <SidebarProvider className={roboto.className}>
      <AppSidebar userRole={role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/studio">Studio</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
