function Stat({ value, label, variant }) {
  return (
    <div className="stat">
      <div className={`stat-value${variant ? ` is-${variant}` : ""}`}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function ValueStack() {
  const total = BSF.BUNDLE_ITEMS.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="section" id="offer">
      <div className="container">
        <BSF.Reveal as="div" className="section-header">
          <span className="eyebrow">The full picture</span>
          <h2 className="section-title">£{total} of help. £27 tonight.</h2>
          <p className="subheadline">See exactly what you&rsquo;re getting, and what it would cost separately.</p>
        </BSF.Reveal>

        <BSF.Reveal as="div" className="stats-row" index={1}>
          <Stat value="5" label="Items included" />
          <Stat value={`£${total}`} label="Total value" variant="faint" />
          <Stat value="£27" label="Your price today" variant="gold" />
          <Stat value="7" label="Night guarantee" />
        </BSF.Reveal>

        <BSF.Reveal as="div" className="value-table" index={2}>
          {BSF.BUNDLE_ITEMS.map((item) => (
            <div className="value-row" key={item.name}>
              <span className="value-row-name">{item.name}</span>
              <span className="value-row-price">£{item.value}</span>
            </div>
          ))}
          <div className="value-total">
            <span>Total value</span>
            <span className="value-total-price">
              <BSF.PriceStrike amount={`£${total}`} />
            </span>
          </div>
        </BSF.Reveal>

        <BSF.Reveal as="div" className="your-price" index={3}>
          <div className="your-price-label">Your price tonight</div>
          <div className="your-price-amount">£27</div>
        </BSF.Reveal>

        <BSF.Reveal as="div" className="cta-wrap" index={4}>
          <a href="#cta" className="btn btn-gold btn-block" onClick={BSF.openCheckout}>
            Start tonight &mdash; £27
          </a>
          <span className="guarantee-microcopy">7-night money-back guarantee &mdash; no questions asked</span>
        </BSF.Reveal>
      </div>
    </section>
  );
}

window.ValueStack = ValueStack;
