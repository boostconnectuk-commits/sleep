/* The shift — reframes the problem as biology, not discipline, before the offer lands. */
function TheShift() {
  return (
    <section className="section" id="the-shift">
      <div className="container">
        <BSF.Reveal as="div" className="section-header">
          <span className="eyebrow">The shift</span>
          <h2 className="section-title">
            It&rsquo;s not that you can&rsquo;t sleep. It&rsquo;s that no one told you why burnout sleep is
            different.
          </h2>
        </BSF.Reveal>

        <BSF.Reveal as="div" className="problem-copy" index={1}>
          <p className="subheadline">
            Most sleep advice is built for people whose lives are otherwise fine. Turn off screens. Drink
            chamomile. Count backwards from a hundred.
          </p>
          <p className="subheadline">
            That advice assumes your body knows how to wind down. Yours doesn&rsquo;t. Not right now.
          </p>
          <p className="subheadline">
            When you&rsquo;ve been running on stress hormones for weeks or months, your system forgets the
            difference between &ldquo;alert because of danger&rdquo; and &ldquo;alert because it&rsquo;s
            Tuesday.&rdquo; Your brain treats bedtime like a threat. And no amount of lavender spray
            overrides a nervous system that thinks it needs to stay awake to survive.
          </p>
        </BSF.Reveal>

        <BSF.Reveal as="p" className="quote problem-quote" index={2}>
          &ldquo;This isn&rsquo;t a discipline problem. It&rsquo;s a biology problem.&rdquo;
        </BSF.Reveal>
      </div>
    </section>
  );
}

window.TheShift = TheShift;
