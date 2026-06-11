/* Returns the Stripe publishable key so the client can initialize Stripe.js.
   Publishable keys are safe to expose — only the secret key must stay server-side. */
module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || null
  });
};
