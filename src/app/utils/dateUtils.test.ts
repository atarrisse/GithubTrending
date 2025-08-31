import { formatDate, getUserLocale } from './dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('formats GitHub API date correctly', () => {
      const githubDate = '2023-01-15T10:30:00Z';
      const result = formatDate(githubDate);
      expect(result).toMatch(/Jan.*15.*2023/);
    });

    it('handles invalid date string', () => {
      const result = formatDate('invalid-date');
      expect(result).toBe('Invalid date');
    });
  });

  describe('getUserLocale', () => {
    it('returns user locale from browser', () => {
      const result = getUserLocale();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
