import { getApiServer } from '@/lib/api-server';
import { BranchManagement } from '../_components/branch-management';

export default async function BranchesPage({ searchParams }) {
  const api = await getApiServer();

  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || '';
  const page = parseInt(resolvedSearchParams?.page || '1', 10);
  const limit = parseInt(resolvedSearchParams?.limit || '10', 10);
  const universityId = resolvedSearchParams?.universityId;

  let initialBranches = [];
  let universities = [];
  let pagination = { total: 0, pages: 1, current: 1 };

  try {
    // Fetch universities for filter
    const uniRes = await api.universities.listUniversities({ limit: 100 });
    universities = uniRes.data.data.items || [];

    // Fetch branches (either all or for a specific university)
    const branchRes = await api.branches.listAllBranches({
      page,
      limit,
      search,
      universityId: universityId === 'all' ? undefined : universityId,
    });

    initialBranches = branchRes.data.data.items || [];
    const backendPagination = branchRes.data.data.pagination;

    if (backendPagination) {
      pagination = {
        total: backendPagination.total,
        pages: backendPagination.totalPages,
        current: backendPagination.page,
      };
    }
  } catch (error) {
    console.error('Failed to fetch branches data:', error);
  }

  return (
    <div className="p-4">
      <BranchManagement
        initialBranches={initialBranches}
        universities={universities}
        pagination={pagination}
      />
    </div>
  );
}
