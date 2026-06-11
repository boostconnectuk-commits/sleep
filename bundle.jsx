/* The five items that make up the bundle. Shared with valuestack.jsx
   so the names/values stay in sync (they must total £97). */
BSF.BUNDLE_ITEMS = [
  {
    icon: "book-open",
    name: "The Core Sleep Guide",
    outcome: "The 3-phase wind-down method your nervous system actually responds to.",
    format: "PDF Guide",
    value: 39
  },
  {
    icon: "headphones",
    name: "7-Night Audio Series",
    outcome: "One guided session per night. Breath, body scan, thought defusion.",
    format: "7 Audio Sessions",
    value: 29
  },
  {
    icon: "list-checks",
    name: "Sleep Onset Tracker",
    outcome: "Tick each night off. Watch your sleep onset time drop.",
    format: "Printable Tracker",
    value: 15
  },
  {
    icon: "alarm-clock",
    name: "3am Rescue Kit",
    outcome: "8 minutes from spiralling to asleep. Works mid-night.",
    format: "Audio + Script",
    value: 9
  },
  {
    icon: "clipboard-list",
    name: "Evening Reset Checklist",
    outcome: "Print it. Put it where you'll see it. Your evening reset in one page.",
    format: "1-Page Printable",
    value: 5
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
        <span className="bundle-value">£{item.value} value</span>
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
          <h2 className="section-title">Everything you need for seven nights of real sleep</h2>
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
