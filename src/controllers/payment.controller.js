// src/controllers/payment.controller.js

import { Client, Environment } from 'square';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  environment: Environment.Sandbox, // Usa Environment.Production para producción
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export const processPayment = async (req, res) => {
  const { nonce } = req.body;

  const requestBody = {
    sourceId: nonce,
    amountMoney: {
      amount: 100, // El monto en centavos (100 centavos = $1.00)
      currency: 'USD',
    },
    idempotencyKey: crypto.randomBytes(12).toString('hex'),
  };

  try {
    const response = await client.paymentsApi.createPayment(requestBody);
    res.status(200).json(response.result);
  } catch (error) {
    res.status(500).json(error);
  }
};
