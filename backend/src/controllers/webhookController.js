import { Webhook } from 'svix';
import config from '../config/index.js';
import * as userService from '../services/userService.js';
import { loggerService } from '../utils/index.js';

const logger = loggerService.getLogger();

export async function handleClerkWebhook(req, res, next) {
  try {
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
      default:
        logger.info('Unhandled webhook event type', { type: event.type });
    }

    res.status(200).json({ received: true });
  } catch (error) {
    next(error);
  }
}
