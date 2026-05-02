import { getApiServer } from '@/lib/api-server';
import { SemesterManagement } from '../_components/semester-management';

export default async function SemestersPage({ searchParams }) {
  const api = await getApiServer();

  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page || '1', 10);
  const limit = parseInt(resolvedSearchParams?.limit || '10', 10);
  const universityId = resolvedSearchParams?.universityId;
  const branchId = resolvedSearchParams?.branchId;

  let initialSemesters = [];
  let branches = [];
  let universities = [];
  let pagination = { total: 0, pages: 1, current: 1 };

  try {
    // Parallel data fetching for filters
    const [uniRes, branchRes] = await Promise.all([
      api.universities.listUniversities({ limit: 100 }),
      api.branches.listAllBranches({ limit: 100 }),
    ]);

    universities = uniRes.data.data.items || [];
    branches = branchRes.data.data.items || [];

    // Fetch semesters using the new global endpoint
    const semRes = await api.semesters.listAllSemesters({
      page,
      limit,
      branchId: branchId === 'all' ? undefined : branchId,
    });

    initialSemesters = semRes.data.data.items || [];
    const backendPagination = semRes.data.data.pagination;

    if (backendPagination) {
      pagination = {
        total: backendPagination.total,
        pages: backendPagination.totalPages,
        current: backendPagination.page,
      };
    }
  } catch (error) {
    console.error('Failed to fetch semesters data:', error);
  }

  return (
    <div className="p-4">
      <SemesterManagement
        initialSemesters={initialSemesters}
        branches={branches}
        universities={universities}
        pagination={pagination}
      />
    </div>
  );
}
