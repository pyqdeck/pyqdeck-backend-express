import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Api } from '@/lib/api-generated';

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

export default async function StudioLayout({ children }) {
  const { getToken, userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  let role = 'student';
  try {
    const token = await getToken();
    const apiUrl = (
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'
    ).replace(/\/+$/, '');

    const res = await fetch(`${apiUrl}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      role = data?.data?.user?.role || 'student';
    }
  } catch (error) {
    console.error(
      'Failed to fetch user role from backend:',
      error?.message || error
    );
  }

  // Security Check: Redirect non-admins away from the Studio
  if (role !== 'admin' && role !== 'editor') {
    redirect('/dashboard');
  }

  return (
    <SidebarProvider>
      <AppSidebar />
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
                  <BreadcrumbPage>Admin Mode</BreadcrumbPage>
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
