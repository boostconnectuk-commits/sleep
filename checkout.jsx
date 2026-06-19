/* Animated full-screen checkout overlay, opened via BSF.openCheckout. */
function CheckoutItem({ item, index }) {
  return (
    <li className="checkout-item checkout-anim" style={{ "--reveal-index": index }}>
      <div className="checkout-item-icon">
        <i data-lucide={item.icon} aria-hidden="true"></i>
      </div>
      <div className="checkout-item-body">
        <div className="checkout-item-name">{item.name}</div>
        <div className="checkout-item-format">{item.format}</div>
      </div>
      <span className="checkout-item-value">${item.value}</span>
    </li>
  );
}

function Checkout({ open, onClose }) {
  const total = BSF.BUNDLE_ITEMS.reduce((sum, item) => sum + item.value, 0);
  const bundlePrice = 29;

  /* stripeStatus: idle | loading | unconfigured | ready | error */
  const [stripeStatus, setStripeStatus] = React.useState("idle");
  /* paymentStatus: idle | processing | success | error */
  const [paymentStatus, setPaymentStatus] = React.useState("idle");
  const [paymentError, setPaymentError] = React.useState(null);

  /* couponStatus: idle | checking | applied | error */
  const [couponInput, setCouponInput] = React.useState("");
  const [couponStatus, setCouponStatus] = React.useState("idle");
  const [couponError, setCouponError] = React.useState(null);
  const [appliedCoupon, setAppliedCoupon] = React.useState(null);

  const stripeRef = React.useRef(null);
  const elementsRef = React.useRef(null);
  const paymentElementRef = React.useRef(null);
  const paymentIntentIdRef = React.useRef(null);
  const initStartedRef = React.useRef(false);

  const discount = appliedCoupon
    ? appliedCoupon.amountOff
      ? appliedCoupon.amountOff / 100
      : Math.round(bundlePrice * (appliedCoupon.percentOff / 100) * 100) / 100
    : 0;
  const totalToday = Math.max(0, Math.round((bundlePrice - discount) * 100) / 100);
  const savings = total - totalToday;
  const savingsPct = Math.round((savings / total) * 100);

  React.useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return undefined;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  /* Set up Stripe Elements (Payment Element) the first time the modal opens. */
  React.useEffect(() => {
    if (!open || initStartedRef.current) return undefined;
    initStartedRef.current = true;
    setStripeStatus("loading");

    (async () => {
      try {
        const [config, intent] = await Promise.all([
          fetch("/api/config").then((r) => r.json()),
          fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: Math.round(totalToday * 100) })
          }).then((r) => r.json())
        ]);

        if (!config.publishableKey || intent.configured === false) {
          setStripeStatus("unconfigured");
          return;
        }

        if (intent.error || !intent.clientSecret) {
          setPaymentError(intent.error || "Could not start checkout.");
          setStripeStatus("error");
          return;
        }

        const stripe = window.Stripe(config.publishableKey);
        const elements = stripe.elements({
          clientSecret: intent.clientSecret,
          appearance: {
            theme: "night",
            variables: {
              colorPrimary: "#D4A86C",
              colorBackground: "#161320",
              colorText: "#F2EDE8",
              colorDanger: "#D4939A",
              fontFamily: "Inter, sans-serif",
              borderRadius: "8px"
            }
          }
        });

        elements.create("payment").mount(paymentElementRef.current);

        stripeRef.current = stripe;
        elementsRef.current = elements;
        paymentIntentIdRef.current = intent.paymentIntentId || null;
        setStripeStatus("ready");
      } catch (err) {
        setPaymentError(err.message);
        setStripeStatus("error");
      }
    })();

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleApplyCoupon = async () => {
    const code = couponInput.trim();
    if (!code) return;

    setCouponStatus("checking");
    setCouponError(null);

    try {
      const result = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      }).then((r) => r.json());

      if (result.configured === false) {
        setCouponStatus("error");
        setCouponError("Coupons aren't set up yet.");
        return;
      }

      if (!result.valid) {
        setCouponStatus("error");
        setCouponError(result.error || "That code isn't valid.");
        return;
      }

      setAppliedCoupon({
        code: result.code,
        percentOff: result.percentOff,
        amountOff: result.amountOff
      });
      setCouponStatus("applied");

      const discountedAmount = result.amountOff
        ? bundlePrice - result.amountOff / 100
        : bundlePrice - bundlePrice * (result.percentOff / 100);
      const newTotal = Math.max(0, Math.round(discountedAmount * 100) / 100);

      if (paymentIntentIdRef.current) {
        await fetch("/api/update-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: paymentIntentIdRef.current,
            amount: Math.round(newTotal * 100)
          })
        });
      }
    } catch (err) {
      setCouponStatus("error");
      setCouponError("Couldn't check that code. Try again.");
    }
  };

  const handleRemoveCoupon = async () => {
    setAppliedCoupon(null);
    setCouponStatus("idle");
    setCouponInput("");
    setCouponError(null);

    if (paymentIntentIdRef.current) {
      await fetch("/api/update-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId: paymentIntentIdRef.current,
          amount: Math.round(bundlePrice * 100)
        })
      });
    }
  };

  React.useEffect(() => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }, [stripeStatus, paymentStatus]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handlePay = async () => {
    if (!stripeRef.current || !elementsRef.current) return;

    setPaymentStatus("processing");
    setPaymentError(null);

    const { error, paymentIntent } = await stripeRef.current.confirmPayment({
      elements: elementsRef.current,
      confirmParams: { return_url: window.location.href },
      redirect: "if_required"
    });

    if (error) {
      setPaymentError(error.message || "Payment failed. Please try again.");
      setPaymentStatus("error");
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      if (typeof fbq === "function") {
        fbq("track", "Purchase", { value: totalToday, currency: "USD" });
      }
      setPaymentStatus("success");
    } else {
      setPaymentStatus("idle");
    }
  };

  return (
    <div
      className={`checkout-overlay${open ? " is-open" : ""}`}
      aria-hidden={!open}
      onClick={handleOverlayClick}
    >
      <div className="checkout-panel" role="dialog" aria-modal="true" aria-label="Checkout">
        <header className="checkout-header">
          <button type="button" className="checkout-back" onClick={onClose}>
            <i data-lucide="arrow-left" aria-hidden="true"></i>
            Back
          </button>
          <img src="assets/logo.png" alt="Tranquila Sleep" className="checkout-logo" />
        </header>

        <div className="checkout-body">
          {paymentStatus === "success" ? (
            <div className="checkout-success">
              <div className="checkout-success-icon">
                <i data-lucide="check-circle" aria-hidden="true"></i>
              </div>
              <h2 className="checkout-order-title">You&rsquo;re in.</h2>
              <p className="checkout-order-sub">
                Check your email for instant access to The Burnout Sleep Fix. Your first night starts
                tonight.
              </p>
            </div>
          ) : (
          <React.Fragment>
          <div className="checkout-order">
            <div className="checkout-anim" style={{ "--reveal-index": 0 }}>
              <span className="eyebrow">Your order</span>
              <h2 className="checkout-order-title">The Burnout Sleep Fix</h2>
              <p className="checkout-order-sub">Seven nights to real sleep. Everything included.</p>
            </div>

            <ul className="checkout-items">
              {BSF.BUNDLE_ITEMS.map((item, i) => (
                <CheckoutItem item={item} index={i + 1} key={item.name} />
              ))}
            </ul>

            <div className="checkout-totals checkout-anim" style={{ "--reveal-index": 6 }}>
              <div className="checkout-total-row">
                <span>Total value</span>
                <BSF.PriceStrike key={open ? "open" : "closed"} amount={`$${total}`} />
              </div>
              <div className="checkout-total-row is-bundle">
                <span>Bundle price</span>
                <span className="checkout-bundle-price">${bundlePrice}</span>
              </div>
            </div>

            <div className="checkout-coupon checkout-anim" style={{ "--reveal-index": 7 }}>
              {appliedCoupon ? (
                <div className="checkout-coupon-applied">
                  <i data-lucide="badge-percent" aria-hidden="true"></i>
                  <span>
                    Code <strong>{appliedCoupon.code}</strong> applied
                  </span>
                  <button type="button" className="checkout-coupon-remove" onClick={handleRemoveCoupon}>
                    Remove
                  </button>
                </div>
              ) : (
                <div className="checkout-coupon-form">
                  <input
                    type="text"
                    className="checkout-coupon-input"
                    placeholder="Coupon code"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      if (couponStatus === "error") {
                        setCouponStatus("idle");
                        setCouponError(null);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleApplyCoupon();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="checkout-coupon-apply"
                    onClick={handleApplyCoupon}
                    disabled={!couponInput.trim() || couponStatus === "checking"}
                  >
                    {couponStatus === "checking" ? "Checking…" : "Apply"}
                  </button>
                </div>
              )}
              {couponStatus === "error" && couponError && (
                <div className="checkout-coupon-error">{couponError}</div>
              )}
            </div>

            <div className="checkout-savings checkout-anim" style={{ "--reveal-index": 8 }}>
              <i data-lucide="sparkles" aria-hidden="true"></i>
              You save ${savings} ({savingsPct}% off)
            </div>

            <div className="checkout-total-today checkout-anim" style={{ "--reveal-index": 9 }}>
              <span className="checkout-total-today-label">Total today</span>
              <span className="checkout-total-today-price">
                ${totalToday}
              </span>
            </div>
          </div>

          <div className="checkout-pay">
            <div className="checkout-anim" style={{ "--reveal-index": 0 }}>
              <span className="eyebrow">Secure checkout</span>
              <h2 className="checkout-order-title">Complete your order</h2>
              <p className="checkout-order-sub">Instant access. Start tonight.</p>
            </div>

            <div className="checkout-fields">
              <div className="checkout-field checkout-anim" style={{ "--reveal-index": 1 }}>
                <label htmlFor="checkout-email">Email</label>
                <input id="checkout-email" type="email" placeholder="you@example.com" autoComplete="email" />
              </div>

              <div className="checkout-field checkout-anim" style={{ "--reveal-index": 2 }}>
                <label htmlFor="checkout-name">Full name</label>
                <input id="checkout-name" type="text" placeholder="Jordan Smith" autoComplete="name" />
              </div>

              <div className="checkout-field checkout-anim" style={{ "--reveal-index": 3 }}>
                <label htmlFor="checkout-phone">Mobile number</label>
                <input id="checkout-phone" type="tel" placeholder="+1 555 123 4567" autoComplete="tel" />
              </div>

              <div className="checkout-anim" style={{ "--reveal-index": 4 }}>
                {stripeStatus === "unconfigured" && (
                  <div className="checkout-card-mount">
                    <i data-lucide="credit-card" aria-hidden="true"></i>
                    Payment setup pending. Add your Stripe API keys in Vercel to enable checkout.
                  </div>
                )}
                {stripeStatus === "loading" && (
                  <div className="checkout-card-mount">
                    <i data-lucide="loader" aria-hidden="true"></i>
                    Loading secure payment form&hellip;
                  </div>
                )}
                {stripeStatus === "error" && (
                  <div className="checkout-card-mount">
                    <i data-lucide="alert-triangle" aria-hidden="true"></i>
                    Couldn&rsquo;t load the payment form{paymentError ? `: ${paymentError}` : "."}
                  </div>
                )}
                <div
                  ref={paymentElementRef}
                  className="checkout-payment-element"
                  style={{ display: stripeStatus === "ready" ? "block" : "none" }}
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-gold btn-block checkout-pay-btn checkout-anim"
              style={{ "--reveal-index": 5 }}
              onClick={handlePay}
              disabled={stripeStatus !== "ready" || paymentStatus === "processing"}
            >
              <i data-lucide="lock" aria-hidden="true"></i>
              {paymentStatus === "processing" ? "Processing…" : `Pay $${totalToday}`}
            </button>
            {paymentStatus === "error" && paymentError && (
              <div className="checkout-pay-error">{paymentError}</div>
            )}
            <span className="cta-feature-note">Instant download &bull; Lifetime access</span>

            <div className="checkout-trust-row checkout-anim" style={{ "--reveal-index": 6 }}>
              <span>
                <i data-lucide="lock" aria-hidden="true"></i> SSL secure
              </span>
              <span>
                <i data-lucide="shield-check" aria-hidden="true"></i> Stripe checkout
              </span>
              <span>
                <i data-lucide="zap" aria-hidden="true"></i> Instant access
              </span>
            </div>

            <div className="checkout-trust-box checkout-anim" style={{ "--reveal-index": 7 }}>
              <i data-lucide="users" aria-hidden="true"></i>
              <div>
                <div className="checkout-trust-box-title">Join 3,200+ people sleeping better.</div>
                <div className="checkout-trust-box-desc">
                  Real testimonials, real nights. Everything unlocks the moment you pay.
                </div>
              </div>
            </div>
          </div>
          </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

window.Checkout = Checkout;
