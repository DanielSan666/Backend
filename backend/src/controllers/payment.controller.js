import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51PbG5LGXyx345BqjeFooVNFL6ta9HriQqcFToPZ2oHQNEF1G2hY12t1nG1KLAgvQ6pYXmUbPObzvoJpdgRDaEoW800IKM9o8pY');

export const initiateStripePayment = async (req, res) => {
  const { course, amount, courseId } = req.body; // Add courseId here
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: course,
            },
            unit_amount: amount * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/course/${courseId}?status=success`,
      cancel_url: `http://localhost:3000/course/${courseId}?status=cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
};
