import { Router } from 'express';
import express from 'express';
import * as webhookController from '../controllers/webhookController.js';

const router = Router();

/**
 * @openapi
 * /webhooks/clerk:
 *   post:
 *     tags:
 *       - Webhooks
 *     summary: Handle Clerk webhooks
 *     description: Endpoint for Clerk to send user synchronization events (created, updated, deleted).
 *     security: []
 *     parameters:
 *       - in: header
 *         name: svix-id
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: svix-timestamp
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: svix-signature
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 received:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid webhook signature
 */
router.post(
  '/clerk',
  express.raw({ type: 'application/json' }),
  webhookController.handleClerkWebhook
);

export default router;
