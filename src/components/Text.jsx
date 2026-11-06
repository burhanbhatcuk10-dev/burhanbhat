import { useEffect, useRef, useState } from "react";
import { clamp, prefersReducedMotion, useCountUp, useInView, useScrollLinked } from "../hooks.js";

/** Letters rise out of a mask one by one (needs `.ready` ancestor to play). */
export function SplitChars({ text, start = 0 }) {
  let n = start;
  return (
    <>
      {text.split(" ").map((word, wi, arr) => (
        <span key={wi} className="word" aria-hidden="true">
          {[...word].map((c) => {
            const i = n++;
            return (
              <span key={i} className="mask">
                <span className="ch" style={{ "--i": i }}>
                  {c}
                </span>
              </span>
            );
          })}
          {wi < arr.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

/** Words fade up and de-blur in sequence (needs `.ready` ancestor). */
export function SplitWords({ text, start = 0 }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="w" style={{ "--i": i + start }}>
            {w}
          </span>{" "}
        </span>
      ))}
    </>
  );
}

/** Letters ripple on hover of the parent link. */
export function WaveText({ text }) {
  return (
    <>
      {[...text].map((c, i) => (
        <span key={i} className="l" style={{ "--i": i }}>
          {c}
        </span>
      ))}
    </>
  );
}

/** "10+", "40%", "3" counting up when scrolled into view. */
export function Counter({ value }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const [ref, seen] = useInView(0.2, "0px");
  const n = useCountUp(target, seen);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/** Rotating phrase that slides in from below. */
export function RoleCycle({ words, interval = 2400 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setI((x) => (x + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);
  return (
    <span className="cycle">
      <span key={i} className="cycle-word">
        {words[i]}
      </span>
    </span>
  );
}

/** Paragraph whose words light up as you scroll through it. */
export function ScrollWords({ text }) {
  const ref = useRef(null);
  const words = text.split(" ");
  const lit = useRef(-1);

  useScrollLinked(ref, (el, rect) => {
    const vh = window.innerHeight;
    const p = prefersReducedMotion() ? 1 : clamp((vh * 0.82 - rect.top) / (rect.height + vh * 0.25));
    const count = Math.round(p * words.length);
    if (count === lit.current) return;
    lit.current = count;
    const spans = el.children;
    for (let i = 0; i < spans.length; i++) spans[i].classList.toggle("on", i < count);
  });

  return (
    <p ref={ref} className="scrollwords">
      {words.map((w, i) => (
        <span key={i} className="sw">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

export function Arrow({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
