import { getApiServer } from '@/lib/api-server';
import { SubjectManagement } from '../_components/subject-management';

export const metadata = {
  title: 'Subject Management | PyqDeck Studio',
  description:
    'Manage academic subjects, curriculum codes, and syllabus content.',
};

export default async function SubjectsPage({ searchParams }) {
  const api = await getApiServer();

  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page || '1', 10);
  const limit = parseInt(resolvedSearchParams?.limit || '10', 10);
  const universityId = resolvedSearchParams?.universityId;
  const branchId = resolvedSearchParams?.branchId;
  const semesterId = resolvedSearchParams?.semesterId;
  const search = resolvedSearchParams?.q;

  let subjects = [];
  let universities = [];
  let branches = [];
  let semesters = [];
  let pagination = { total: 0, pages: 1, current: 1 };

  try {
    // Parallel fetching for filters
    const [uniRes, branchRes, semRes] = await Promise.all([
      api.universities.listUniversities({ limit: 100 }),
      api.branches.listAllBranches({ limit: 100 }),
      api.semesters.listAllSemesters({ limit: 100 }),
    ]);

    universities = uniRes.data.data.items || [];
    branches = branchRes.data.data.items || [];
    semesters = semRes.data.data.items || [];

    // Fetch subjects (if semesterId is provided, we might want to fetch offerings,
    // but for now let's list global subjects with filters if the API supports it)
    // The current subjects API doesn't seem to have branchId/semesterId filters directly,
    // but subject-offerings does.

    const subRes = await api.subjects.listSubjects({
      page,
      limit,
      // Add other filters if the API is updated to support them
    });

    subjects = subRes.data.data.items || [];
    const backendPagination = subRes.data.data.pagination;

    if (backendPagination) {
      pagination = {
        total: backendPagination.total,
        pages: backendPagination.totalPages,
        current: backendPagination.page,
      };
    }
  } catch (error) {
    console.error('Failed to fetch subjects data:', error);
  }

  return (
    <div className="p-4">
      <SubjectManagement
        initialSubjects={subjects}
        universities={universities}
        branches={branches}
        semesters={semesters}
        pagination={pagination}
      />
    </div>
  );
}
