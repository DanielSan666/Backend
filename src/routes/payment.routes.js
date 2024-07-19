// src/routes/payment.routes.js

import { Router } from 'express';
import { agregarPedidoTarjeta, createCheckoutSession, processPayment } from '../controllers/payment.controller.js';

const router = Router();

router.post('/process-payment', processPayment);
router.post('/payment-clip', agregarPedidoTarjeta)
router.post('/payment-stripe', createCheckoutSession)

export default router;
