import { Router } from 'express';
import { initiateStripePayment } from '../controllers/payment.controller.js';

const router = Router();

router.post('/payment-stripe', initiateStripePayment);

export default router;
