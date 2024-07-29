import { Client, Environment } from 'square';

// Configura las credenciales de Square para producción
const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN_PRODUCTION,
  environment: Environment.Production, // Cambia a Environment.Production
});

const paymentsApi = client.paymentsApi;

export const createPayment = async (req, res) => {
  const { sourceId, amount, idempotencyKey } = req.body;

  try {
    const response = await paymentsApi.createPayment({
      sourceId: sourceId,
      amountMoney: {
        amount: amount, // La cantidad en centavos
        currency: 'USD',
      },
      idempotencyKey: idempotencyKey,
    });

    res.status(200).json(response.result);
  } catch (error) {
    console.error('Error creating payment:', error.response ? error.response.body : error.message);
    res.status(500).json({ error: error.message });
  }
};
