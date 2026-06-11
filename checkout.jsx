/* Animated full-screen checkout overlay, opened via BSF.openCheckout. */
const ORDER_BUMP = {
  icon: "moon-star",
  name: "The Sleep Sounds Library",
  description: "8 hours of low, ambient sound for the nights your mind won't switch off.",
  price: 9,
  compareAt: 19
};

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
      <span className="checkout-item-value">£{item.value}</span>
    </li>
  );
}

function Checkout({ open, onClose }) {
  const [bumpAdded, setBumpAdded] = React.useState(false);

  const total = BSF.BUNDLE_ITEMS.reduce((sum, item) => sum + item.value, 0);
  const bundlePrice = 27;
  const savings = total - bundlePrice;
  const savingsPct = Math.round((savings / total) * 100);
  const totalToday = bundlePrice + (bumpAdded ? ORDER_BUMP.price : 0);
  const pulsing = BSF.usePulse(totalToday);

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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
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
          <span className="checkout-wordmark">
            The Burnout <em>Sleep Fix</em>
          </span>
        </header>

        <div className="checkout-body">
          <div className="checkout-order">
            <div className="checkout-anim" style={{ "--reveal-index": 0 }}>
              <span className="eyebrow">Your order</span>
              <h2 className="checkout-order-title">The Burnout Sleep Fix</h2>
              <p className="checkout-order-sub">Seven nights to real sleep &mdash; everything included.</p>
            </div>

            <ul className="checkout-items">
              {BSF.BUNDLE_ITEMS.map((item, i) => (
                <CheckoutItem item={item} index={i + 1} key={item.name} />
              ))}
            </ul>

            <div className="checkout-totals checkout-anim" style={{ "--reveal-index": 6 }}>
              <div className="checkout-total-row">
                <span>Total value</span>
                <BSF.PriceStrike key={open ? "open" : "closed"} amount={`£${total}`} />
              </div>
              <div className="checkout-total-row is-bundle">
                <span>Bundle price</span>
                <span className="checkout-bundle-price">£{bundlePrice}</span>
              </div>
            </div>

            <div className="checkout-savings checkout-anim" style={{ "--reveal-index": 7 }}>
              <i data-lucide="sparkles" aria-hidden="true"></i>
              You save £{savings} ({savingsPct}% off)
            </div>

            <button
              type="button"
              className={`checkout-bump checkout-anim${bumpAdded ? " is-checked" : ""}`}
              style={{ "--reveal-index": 8 }}
              role="checkbox"
              aria-checked={bumpAdded}
              onClick={() => setBumpAdded((v) => !v)}
            >
              <span className="checkout-bump-box" aria-hidden="true">
                <i data-lucide="check"></i>
              </span>
              <span className="checkout-bump-body">
                <span className="checkout-bump-title">
                  Add {ORDER_BUMP.name}
                  <span className="checkout-bump-price">+£{ORDER_BUMP.price}</span>
                  <span className="checkout-bump-was">was £{ORDER_BUMP.compareAt}</span>
                </span>
                <span className="checkout-bump-desc">{ORDER_BUMP.description}</span>
              </span>
            </button>

            <div className="checkout-total-today checkout-anim" style={{ "--reveal-index": 9 }}>
              <span className="checkout-total-today-label">Total today</span>
              <span className="checkout-total-today-price" data-pulse={pulsing ? "true" : "false"}>
                £{totalToday}
              </span>
            </div>
          </div>

          <div className="checkout-pay">
            <div className="checkout-anim" style={{ "--reveal-index": 0 }}>
              <span className="eyebrow">Secure checkout</span>
              <h2 className="checkout-order-title">Complete your order</h2>
              <p className="checkout-order-sub">Instant access &mdash; start tonight.</p>
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

              <div className="checkout-card-mount checkout-anim" style={{ "--reveal-index": 3 }}>
                <i data-lucide="credit-card" aria-hidden="true"></i>
                Card details &mdash; secured by Stripe at checkout
              </div>
            </div>

            <button
              type="button"
              className="btn btn-gold btn-block checkout-pay-btn checkout-anim"
              style={{ "--reveal-index": 4 }}
            >
              <i data-lucide="lock" aria-hidden="true"></i>
              Pay £{totalToday}
            </button>
            <span className="guarantee-microcopy">7-night money-back guarantee &mdash; no questions asked</span>

            <div className="checkout-trust-row checkout-anim" style={{ "--reveal-index": 5 }}>
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

            <div className="checkout-guarantee-box checkout-anim" style={{ "--reveal-index": 6 }}>
              <i data-lucide="shield" aria-hidden="true"></i>
              <div>
                <div className="checkout-guarantee-box-title">Try it for seven nights.</div>
                <div className="checkout-guarantee-box-desc">
                  If it doesn&rsquo;t work, it&rsquo;s free. Email us within 7 nights for a full refund &mdash; no
                  questions asked.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Checkout = Checkout;
