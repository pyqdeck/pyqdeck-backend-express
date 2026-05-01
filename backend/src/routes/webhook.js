import { Router } from 'express';
import express from 'express';
import * as webhookController from '../controllers/webhookController.js';

const router = Router();

router.post('/clerk', express.raw({ type: 'application/json' }), webhookController.handleClerkWebhook);

export default router;
