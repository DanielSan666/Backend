const stripe = require('stripe')('sk_test_51PbG5LGXyx345BqjeFooVNFL6ta9HriQqcFToPZ2oHQNEF1G2hY12t1nG1KLAgvQ6pYXmUbPObzvoJpdgRDaEoW800IKM9o8pY');

// Función para crear una sesión de checkout
exports.createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: '{{PRICE_ID}}', // Reemplaza '{{PRICE_ID}}' con el ID real de tu producto en Stripe
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5000/success?session_id={CHECKOUT_SESSION_ID}', // URL de éxito en tu frontend
      cancel_url: 'http://localhost:5000/canceled', // URL de cancelación en tu frontend
    });

    res.json({ sessionId: session.id }); // Devuelve el ID de la sesión de checkout a tu frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
