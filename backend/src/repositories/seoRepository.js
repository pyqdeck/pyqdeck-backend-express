import { Question } from '../models/Question.js';
import { Paper } from '../models/Paper.js';
import { Subject } from '../models/Subject.js';
import { University } from '../models/University.js';

class SeoRepository {
  /**
   * Fetches all public slugs for questions
   */
  async getAllQuestionSlugs() {
    return Question.find({ isVerified: true })
      .select('slug updatedAt')
      .sort({ updatedAt: -1 })
      .lean();
  }

  /**
   * Fetches all public slugs for papers
   */
  async getAllPaperSlugs() {
    return Paper.find({ status: 'approved' })
      .select('slug updatedAt')
      .sort({ updatedAt: -1 })
      .lean();
  }

  /**
   * Fetches all public slugs for subjects
   */
  async getAllSubjectSlugs() {
    return Subject.find({ isActive: true })
      .select('slug updatedAt')
      .sort({ updatedAt: -1 })
      .lean();
  }

  /**
   * Fetches all university slugs
   */
  async getAllUniversitySlugs() {
    return University.find({ isActive: true }).select('slug updatedAt').lean();
  }
}

export const seoRepository = new SeoRepository();
export default seoRepository;
