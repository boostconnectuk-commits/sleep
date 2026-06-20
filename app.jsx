/* Root component — assembles every section, wires up the sticky CTA bar
   and re-runs lucide.createIcons() once everything has mounted. */

function AnnouncementBar() {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`announcement-bar${hidden ? " is-hidden" : ""}`} aria-hidden={hidden}>
      <div className="announcement-inner">
        <img src="assets/logo.png" alt="Tranquila Sleep" className="announcement-logo" />
        <span className="announcement-text">
          The Burnout Sleep Fix
          <span className="announcement-sep" aria-hidden="true">&bull;</span>
          <s className="announcement-value">$149 value</s>
          <span className="announcement-price">$29 today</span>
        </span>
      </div>
    </div>
  );
}

function StickyCta() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const hero = document.querySelector(".hero");
    const finalCta = document.getElementById("cta");
    if (!hero || !finalCta || typeof IntersectionObserver === "undefined") return undefined;

    let heroVisible = true;
    let ctaVisible = false;
    const update = () => setVisible(!heroVisible && !ctaVisible);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );

    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        ctaVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.2 }
    );

    heroObserver.observe(hero);
    ctaObserver.observe(finalCta);

    return () => {
      heroObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <div className={`sticky-cta${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <div className="sticky-cta-inner">
        <a href="#cta" className="btn btn-gold btn-block" onClick={BSF.openCheckout}>
          Start sleeping tonight for $29
        </a>
        <span className="sticky-cta-feature">Instant download &bull; Lifetime access</span>
      </div>
    </div>
  );
}

function App() {
  const [checkoutOpen, setCheckoutOpen] = React.useState(
    () => window.location.pathname.replace(/\/$/, "") === "/get-bundle"
  );

  BSF.openCheckout = (e) => {
    if (e) e.preventDefault();
    setCheckoutOpen(true);
    if (window.location.pathname.replace(/\/$/, "") !== "/get-bundle") {
      window.history.pushState(null, "", "/get-bundle");
    }
  };

  React.useEffect(() => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }, []);

  React.useEffect(() => {
    if (checkoutOpen && typeof fbq === "function") fbq("track", "InitiateCheckout");
  }, [checkoutOpen]);

  React.useEffect(() => {
    const handlePopState = () => {
      setCheckoutOpen(window.location.pathname.replace(/\/$/, "") === "/get-bundle");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <React.Fragment>
      <VercelAnalytics />
      <TweaksPanel />
      <AnnouncementBar />
      <main>
        <Hero />
        <hr className="section-divider" />
        <SoundFamiliar />
        <hr className="section-divider" />
        <TheShift />
        <hr className="section-divider" />
        <SolutionIntro />
        <hr className="section-divider" />
        <SevenNights />
        <hr className="section-divider" />
        <Bundle />
        <hr className="section-divider" />
        <ValueStack />
        <hr className="section-divider" />
        <Testimonials />
        <hr className="section-divider" />
        <SocialProof />
        <hr className="section-divider" />
        <Faq />
        <hr className="section-divider" />
        <FinalCTA />
      </main>
      <StickyCta />
      <Checkout
        open={checkoutOpen}
        onClose={() => {
          setCheckoutOpen(false);
          if (window.location.pathname.replace(/\/$/, "") === "/get-bundle") {
            window.history.replaceState(null, "", "/");
          }
        }}
      />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
