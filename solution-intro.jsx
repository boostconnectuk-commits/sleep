/* Solution intro — introduces the product itself before the night-by-night tour. */
function SolutionIntro() {
  return (
    <section className="section" id="solution-intro">
      <div className="container">
        <BSF.Reveal as="div" className="section-header">
          <span className="eyebrow">The Burnout Sleep Fix</span>
          <h2 className="section-title">
            A 7-night guided reset designed specifically for the type of sleeplessness that comes from
            living in overdrive.
          </h2>
        </BSF.Reveal>

        <BSF.Reveal as="div" className="problem-copy" index={1}>
          <p className="subheadline">This isn&rsquo;t a book about sleep hygiene. You already know to put your phone away.</p>
          <p className="subheadline">
            The Burnout Sleep Fix is a structured, night-by-night system that works with your nervous
            system instead of against it. Each night builds on the last. By night three, most people
            notice something shift. By night seven, the loop starts to lose its grip.
          </p>
        </BSF.Reveal>

        <BSF.Reveal as="p" className="quote problem-quote" index={2}>
          &ldquo;Built for the person who is too tired to overhaul their life, but awake enough at 2am to
          know something has to change.&rdquo;
        </BSF.Reveal>
      </div>
    </section>
  );
}

window.SolutionIntro = SolutionIntro;
