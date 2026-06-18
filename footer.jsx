function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-links">
          <a href="#refund">Refund Policy</a>
          <span className="footer-sep" aria-hidden="true">&bull;</span>
          <a href="#privacy">Privacy Policy</a>
          <span className="footer-sep" aria-hidden="true">&bull;</span>
          <a href="#terms">Terms of Use</a>
        </div>
        <p className="footer-line">
          Need help? <a href="mailto:support@burnoutsleep.rest">support@burnoutsleep.rest</a>
        </p>
        <p className="footer-line">&copy; 2026 The Burnout Sleep Fix. All rights reserved.</p>
        <p className="footer-disclaimer">
          This product is not a substitute for medical advice. If you are experiencing a medical
          condition, please consult a healthcare professional.
        </p>
      </div>
    </footer>
  );
}

window.Footer = Footer;
