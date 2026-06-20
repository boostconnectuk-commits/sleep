/* Shared namespace for small utilities reused across section files. */
const BSF = (window.BSF = window.BSF || {});

/* ------------------------------------------------------------------ */
/* Reveal — IntersectionObserver fade-up wrapper for scroll animations  */
/* ------------------------------------------------------------------ */
BSF.Reveal = function Reveal({ as: Tag = "div", className = "", index = 0, style = {}, children, ...rest }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ ...style, "--reveal-index": index }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/* ------------------------------------------------------------------ */
/* PriceStrike — animated diagonal strike-through over a $ amount       */
/* ------------------------------------------------------------------ */
BSF.PriceStrike = function PriceStrike({ amount = "$149", className = "" }) {
  const ref = React.useRef(null);
  const [drawn, setDrawn] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setDrawn(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span className={`price-old${className ? ` ${className}` : ""}`} ref={ref}>
      {amount}
      <svg className="price-strike-svg" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
        <line className={`strike-line${drawn ? " is-drawn" : ""}`} x1="4" y1="36" x2="96" y2="4" />
      </svg>
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* StarIcon — used by testimonial ratings                               */
/* ------------------------------------------------------------------ */
BSF.StarIcon = function StarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 2.6l2.95 6.16 6.75.96-4.88 4.8 1.15 6.74L12 17.9l-6.07 3.36 1.15-6.74-4.88-4.8 6.75-.96z" />
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* openCheckout — overwritten by App once mounted; safe no-op default   */
/* keeps CTAs clickable before hydration finishes                       */
/* ------------------------------------------------------------------ */
BSF.openCheckout = function openCheckout(e) {
  if (e) e.preventDefault();
};

function HeroParticles() {
  const particles = React.useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        top: Math.round(Math.random() * 100),
        dur: (8 + Math.random() * 7).toFixed(1) + "s",
        delay: (Math.random() * 6).toFixed(1) + "s",
        op: (0.15 + Math.random() * 0.1).toFixed(2)
      })),
    []
  );

  return (
    <div className="hero-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="hero-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            "--dur": p.dur,
            "--delay": p.delay,
            "--op": p.op
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section">
      <HeroParticles />
      <div className="container hero-content">
        <h1 className="headline-hero hero-headline hero-animate hero-animate--scale" style={{ "--hero-delay": 0 }}>
          You&rsquo;re exhausted. But your body won&rsquo;t let you sleep.
        </h1>

        <p className="subheadline hero-subheadline hero-animate" style={{ "--hero-delay": 1 }}>
          Seven guided nights to break the burnout-sleep loop, for the person who&rsquo;s drained all day and wide awake at 3am.
        </p>

        <p className="quote hero-quote hero-animate" style={{ "--hero-delay": 2 }}>
          &ldquo;Your body has been bracing for a danger that isn&rsquo;t there. Tonight, it can finally stand down.&rdquo;
        </p>

        <div className="price-stack hero-animate" style={{ "--hero-delay": 3 }}>
          <div className="price-row">
            <BSF.PriceStrike amount="$149" />
            <span className="price-new">$29</span>
          </div>
          <span className="price-label">your price today</span>
        </div>

        <div className="hero-cta-wrap hero-animate" style={{ "--hero-delay": 4 }}>
          <a href="#offer" className="btn btn-gold btn-block" onClick={BSF.openCheckout}>
            Start sleeping tonight &rarr;
          </a>
          <span className="cta-feature-note">Instant download &bull; Lifetime access</span>
        </div>

        <img
          src="assets/sleep-fix-bundle.png"
          alt="The Burnout Sleep Fix 5-in-1 bundle"
          className="hero-bundle-image hero-animate"
          style={{ "--hero-delay": 5 }}
        />
      </div>
    </section>
  );
}

window.Hero = Hero;
