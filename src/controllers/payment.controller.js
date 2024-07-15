import stripe from 'stripe';

const stripeSecretKey = 'sk_test_51PbG5LGXyx345BqjeFooVNFL6ta9HriQqcFToPZ2oHQNEF1G2hY12t1nG1KLAgvQ6pYXmUbPObzvoJpdgRDaEoW800IKM9o8pY';

// Función para crear una sesión de checkout
export const createCheckoutSession = async (req, res) => {
    const { course, amount } = req.body;
    try {
        const YOUR_DOMAIN = 'http://localhost:8081/';
        const session = await stripe(stripeSecretKey).checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'mxn',
                        product_data: {
                            name: course, // Nombre del curso
                        },
                        unit_amount: amount * 100, // Monto en centavos
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}?success=true`,
            cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        });
        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
