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
/* PriceStrike — animated diagonal strike-through over a £ amount       */
/* ------------------------------------------------------------------ */
BSF.PriceStrike = function PriceStrike({ amount = "£97", className = "" }) {
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
/* useCountdown — persists an end-time so the offer clock survives a    */
/* refresh, resetting once it actually reaches zero                     */
/* ------------------------------------------------------------------ */
BSF.useCountdown = function useCountdown(durationSeconds) {
  const [remaining, setRemaining] = React.useState(durationSeconds);

  React.useEffect(() => {
    const STORAGE_KEY = "bsf_offer_end";
    let end;

    try {
      end = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    } catch (err) {
      end = NaN;
    }

    const now = Date.now();
    if (!end || end <= now) {
      end = now + durationSeconds * 1000;
      try {
        localStorage.setItem(STORAGE_KEY, String(end));
      } catch (err) {
        /* storage unavailable — countdown still works for this session */
      }
    }

    const tick = () => {
      let rem = Math.round((end - Date.now()) / 1000);
      if (rem <= 0) {
        end = Date.now() + durationSeconds * 1000;
        try {
          localStorage.setItem(STORAGE_KEY, String(end));
        } catch (err) {
          /* storage unavailable — countdown still resets for this session */
        }
        rem = durationSeconds;
      }
      setRemaining(rem);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [durationSeconds]);

  return {
    hours: Math.floor(remaining / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60
  };
};

/* ------------------------------------------------------------------ */
/* usePulse — true for 200ms whenever the given value changes           */
/* ------------------------------------------------------------------ */
function usePulse(value) {
  const [pulsing, setPulsing] = React.useState(false);
  const prev = React.useRef(value);

  React.useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setPulsing(true);
      const t = setTimeout(() => setPulsing(false), 200);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [value]);

  return pulsing;
}

BSF.usePulse = usePulse;

/* ------------------------------------------------------------------ */
/* openCheckout — overwritten by App once mounted; safe no-op default   */
/* keeps CTAs clickable before hydration finishes                       */
/* ------------------------------------------------------------------ */
BSF.openCheckout = function openCheckout(e) {
  if (e) e.preventDefault();
};

function CountdownUnit({ value, label }) {
  const padded = String(value).padStart(2, "0");
  const pulsing = usePulse(padded);

  return (
    <div className="countdown-unit">
      <div className="countdown-digits" data-pulse={pulsing ? "true" : "false"}>
        {padded}
      </div>
      <div className="countdown-label">{label}</div>
    </div>
  );
}

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
  const { hours, minutes, seconds } = BSF.useCountdown(48 * 60 * 60);

  return (
    <section className="hero section">
      <HeroParticles />
      <div className="container hero-content">
        <div className="hero-eyebrow-wrap hero-animate" style={{ "--hero-delay": 0 }}>
          <div className="hero-moon" aria-hidden="true" />
          <span className="eyebrow">For the exhausted-but-wired</span>
        </div>

        <h1 className="headline-hero hero-headline hero-animate hero-animate--scale" style={{ "--hero-delay": 1 }}>
          You&rsquo;re exhausted. But your body won&rsquo;t let you sleep.
        </h1>

        <div className="hero-social-proof-row hero-animate" style={{ "--hero-delay": 2 }}>
          <div className="hero-social-proof-stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <BSF.StarIcon key={i} />
            ))}
          </div>
          <p className="hero-social-proof">Already helping 2,400+ people sleep through the night.</p>
        </div>

        <p className="subheadline hero-subheadline hero-animate" style={{ "--hero-delay": 3 }}>
          Seven guided nights to break the burnout sleep loop, for the person who&rsquo;s exhausted all day and wide awake at 3am.
        </p>

        <p className="quote hero-quote hero-animate" style={{ "--hero-delay": 4 }}>
          &ldquo;Your body has been bracing for a danger that isn&rsquo;t there. Tonight, it can finally stand down.&rdquo;
        </p>

        <div className="countdown hero-animate" style={{ "--hero-delay": 5 }}>
          <CountdownUnit value={hours} label="Hours" />
          <span className="countdown-sep">:</span>
          <CountdownUnit value={minutes} label="Mins" />
          <span className="countdown-sep">:</span>
          <CountdownUnit value={seconds} label="Secs" />
        </div>

        <div className="price-stack hero-animate" style={{ "--hero-delay": 6 }}>
          <div className="price-row">
            <BSF.PriceStrike amount="£97" />
            <span className="price-new">£17</span>
          </div>
          <span className="price-label">your price today</span>
        </div>

        <div className="hero-cta-wrap hero-animate" style={{ "--hero-delay": 7 }}>
          <a href="#offer" className="btn btn-gold btn-block" onClick={BSF.openCheckout}>
            Start my 7-night reset
          </a>
          <span className="guarantee-microcopy">7-night money-back guarantee</span>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
