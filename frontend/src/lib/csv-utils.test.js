import { describe, it, expect } from 'vitest';
import { generateSlug } from './csv-utils';

describe('generateSlug', () => {
  it('should convert to lowercase', () => {
    expect(generateSlug('University Of Mumbai')).toBe('university-of-mumbai');
  });

  it('should trim whitespace', () => {
    expect(generateSlug('  University of Mumbai  ')).toBe('university-of-mumbai');
  });

  it('should replace spaces with hyphens', () => {
    expect(generateSlug('University of Mumbai')).toBe('university-of-mumbai');
  });

  it('should replace underscores with hyphens', () => {
    expect(generateSlug('University_of_Mumbai')).toBe('university-of-mumbai');
  });

  it('should handle multiple spaces and underscores', () => {
    expect(generateSlug('University  __ of _ Mumbai')).toBe('university-of-mumbai');
  });

  it('should remove special characters', () => {
    expect(generateSlug('University of Mumbai (MU)@!')).toBe('university-of-mumbai-mu');
  });

  it('should handle existing hyphens', () => {
    expect(generateSlug('university-of-mumbai')).toBe('university-of-mumbai');
  });

  it('should avoid multiple hyphens', () => {
    expect(generateSlug('University---of---Mumbai')).toBe('university-of-mumbai');
  });

  it('should remove leading and trailing hyphens', () => {
    expect(generateSlug('-University of Mumbai-')).toBe('university-of-mumbai');
  });

  it('should handle numbers', () => {
    expect(generateSlug('University 123')).toBe('university-123');
  });

  it('should handle non-string inputs by converting to string', () => {
    expect(generateSlug(12345)).toBe('12345');
    expect(generateSlug(null)).toBe('null');
  });

  it('should return empty string for empty input after processing', () => {
    expect(generateSlug('')).toBe('');
    expect(generateSlug('   ')).toBe('');
    expect(generateSlug('@#$%')).toBe('');
  });
});
