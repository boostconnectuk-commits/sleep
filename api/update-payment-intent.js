const Stripe = require("stripe");

/* Keeps the PaymentIntent amount in sync when the order bump is toggled,
   without remounting the Payment Element. */
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

  const { paymentIntentId } = body || {};
  const amount = Math.round(Number(body && body.amount));

  if (!paymentIntentId || !Number.isInteger(amount) || amount < 50) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    await stripe.paymentIntents.update(paymentIntentId, { amount });
    res.status(200).json({ configured: true, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
