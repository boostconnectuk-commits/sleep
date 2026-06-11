const Stripe = require("stripe");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    res.status(200).json({ configured: false });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (err) {
      body = {};
    }
  }

  const amount = Math.round(Number(body && body.amount));

  if (!Number.isInteger(amount) || amount < 50) {
    res.status(400).json({ error: "Invalid amount" });
    return;
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
      automatic_payment_methods: { enabled: true }
    });

    res.status(200).json({
      configured: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
