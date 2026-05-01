import { Router } from 'express';
import * as healthController from '../controllers/healthController.js';

const router = Router();

router.get('/health', healthController.healthCheck);
router.get('/health/detailed', healthController.detailedHealth);

export default router;
