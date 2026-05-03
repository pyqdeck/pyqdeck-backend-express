import { Router } from 'express';
import express from 'express';
import * as webhookController from '../controllers/webhookController.js';
import { rateLimiter } from '../middlewares/rateLimiter.middleware.js';

const router = Router();

/**
 * @openapi
 * /webhooks/clerk:
 *   post:
 *     operationId: postClerkWebhook
 *     tags:
 *       - External Integrations
 *     summary: Clerk Webhook Handler (Users & Sessions)
 *     description: |
 *       Secure endpoint for Clerk.com to send user lifecycle events (created, updated, deleted)
 *       and session events (created). This endpoint also enforces a "Single Session per User" policy.
 *
 *       **Verification**: This endpoint verifies the [Svix Webhook Signature](https://docs.clerk.com/main-concepts/webhooks)
 *       to ensure requests originate from Clerk.
 *     security: []
 *     parameters:
 *       - in: header
 *         name: svix-id
 *         description: Unique webhook event ID
 *         required: true
 *         schema: { type: string }
 *       - in: header
 *         name: svix-timestamp
 *         description: Unix timestamp of the event
 *         required: true
 *         schema: { type: string }
 *       - in: header
 *         name: svix-signature
 *         description: HMAC-SHA256 signature
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       description: Clerk Webhook Event Object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data: { type: object }
 *               object: { type: string, example: "event" }
 *               type: { type: string, example: "user.created" }
 *     responses:
 *       200:
 *         description: Event acknowledged and processed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 received: { type: boolean, example: true }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       429:
 *         $ref: '#/components/responses/TooManyRequests'
 */
router.post(
  '/clerk',
  rateLimiter('WEBHOOK'),
  express.raw({ type: 'application/json' }),
  webhookController.handleClerkWebhook
);

export default router;
