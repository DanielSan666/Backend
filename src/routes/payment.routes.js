// src/routes/payment.routes.js

import { Router } from 'express';
import { processPayment } from '../controllers/payment.controller.js';

const router = Router();

router.post('/process-payment', processPayment);

export default router;
