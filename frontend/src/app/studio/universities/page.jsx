import { getApiServer } from '@/lib/api-server';
import { AddUniversityDialog } from '../_components/add-university-dialog';
import { UniversitiesTable } from '../_components/universities-table';

export default async function UniversitiesPage({ searchParams }) {
  const api = await getApiServer();

  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page || '1', 10);
  const limit = parseInt(resolvedSearchParams?.limit || '10', 10);

  let universities = [];
  let pagination = { total: 0, pages: 1, current: 1 };

  try {
    const res = await api.universities.listUniversities({
      page,
      limit,
      isActive: 'all',
    });
    universities = res.data.data.items || [];
    const backendPagination = res.data.data.pagination;
    if (backendPagination) {
      pagination = {
        total: backendPagination.total,
        pages: backendPagination.totalPages,
        current: backendPagination.page,
      };
    }
  } catch (error) {
    console.error('Failed to fetch universities:', error);
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
            Universities
          </h1>
          <p className="text-muted-foreground font-roboto">
            Manage institution profiles and academic settings.
          </p>
        </div>
        <AddUniversityDialog />
      </div>

      <UniversitiesTable
        initialUniversities={universities}
        pagination={pagination}
      />
    </div>
  );
}
