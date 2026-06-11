/* Dev-only floating panel for previewing accent colors and a
   reduced-motion override without changing OS settings. */
const ACCENTS = [
  { id: "rose", value: "#D4939A", label: "Rose" },
  { id: "blush", value: "#EFC4C8", label: "Blush" },
  { id: "mauve", value: "#C4A8C8", label: "Mauve" },
  { id: "gold", value: "#D4A86C", label: "Gold" }
];

function applyAccent(id) {
  const accent = ACCENTS.find((a) => a.id === id) || ACCENTS[0];
  document.documentElement.style.setProperty("--color-accent", accent.value);
  return accent.id;
}

function applyReduceMotion(value) {
  document.documentElement.classList.toggle("reduce-motion", value);
}

function TweaksPanel() {
  const [open, setOpen] = React.useState(false);
  const [accent, setAccent] = React.useState("rose");
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    let storedAccent = null;
    let storedMotion = null;

    try {
      storedAccent = localStorage.getItem("bsf_accent");
      storedMotion = localStorage.getItem("bsf_reduce_motion");
    } catch (err) {
      /* storage unavailable — fall back to defaults */
    }

    if (storedAccent) setAccent(applyAccent(storedAccent));
    if (storedMotion === "true") {
      applyReduceMotion(true);
      setReduceMotion(true);
    }
  }, []);

  const handleAccent = (id) => {
    setAccent(applyAccent(id));
    try {
      localStorage.setItem("bsf_accent", id);
    } catch (err) {
      /* storage unavailable — selection still applies for this session */
    }
  };

  const handleReduceMotion = () => {
    const next = !reduceMotion;
    applyReduceMotion(next);
    setReduceMotion(next);
    try {
      localStorage.setItem("bsf_reduce_motion", String(next));
    } catch (err) {
      /* storage unavailable — selection still applies for this session */
    }
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className={`tweaks-toggle${open ? " is-open" : ""}`}
        aria-label={open ? "Close design tweaks" : "Open design tweaks"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <i data-lucide="settings-2" aria-hidden="true"></i>
      </button>

      <div className={`tweaks-panel${open ? " is-open" : ""}`}>
        <div className="tweaks-title">Design tweaks</div>

        <div className="tweaks-row">
          <span>Accent</span>
          <div className="tweaks-swatches">
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                type="button"
                className={`tweaks-swatch${accent === a.id ? " is-active" : ""}`}
                style={{ background: a.value }}
                aria-label={`${a.label} accent`}
                aria-pressed={accent === a.id}
                onClick={() => handleAccent(a.id)}
              />
            ))}
          </div>
        </div>

        <div className="tweaks-row">
          <span>Reduce motion</span>
          <button
            type="button"
            className={`tweaks-switch${reduceMotion ? " is-on" : ""}`}
            role="switch"
            aria-checked={reduceMotion}
            aria-label="Reduce motion"
            onClick={handleReduceMotion}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

window.TweaksPanel = TweaksPanel;
