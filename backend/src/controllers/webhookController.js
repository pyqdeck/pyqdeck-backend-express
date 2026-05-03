import { Webhook } from 'svix';
import { clerkClient } from '@clerk/express';
import config from '../config/index.js';
import userService from '../services/userService.js';
import { loggerService, catchAsync } from '../utils/index.js';

const logger = loggerService.getLogger();

export const handleClerkWebhook = catchAsync(async (req, res, next) => {
  const wh = new Webhook(config.clerk.webhookSecret);

  let event;
  try {
    event = wh.verify(req.body, {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    });
  } catch {
    return res.status(400).json({ error: 'Invalid webhook signature' });
  }

  logger.info('Clerk webhook received', { type: event.type });

  switch (event.type) {
    case 'user.created':
      await userService.handleUserCreated(event.data);
      break;
    case 'user.updated':
      await userService.handleUserUpdated(event.data);
      break;
    case 'user.deleted':
      await userService.handleUserDeleted(event.data);
      break;
    case 'session.created': {
      const { user_id: userId, id: currentSessionId } = event.data;
      logger.info('Revoking old sessions for user', {
        userId,
        currentSessionId,
      });
      const { data: sessions } = await clerkClient.sessions.getSessionList({
        userId,
      });
      for (const session of sessions) {
        if (session.id !== currentSessionId && session.status === 'active') {
          await clerkClient.sessions.revokeSession(session.id);
          logger.info('Revoked old session', { sessionId: session.id });
        }
      }
      break;
    }
    default:
      logger.info('Unhandled webhook event type', { type: event.type });
  }

  res.status(200).json({ received: true });
});
