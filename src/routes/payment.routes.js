const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller'); // Asegúrate de importar correctamente el controlador

// Ruta para crear una sesión de checkout
router.post('/create-checkout-session', paymentController.createCheckoutSession);

module.exports = router;
