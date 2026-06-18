/* Seven-night journey — reframes the bundle from a list of items into a built habit. */
const NIGHTS = [
  {
    night: 1,
    title: "The Slowdown",
    description:
      "You stop forcing sleep. Instead, you learn the one thing your nervous system needs to hear before it lets you rest. Tonight is about permission, not performance.",
    emphasis: true
  },
  {
    night: 2,
    title: "The Noise",
    description:
      "The racing thoughts aren't random. Tonight you learn why your brain replays the day at full volume, and the specific technique to turn the volume down without fighting it."
  },
  {
    night: 3,
    title: "The Body",
    description:
      "Burnout lives in your shoulders, your jaw, your chest. Tonight is physical. A guided release sequence that targets where stress stores itself while you lie still."
  },
  {
    night: 4,
    title: "The Drop",
    description:
      "Your cortisol has a schedule. Tonight you work with it instead of against it. This is where most people feel the first real shift.",
    emphasis: true
  },
  {
    night: 5,
    title: "The Anchor",
    description:
      "You start building a signal your body recognises. Not a rigid routine, a sensory anchor that tells your nervous system this means safe. Something that works even on bad days."
  },
  {
    night: 6,
    title: "The Depth",
    description:
      "Light sleep keeps you surviving. Deep sleep lets you recover. Tonight targets sleep quality, not just sleep quantity. The difference shows up in how you feel by 10am."
  },
  {
    night: 7,
    title: "The Loop Breaks",
    description:
      "Everything connects. By tonight, you're not following instructions anymore. You're running a system your body already understands. This is the night the reset becomes yours.",
    emphasis: true
  }
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
        <h3 className="night-step-title">Night {data.night} - {data.title}</h3>
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
          <span className="eyebrow">What your next 7 nights look like</span>
          <h2 className="section-title">
            This isn&rsquo;t an instant fix. It&rsquo;s seven nights that build on each other.
          </h2>
          <p className="subheadline">
            Each night is designed to take 15-20 minutes. No homework. No journaling marathons. Just a
            guided wind-down that builds on the night before.
          </p>
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
