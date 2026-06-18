/* FAQ accordion — handles the last objections standing between a warm reader and the buy button. */
const FAQ_ITEMS = [
  {
    q: "What exactly do I get when I buy?",
    a: "You get instant access to 5 digital tools: the Core Guide (PDF), 7 audio tracks (MP3) for each night of the reset, the 3am Rescue Protocol, the Wind-Down Ritual Builder worksheet, and the printable Sleep Tracker. Everything downloads immediately after purchase. No waiting, no drip schedule, no app to install."
  },
  {
    q: "I've tried sleep apps and supplements. How is this different?",
    a: "Sleep apps track your sleep. Supplements try to chemically override your wakefulness. Neither addresses why your brain won't switch off in the first place. The Burnout Sleep Fix is built specifically for stress-driven sleeplessness, the kind where you're exhausted but wired. It works with your nervous system's stress response, not around it."
  },
  {
    q: "What if I wake up at 3am and nothing works?",
    a: "That's exactly what the 3am Rescue Protocol is for. It's a standalone guide specifically designed for middle-of-the-night waking. It won't work perfectly every single time, nothing does, but it gives you a process that's better than lying there spiralling or reaching for your phone."
  },
  {
    q: "Is this a course I have to commit hours to?",
    a: "No. Each night takes 15-20 minutes. There's no video content to sit through, no modules to complete, no quizzes. You read the guide once, then use the nightly audio tracks in bed with your eyes closed. It's designed for someone who's too tired to add another task to their day."
  },
  {
    q: "What if it doesn't work for me?",
    a: "Most people notice something shift by night three. If you follow the seven nights and still aren't sleeping better, email support@burnoutsleep.rest, we'll help you figure out what's getting in the way."
  }
];

function FaqItem({ item, index, open, onToggle }) {
  return (
    <BSF.Reveal as="div" className="faq-item" index={index}>
      <button
        type="button"
        className="faq-question"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{item.q}</span>
        <i data-lucide={open ? "minus" : "plus"} aria-hidden="true"></i>
      </button>
      <div className={`faq-answer${open ? " is-open" : ""}`}>
        <p>{item.a}</p>
      </div>
    </BSF.Reveal>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = React.useState(null);

  React.useEffect(() => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }, [openIndex]);

  return (
    <section className="section" id="faq">
      <div className="container">
        <BSF.Reveal as="div" className="section-header">
          <span className="eyebrow">Before you sleep on it</span>
          <h2 className="section-title">Questions before you sleep on it.</h2>
        </BSF.Reveal>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i + 1}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

window.Faq = Faq;
