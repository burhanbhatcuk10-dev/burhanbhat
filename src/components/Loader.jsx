import { useEffect, useState } from "react";
import { profile } from "../data.js";

export default function Loader({ onDone }) {
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const DURATION = 1500;
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / DURATION);
      setN(Math.round(100 * (1 - Math.pow(1 - t, 2.4))));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        onDone();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className={`loader ${leaving ? "leaving" : ""}`} aria-hidden="true">
      <div className="loader-top">
        <span>{profile.name}</span>
        <span>{profile.title}</span>
      </div>
      <div className="loader-mid">
        <span className="loader-word">
          <span>Portfolio</span>
        </span>
      </div>
      <div className="loader-bottom">
        <span className="loader-num">{String(n).padStart(2, "0")}</span>
        <span className="loader-caption">Loading experience</span>
      </div>
      <span className="loader-bar" style={{ transform: `scaleX(${n / 100})` }} />
    </div>
  );
}
