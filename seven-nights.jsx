/* Seven-night journey — reframes the bundle from a list of items into a built habit. */
const NIGHTS = [
  { night: 1, description: "Start the wind-down ritual — your body learns the first cue.", emphasis: true },
  { night: 2, description: "The routine begins to feel familiar." },
  { night: 3, description: "Your mind starts following the pattern, not fighting it." },
  { night: 4, description: "Most people feel the first real shift here.", emphasis: true },
  { night: 5, description: "Falling asleep starts taking less effort." },
  { night: 6, description: "The wind-down becomes automatic." },
  { night: 7, description: "The routine runs from memory — it’s yours now.", emphasis: true }
];

function NightStep({ data, index, isLast }) {
  return (
    <BSF.Reveal
      as="div"
      className={`night-step${data.emphasis ? " is-emphasis" : ""}`}
      index={index}
    >
      <div className="night-step-rail" aria-hidden="true">
        <span className="night-step-marker">{data.night}</span>
        {!isLast && <span className="night-step-line" />}
      </div>
      <div className="night-step-body">
        <h3 className="night-step-title">Night {data.night}</h3>
        <p className="night-step-desc">{data.description}</p>
      </div>
    </BSF.Reveal>
  );
}

function SevenNights() {
  return (
    <section className="section" id="seven-nights">
      <div className="container">
        <BSF.Reveal as="div" className="section-header">
          <span className="eyebrow">How the seven nights work</span>
          <h2 className="section-title">
            This isn&rsquo;t an instant fix. It&rsquo;s seven nights that build on each other.
          </h2>
        </BSF.Reveal>

        <div className="night-timeline">
          {NIGHTS.map((item, i) => (
            <NightStep key={item.night} data={item} index={i + 1} isLast={i === NIGHTS.length - 1} />
          ))}
        </div>

        <BSF.Reveal as="p" className="quote night-timeline-footnote" index={NIGHTS.length + 1}>
          Built to teach your body a habit, not give it a quick fix.
        </BSF.Reveal>
      </div>
    </section>
  );
}

window.SevenNights = SevenNights;
