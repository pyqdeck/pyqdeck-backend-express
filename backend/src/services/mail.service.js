import { resendClient, mailGenerator } from '../config/mail.config.js';
import config from '../config/index.js';
import { loggerService } from '../utils/index.js';

const logger = loggerService.getLogger();

export async function sendVerificationEmail(email, otp) {
  if (!resendClient) {
    logger.warn('Email provider not configured', { to: email });
    return;
  }

  const emailContent = mailGenerator.generate({
    to: email,
    action: {
      instructions: 'Use the following OTP to verify your email:',
      button: {
        color: '#22BC66',
        text: otp,
      },
    },
  });

  try {
    await resendClient.emails.send({
      from: config.mail.from,
      to: email,
      subject: 'Verify Your Email',
      html: emailContent.body,
    });

    logger.info('Verification email sent', { to: email });
  } catch (error) {
    logger.error('Failed to send verification email', {
      to: email,
      error: error.message,
    });
    throw error;
  }
}

export async function sendWelcomeEmail(email, name) {
  if (!resendClient) {
    logger.warn('Email provider not configured', { to: email });
    return;
  }

  const emailContent = mailGenerator.generate({
    to: email,
    theme: {
      name: 'Welcome!',
    },
    intro: `Welcome ${name}! We're glad to have you on board.`,
    outro: 'If you have any questions, feel free to reach out to us.',
  });

  try {
    await resendClient.emails.send({
      from: config.mail.from,
      to: email,
      subject: 'Welcome to Our Platform',
      html: emailContent.body,
    });

    logger.info('Welcome email sent', { to: email, name });
  } catch (error) {
    logger.error('Failed to send welcome email', {
      to: email,
      error: error.message,
    });
    throw error;
  }
}

export async function sendPasswordResetEmail(email, otp) {
  if (!resendClient) {
    logger.warn('Email provider not configured', { to: email });
    return;
  }

  const emailContent = mailGenerator.generate({
    to: email,
    action: {
      instructions: 'Use the following OTP to reset your password:',
      button: {
        color: '#FF0000',
        text: otp,
      },
    },
  });

  try {
    await resendClient.emails.send({
      from: config.mail.from,
      to: email,
      subject: 'Reset Your Password',
      html: emailContent.body,
    });

    logger.info('Password reset email sent', { to: email });
  } catch (error) {
    logger.error('Failed to send password reset email', {
      to: email,
      error: error.message,
    });
    throw error;
  }
}
