import { getApiServer } from '@/lib/api-server';
import { OfferingManagement } from '../_components/offering-management';

export const metadata = {
  title: 'Subject Offerings | PyqDeck Studio',
  description:
    'Manage subject delivery across different semesters and branches.',
};

export default async function OfferingsPage({ searchParams }) {
  const api = await getApiServer();

  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page || '1', 10);
  const limit = parseInt(resolvedSearchParams?.limit || '10', 10);
  const universityId = resolvedSearchParams?.universityId;
  const branchId = resolvedSearchParams?.branchId;
  const semesterId = resolvedSearchParams?.semesterId;

  let offerings = [];
  let universities = [];
  let branches = [];
  let semesters = [];
  let subjects = [];
  let pagination = { total: 0, pages: 1, current: 1 };

  try {
    // Parallel fetching for filters
    const [uniRes, branchRes, semRes, subRes] = await Promise.all([
      api.universities.listUniversities({ limit: 100 }),
      api.branches.listAllBranches({ limit: 100 }),
      api.semesters.listAllSemesters({ limit: 100 }),
      api.subjects.listSubjects({ limit: 100 }),
    ]);

    universities = uniRes.data.data.items || [];
    branches = branchRes.data.data.items || [];
    semesters = semRes.data.data.items || [];
    subjects = subRes.data.data.items || [];

    // Fetch offerings
    const offRes = await api.subjectOfferings.listSubjectOfferings({
      page,
      limit,
      universityId: universityId === 'all' ? undefined : universityId,
      branchId: branchId === 'all' ? undefined : branchId,
      semesterId: semesterId === 'all' ? undefined : semesterId,
    });

    offerings = offRes.data.data.items || [];
    const backendPagination = offRes.data.data.pagination;

    if (backendPagination) {
      pagination = {
        total: backendPagination.total,
        pages: backendPagination.totalPages,
        current: backendPagination.page,
      };
    }
  } catch (error) {
    console.error('Failed to fetch offerings data:', error);
  }

  return (
    <div className="p-4">
      <OfferingManagement
        initialOfferings={offerings}
        universities={universities}
        branches={branches}
        semesters={semesters}
        subjects={subjects}
        pagination={pagination}
      />
    </div>
  );
}
