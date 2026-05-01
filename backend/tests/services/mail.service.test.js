import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as mailService from '../../src/services/mail.service.js';
import { resendClient, mailGenerator } from '../../src/config/mail.config.js';

vi.mock('../../src/config/mail.config.js', () => ({
  resendClient: {
    emails: {
      send: vi.fn(),
    },
  },
  mailGenerator: {
    generate: vi.fn().mockReturnValue({ body: '<html>test</html>' }),
  },
}));

describe('MailService', () => {
  const email = 'test@example.com';
  const otp = '123456';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('sendVerificationEmail', () => {
    it('should send verification email successfully', async () => {
      resendClient.emails.send.mockResolvedValue({ id: '1' });

      await mailService.sendVerificationEmail(email, otp);

      expect(resendClient.emails.send).toHaveBeenCalledWith(
        expect.objectContaining({
          to: email,
          subject: 'Verify Your Email',
          html: '<html>test</html>',
        })
      );
    });

    it('should throw error if sending fails', async () => {
      resendClient.emails.send.mockRejectedValue(new Error('Send failed'));

      await expect(
        mailService.sendVerificationEmail(email, otp)
      ).rejects.toThrow('Send failed');
    });
  });

  describe('sendWelcomeEmail', () => {
    it('should send welcome email successfully', async () => {
      resendClient.emails.send.mockResolvedValue({ id: '2' });

      await mailService.sendWelcomeEmail(email, 'John');

      expect(resendClient.emails.send).toHaveBeenCalledWith(
        expect.objectContaining({
          to: email,
          subject: 'Welcome to Our Platform',
        })
      );
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('should send password reset email successfully', async () => {
      resendClient.emails.send.mockResolvedValue({ id: '3' });

      await mailService.sendPasswordResetEmail(email, otp);

      expect(resendClient.emails.send).toHaveBeenCalledWith(
        expect.objectContaining({
          to: email,
          subject: 'Reset Your Password',
        })
      );
    });
  });
});
