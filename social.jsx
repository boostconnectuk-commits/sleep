/* Testimonials, guarantee, and final CTA sections. */
const TESTIMONIALS = [
  {
    id: "rae-mitchell",
    initials: "RM",
    name: "Rae Mitchell",
    quote:
      "I’ve tried every sleep app going. This is the first thing that actually got me to sleep before midnight in months."
  },
  {
    id: "daniel-okafor",
    initials: "DO",
    name: "Daniel Okafor",
    quote:
      "The 3am Rescue audio alone was worth it. I used it twice in the first week and both times I was back asleep in under ten minutes."
  },
  {
    id: "priya-nair",
    initials: "PN",
    name: "Priya Nair",
    quote:
      "Simple, calm, no fluff. I do the wind-down routine every night now — it’s become non-negotiable."
  },
  {
    id: "tom-ellery",
    initials: "TE",
    name: "Tom Ellery",
    quote:
      "My mind used to race the second my head hit the pillow. Night four was the first time it just... didn’t."
  }
];

function Testimonials() {
  const trackRef = React.useRef(null);
  const cardRefs = React.useRef([]);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1) setActive(index);
          }
        });
      },
      { root: track, threshold: 0.6 }
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const scrollToCard = (index) => {
    const card = cardRefs.current[index];
    const track = trackRef.current;
    if (card && track) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  };

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <BSF.Reveal as="div" className="section-header">
          <span className="eyebrow">Real nights, real people</span>
          <h2 className="section-title">They were exhausted too.</h2>
        </BSF.Reveal>

        <BSF.Reveal as="div" className="testimonial-wrap" index={1}>
          <div className="testimonial-track" ref={trackRef}>
            {TESTIMONIALS.map((t, i) => (
              <div className="testimonial-card" key={t.id} ref={(el) => (cardRefs.current[i] = el)}>
                <div className="testimonial-stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <BSF.StarIcon key={s} />
                  ))}
                </div>
                <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testimonial-header">
                  <img
                    className="testimonial-avatar"
                    src={ImageSlot.get(t.id, { label: t.initials, width: 64, height: 64 })}
                    alt=""
                    aria-hidden="true"
                  />
                  <span className="testimonial-name">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </BSF.Reveal>

        <div className="testimonial-dots">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              className={`testimonial-dot${i === active ? " is-active" : ""}`}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => scrollToCard(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GuaranteeBadge() {
  return (
    <div className="guarantee-badge" aria-hidden="true">
      <svg className="badge-ring" viewBox="0 0 100 100">
        <defs>
          <path id="badgeRingPath" d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
        </defs>
        <text dy="2">
          <textPath href="#badgeRingPath">
            7-NIGHT GUARANTEE &bull; RISK FREE &bull; 7-NIGHT GUARANTEE &bull; RISK FREE &bull;
          </textPath>
        </text>
      </svg>
      <div className="badge-center">
        <i data-lucide="shield-check"></i>
      </div>
    </div>
  );
}

function Guarantee() {
  return (
    <section className="section" id="guarantee">
      <div className="container">
        <BSF.Reveal as="div" className="section-header">
          <GuaranteeBadge />
          <h2 className="section-title">Try it for seven nights. If it doesn&rsquo;t work, it&rsquo;s free.</h2>
          <p className="subheadline">
            Use the full bundle for a week. If you&rsquo;re not sleeping better, email us and we&rsquo;ll refund you in full
            &mdash; no forms, no hoops, no hard feelings.
          </p>
        </BSF.Reveal>

        <BSF.Reveal as="div" className="pill-row" index={1}>
          <span className="pill">
            <i data-lucide="moon"></i> 7 full nights
          </span>
          <span className="pill">
            <i data-lucide="rotate-ccw"></i> 100% refund
          </span>
          <span className="pill">
            <i data-lucide="thumbs-up"></i> No questions asked
          </span>
        </BSF.Reveal>

        <BSF.Reveal as="div" className="cta-wrap" index={2}>
          <a href="#cta" className="btn btn-gold btn-block" onClick={BSF.openCheckout}>
            Start tonight &mdash; £27
          </a>
          <span className="guarantee-microcopy">7-night money-back guarantee &mdash; no questions asked</span>
        </BSF.Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section final-cta" id="cta">
      <div className="container">
        <BSF.Reveal as="div" className="section-header">
          <span className="eyebrow">Tonight</span>
          <h2 className="section-title">Ready when you are.</h2>
          <p className="subheadline">Don&rsquo;t go to bed without it.</p>
        </BSF.Reveal>

        <BSF.Reveal as="p" className="quote" index={1}>
          &ldquo;Seven nights from now, this could be the first quiet one.&rdquo;
        </BSF.Reveal>

        <BSF.Reveal as="div" className="cta-wrap" index={2}>
          <a href="#" className="btn btn-gold btn-block" onClick={BSF.openCheckout}>
            Start tonight &mdash; £27
          </a>
          <span className="guarantee-microcopy">7-night money-back guarantee &mdash; no questions asked</span>
        </BSF.Reveal>
      </div>
    </section>
  );
}

window.Testimonials = Testimonials;
window.Guarantee = Guarantee;
window.FinalCTA = FinalCTA;
