/* Problem section — helps the reader feel personally recognised before the offer. */
function SoundFamiliar() {
  return (
    <section className="section" id="sound-familiar">
      <div className="container">
        <BSF.Reveal as="div" className="section-header">
          <span className="eyebrow">Sound familiar</span>
          <h2 className="section-title">
            You&rsquo;re not bad at sleeping. You&rsquo;re just never told to switch off.
          </h2>
        </BSF.Reveal>

        <BSF.Reveal as="div" className="problem-copy" index={1}>
          <p className="subheadline">
            You get into bed exhausted, and your mind starts replaying the day. The email you
            should have answered differently, the thing you forgot, the thing you said. Round and
            round, long after the lights are off.
          </p>
          <p className="subheadline">
            Your body doesn&rsquo;t get the memo that the day is done. It stays braced, heart a
            little too fast, jaw a little too tight, like there&rsquo;s still somewhere to be.
          </p>
          <p className="subheadline">
            This isn&rsquo;t a flaw in you. It&rsquo;s a pattern your nervous system learned, night
            after night of running on alert. And a learned pattern can be unlearned.
          </p>
        </BSF.Reveal>

        <BSF.Reveal as="p" className="quote problem-quote" index={2}>
          &ldquo;Your nervous system has been on alert all day. It doesn&rsquo;t know how to stand
          down on command.&rdquo;
        </BSF.Reveal>
      </div>
    </section>
  );
}

window.SoundFamiliar = SoundFamiliar;
