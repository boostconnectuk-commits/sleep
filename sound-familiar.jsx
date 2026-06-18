/* Problem section — helps the reader feel personally recognised before the offer. */
function SoundFamiliar() {
  return (
    <section className="section" id="sound-familiar">
      <div className="container">
        <BSF.Reveal as="div" className="section-header">
          <span className="eyebrow">Sound familiar</span>
          <h2 className="section-title">You already know what tonight looks like.</h2>
        </BSF.Reveal>

        <BSF.Reveal as="div" className="problem-copy" index={1}>
          <p className="subheadline">
            You&rsquo;ll tell yourself you&rsquo;re going to bed early. You&rsquo;ll put the phone down. Close
            your eyes. And then it starts.
          </p>
          <p className="subheadline">
            The replaying. The planning. The thing someone said three weeks ago that suddenly matters at
            1:47am. Your legs are heavy. Your eyes sting. But your brain? Your brain is running a night
            shift you never clocked in for.
          </p>
          <p className="subheadline">
            You&rsquo;ve tried the podcasts. The magnesium. The &ldquo;just relax&rdquo; advice from people
            who fall asleep in four minutes. None of it touches what&rsquo;s actually happening, because
            this isn&rsquo;t regular insomnia.
          </p>
          <p className="subheadline">This is what burnout does to sleep.</p>
          <p className="subheadline">
            Your nervous system is stuck in high alert. Cortisol is flooding your body at the exact hours
            it should be dropping. And every night you don&rsquo;t sleep, your stress tolerance shrinks,
            which makes the next day harder, which makes the next night worse.
          </p>
        </BSF.Reveal>

        <BSF.Reveal as="p" className="quote problem-quote" index={2}>
          &ldquo;It&rsquo;s a loop. And willpower can&rsquo;t break it.&rdquo;
        </BSF.Reveal>
      </div>
    </section>
  );
}

window.SoundFamiliar = SoundFamiliar;
