/* Testimonials, guarantee, and final CTA sections. */
const TESTIMONIALS = [
  {
    id: "sarah-m",
    initials: "SM",
    name: "Sarah M.",
    role: "London, Marketing Manager",
    quote:
      "I genuinely didn't think anything would work anymore. I'd been lying awake for months. Night 3 was the first time I fell asleep without my brain running through tomorrow's to-do list. It sounds small but I cried the next morning."
  },
  {
    id: "james-t",
    initials: "JT",
    name: "James T.",
    role: "Manchester, Software Engineer",
    quote:
      "The 3am protocol is the thing I use the most. I still wake up sometimes. But now I have something to do that isn't scroll my phone and hate myself. I'm usually back asleep in 20 minutes."
  },
  {
    id: "priya-k",
    initials: "PK",
    name: "Priya K.",
    role: "Birmingham, Teacher",
    quote:
      "I was sceptical because it's not expensive and I've spent hundreds on supplements and apps. But it actually addresses the why. My therapist even asked what I'd changed."
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
          <h2 className="section-title">From people who thought they&rsquo;d tried everything.</h2>
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
                  <div className="testimonial-identity">
                    <span className="testimonial-name">{t.name}</span>
                    <span className="testimonial-role">{t.role}</span>
                  </div>
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
            30-DAY GUARANTEE &bull; RISK FREE &bull; 30-DAY GUARANTEE &bull; RISK FREE &bull;
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
          <h2 className="section-title">Sleep on it. Literally.</h2>
          <p className="subheadline">
            Try The Burnout Sleep Fix for 30 days. Use it. Follow the 7 nights. Print the tracker. Listen to
            every audio. If it doesn&rsquo;t change the way you sleep, email us and we&rsquo;ll refund every cent.
            No questions. No forms. No guilt.
          </p>
        </BSF.Reveal>

        <BSF.Reveal as="div" className="pill-row" index={1}>
          <span className="pill">
            <i data-lucide="calendar"></i> 30 full days
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
            Start tonight - $29
          </a>
          <span className="guarantee-microcopy">30-day money-back guarantee</span>
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
          <p className="subheadline">
            You don&rsquo;t need to fix your whole life to fix your sleep. You just need the right seven
            nights.
          </p>
          <h2 className="section-title">Tonight could be the first quiet one.</h2>
        </BSF.Reveal>

        <BSF.Reveal as="div" className="cta-wrap" index={2}>
          <a href="#" className="btn btn-gold btn-block" onClick={BSF.openCheckout}>
            Get The Burnout Sleep Fix &rarr;
          </a>
          <span className="guarantee-microcopy">30-day money-back guarantee</span>
        </BSF.Reveal>
      </div>
    </section>
  );
}

window.Testimonials = Testimonials;
window.Guarantee = Guarantee;
window.FinalCTA = FinalCTA;
