import { describe, it, expect, vi } from 'vitest';
import * as mailService from '../../src/services/mail.service.js';

// Mock config to return NO resendClient
vi.mock('../../src/config/mail.config.js', () => ({
  resendClient: null,
  mailGenerator: {
    generate: vi.fn().mockReturnValue({ body: 'test' }),
  },
}));

describe('MailService (No Config)', () => {
  it('sendVerificationEmail should return early if no resendClient', async () => {
    const result = await mailService.sendVerificationEmail(
      'test@example.com',
      '123'
    );
    expect(result).toBeUndefined();
  });

  it('sendWelcomeEmail should return early if no resendClient', async () => {
    const result = await mailService.sendWelcomeEmail(
      'test@example.com',
      'John'
    );
    expect(result).toBeUndefined();
  });

  it('sendPasswordResetEmail should return early if no resendClient', async () => {
    const result = await mailService.sendPasswordResetEmail(
      'test@example.com',
      '123'
    );
    expect(result).toBeUndefined();
  });
});
