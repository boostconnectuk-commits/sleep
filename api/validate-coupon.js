const Stripe = require("stripe");

/* Looks up a customer-entered code against Stripe Promotion Codes, so
   discounts are managed entirely in the Stripe dashboard, not hardcoded here. */
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

  const code = String((body && body.code) || "").trim();

  if (!code) {
    res.status(400).json({ error: "Enter a code" });
    return;
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const result = await stripe.promotionCodes.list({ code, active: true, limit: 1 });
    const promo = result.data[0];

    if (!promo || !promo.coupon || promo.coupon.valid === false) {
      res.status(200).json({ configured: true, valid: false, error: "That code isn't valid or has expired." });
      return;
    }

    res.status(200).json({
      configured: true,
      valid: true,
      promotionCodeId: promo.id,
      code: promo.code,
      percentOff: promo.coupon.percent_off || null,
      amountOff: promo.coupon.amount_off || null,
      currency: promo.coupon.currency || null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
