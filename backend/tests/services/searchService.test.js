import { describe, it, expect, vi, beforeEach } from 'vitest';
import searchService from '../../src/services/searchService.js';
import questionRepository from '../../src/repositories/questionRepository.js';
import subjectRepository from '../../src/repositories/subjectRepository.js';
import paperRepository from '../../src/repositories/paperRepository.js';

vi.mock('../../src/repositories/questionRepository.js', () => ({
  default: { findAll: vi.fn(), findWithContext: vi.fn() },
}));
vi.mock('../../src/repositories/subjectRepository.js', () => ({
  default: { findAll: vi.fn() },
}));
vi.mock('../../src/repositories/paperRepository.js', () => ({
  default: { findAll: vi.fn() },
}));

describe('SearchService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should run unified search across repositories with context', async () => {
    questionRepository.findWithContext.mockResolvedValue({
      items: ['q1'],
      total: 1,
    });
    subjectRepository.findAll.mockResolvedValue({ items: ['s1'], total: 1 });
    paperRepository.findAll.mockResolvedValue({ items: ['p1'], total: 1 });

    const results = await searchService.unifiedSearch('test', { limit: 10 });

    expect(questionRepository.findWithContext).toHaveBeenCalled();
    expect(subjectRepository.findAll).toHaveBeenCalled();
    expect(paperRepository.findAll).toHaveBeenCalled();
    expect(results.totalQuestions).toBe(1);
    expect(results.questions).toContain('q1');
  });
});
