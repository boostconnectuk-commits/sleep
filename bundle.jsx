/* The five items that make up the bundle. Shared with valuestack.jsx
   so the names/values stay in sync (they must total $149). Individual
   values keep the same ratio as the original £97 stack (39:29:15:9:5). */
BSF.BUNDLE_ITEMS = [
  {
    icon: "book-open",
    name: "The Burnout Sleep Fix Core Guide",
    outcome: "The 3-phase wind-down method your nervous system actually responds to. Read it once, use it every night.",
    format: "PDF Guide",
    value: 59
  },
  {
    icon: "headphones",
    name: "The 7-Night Audio Reset",
    outcome: "Seven short guided sessions for eyes-closed, in-bed use. Each night targets a different layer of the stress response.",
    format: "MP3 Audio Tracks",
    value: 45
  },
  {
    icon: "alarm-clock",
    name: "The 3am Rescue Protocol",
    outcome: "What to do when you wake up mid-night and the spiral starts. A step-by-step process that gets you back to sleep.",
    format: "Quick-Reference PDF",
    value: 23
  },
  {
    icon: "clipboard-list",
    name: "The Wind-Down Ritual Builder",
    outcome: "Build the 60 minutes before bed into something your nervous system recognises as safe. Adapts to your day.",
    format: "Interactive Worksheet",
    value: 14
  },
  {
    icon: "list-checks",
    name: "The Burnout Sleep Tracker",
    outcome: "Seven days of simple tracking that shows you what's actually changing. Paper-based. No screens.",
    format: "Printable Tracker",
    value: 8
  }
];

function BundleCard({ item, index }) {
  return (
    <BSF.Reveal as="div" className="bundle-card" index={index}>
      <div className="bundle-icon">
        <i data-lucide={item.icon} aria-hidden="true"></i>
      </div>
      <h3 className="bundle-name">{item.name}</h3>
      <p className="bundle-outcome">{item.outcome}</p>
      <div className="bundle-meta">
        <span>{item.format}</span>
        <span className="bundle-value">${item.value} value</span>
      </div>
    </BSF.Reveal>
  );
}

function Bundle() {
  return (
    <section className="section" id="bundle">
      <div className="container">
        <BSF.Reveal as="div" className="section-header">
          <span className="eyebrow">What&rsquo;s inside</span>
          <h2 className="section-title">Everything you need. Nothing you don&rsquo;t.</h2>
          <p className="subheadline">Five tools, one evening routine. Use what you need, skip what you don&rsquo;t.</p>
        </BSF.Reveal>

        <div className="bundle-grid">
          {BSF.BUNDLE_ITEMS.map((item, i) => (
            <BundleCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

window.Bundle = Bundle;
