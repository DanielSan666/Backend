// src/controllers/payment.controller.js
import stripe from 'stripe';
import { Client, Environment } from 'square';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  environment: Environment.Sandbox, // Usa Environment.Production para producción
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

const stripeSecretKey = process.env.STRIPE_API_KEY

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



export const agregarPedidoTarjeta = async (req, res) => {
    try {
        // Realizar la solicitud a la API de Clip
        const clipResponse = await fetch('https://api-gw.payclip.com/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': `${process.env.CLIP_API_KEY}`
            },
            body: JSON.stringify(req.body)
        });

        // Verificar si la solicitud a la API de Clip fue exitosa
        if (!clipResponse.ok) {
            return res.status(400).json({ error: 'Error al procesar el pago con Clip' });
        }

        const data = await clipResponse.json();
        console.log('Respuesta de Clip:', data);

        // Enviar la respuesta obtenida de Clip como respuesta de la API
        res.status(200).json(data);
    } catch (error) {
        console.log(data)
        console.error('Error al procesar el pago:', error);
        res.status(500).json({ error: 'Hubo un error al procesar el pago' });
    }
};


export const createCheckoutSession = async (req, res) => {
    const { course, amountPago } = req.body;
    try {
        const YOUR_DOMAIN = 'https://expo.dev/@danielsan98/curso';
        
        const session = await stripe(stripeSecretKey).checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'mxn',
                        product_data: {
                            name: course,
                        },
                        unit_amount: amountPago * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/curso?course=${course}&success=true`,
            cancel_url: `${YOUR_DOMAIN}/curso?course=${course}&canceled=true`,
        });
        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
