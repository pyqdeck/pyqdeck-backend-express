import seoRepository from '../repositories/seoRepository.js';

class SeoService {
  /**
   * Generates a flat list of all public URLs for the sitemap
   */
  async getSitemapData() {
    const [questions, papers, subjects, universities] = await Promise.all([
      seoRepository.getAllQuestionSlugs(),
      seoRepository.getAllPaperSlugs(),
      seoRepository.getAllSubjectSlugs(),
      seoRepository.getAllUniversitySlugs(),
    ]);

    const data = [
      ...universities.map((u) => ({
        url: `/universities/${u.slug}`,
        lastMod: u.updatedAt,
        priority: 0.8,
      })),
      ...subjects.map((s) => ({
        url: `/subjects/${s.slug}`,
        lastMod: s.updatedAt,
        priority: 0.7,
      })),
      ...papers.map((p) => ({
        url: `/papers/${p.slug}`,
        lastMod: p.updatedAt,
        priority: 0.6,
      })),
      ...questions.map((q) => ({
        url: `/questions/${q.slug}`,
        lastMod: q.updatedAt,
        priority: 0.5,
      })),
    ];

    return data;
  }
}

export const seoService = new SeoService();
export default seoService;
