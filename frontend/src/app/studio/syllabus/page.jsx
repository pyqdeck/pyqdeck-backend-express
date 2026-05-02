import { getApiServer } from '@/lib/api-server';
import { SyllabusBuilder } from '../_components/syllabus-builder';

export const metadata = {
  title: 'Syllabus Builder | PyqDeck Studio',
  description: 'Design and structure curriculum modules and learning topics.',
};

export default async function SyllabusPage({ searchParams }) {
  const api = await getApiServer();

  const resolvedSearchParams = await searchParams;
  const offeringId = resolvedSearchParams?.offeringId;

  let offerings = [];
  let currentSyllabus = null;
  let modules = [];

  try {
    // Fetch offerings to select from
    const offRes = await api.subjectOfferings.listSubjectOfferings({
      limit: 100,
    });
    offerings = offRes.data.data.items || [];

    if (offeringId) {
      // Fetch syllabus for the selected offering (includes modules and topics)
      const sylRes =
        await api.subjectOfferings.getSyllabusBySubjectOffering(offeringId);
      currentSyllabus = sylRes.data.data;
      modules = currentSyllabus?.modules || [];
    }
  } catch (error) {
    if (error.response?.status !== 404) {
      console.error('Failed to fetch syllabus data:', error);
    }
  }

  return (
    <div className="p-4">
      <SyllabusBuilder
        offerings={offerings}
        currentOfferingId={offeringId}
        syllabus={currentSyllabus}
        modules={modules}
      />
    </div>
  );
}
