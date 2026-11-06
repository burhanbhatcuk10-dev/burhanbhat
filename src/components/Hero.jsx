import { useEffect, useRef } from "react";
import { profile, roles, stats, heroImages } from "../data.js";
import { isFinePointer, prefersReducedMotion, useClock } from "../hooks.js";
import { Mag } from "./Fx.jsx";
import Img from "./Img.jsx";
import { SplitChars, SplitWords, RoleCycle, Counter, Arrow } from "./Text.jsx";

export default function Hero() {
  const ref = useRef(null);
  const clock = useClock();

  // Pointer parallax: writes -1..1 into --mx2/--my2 on the hero.
  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;
    let raf = 0;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx2", x.toFixed(3));
        el.style.setProperty("--my2", y.toFixed(3));
      });
    };
    el.addEventListener("pointermove", move);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="hero-bg" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <span className="hero-lines" />
      </div>

      <div className="hero-visual" aria-hidden="true">
        {heroImages.map((im, i) => (
          <div key={i} className={`float f${i + 1}`} style={{ "--depth": im.depth }}>
            <div className="float-in">
              <Img src={im.src} alt="" tone={im.tone} eager />
            </div>
          </div>
        ))}
      </div>

      <div className="container hero-inner">
        <div className="hero-top fade-in" style={{ "--d": "0.15s" }}>
          <span className="pill live">
            <i className="pulse" /> Available for new projects
          </span>
          <span className="pill mono">
            Srinagar, IN <b>{clock}</b> IST
          </span>
        </div>

        <h1 className="hero-title" aria-label={profile.name}>
          <span className="hl">
            <SplitChars text={profile.firstName} />
          </span>
          <span className="hl italic">
            <SplitChars text={profile.lastName} start={profile.firstName.length} />
          </span>
        </h1>

        <div className="hero-bottom">
          <div className="hero-lead">
            <p className="lead-label fade-in" style={{ "--d": "0.9s" }}>
              {profile.title} <span>— I lead</span>
            </p>
            <p className="lead-role fade-in" style={{ "--d": "1s" }}>
              <RoleCycle words={roles} />
            </p>
            <p className="hero-summary">
              <SplitWords text={profile.summary} start={14} />
            </p>
            <div className="hero-cta fade-in" style={{ "--d": "1.5s" }}>
              <Mag href="#contact" className="btn btn-primary">
                <span>Let’s work together</span>
                <Arrow />
              </Mag>
              <Mag href={profile.resume} download className="btn btn-ghost">
                <span>Download CV</span>
              </Mag>
            </div>
          </div>

          <dl className="hero-stats fade-in" style={{ "--d": "1.7s" }}>
            {stats.map((s) => (
              <div key={s.label}>
                <dd>
                  <Counter value={s.value} />
                </dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a href="#about" className="scroll-hint fade-in" style={{ "--d": "2s" }} aria-label="Scroll to about">
        <span className="scroll-line" />
        <span>Scroll</span>
      </a>
    </section>
  );
}
