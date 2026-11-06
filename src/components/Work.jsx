import { useEffect, useRef } from "react";
import { work } from "../data.js";
import { clamp, pad2, prefersReducedMotion, useMediaQuery } from "../hooks.js";
import { FxCard, Reveal } from "./Fx.jsx";
import Img from "./Img.jsx";

function Card({ w }) {
  return (
    <FxCard as="article" tilt={5} className={`pcard tone-${w.tone}`} data-cursor="Explore">
      <div className="pcard-media">
        <div className="pcard-media-in">
          <Img src={w.image} alt={w.alt} tone={w.tone} />
        </div>
        <span className="pcard-index">{w.id}</span>
        <span className="pcard-year">{w.year}</span>
      </div>
      <div className="pcard-body">
        <div className="chips">
          {w.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        <h3>{w.title}</h3>
        <p>{w.description}</p>
        <p className="pcard-result">
          <i /> {w.result}
        </p>
      </div>
    </FxCard>
  );
}

/**
 * Desktop: the section pins while vertical scrolling drives a smooth horizontal track.
 * Touch / narrow / reduced-motion: a normal responsive grid with reveals.
 */
export default function Work() {
  const wide = useMediaQuery("(min-width: 960px) and (pointer: fine)");
  const pinned = wide && !prefersReducedMotion();

  const secRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    const sec = secRef.current;
    const track = trackRef.current;
    if (!pinned) {
      sec.style.height = "";
      track.style.transform = "";
      return;
    }

    const cards = [...track.children];
    const total = cards.length;
    let max = 0;
    let target = 0;
    let cur = 0;
    let raf = 0;
    let lastIdx = -1;
    let force = true;

    const readScroll = () => {
      const top = sec.getBoundingClientRect().top;
      const scrollable = sec.offsetHeight - window.innerHeight;
      target = scrollable > 0 ? clamp(-top / scrollable) : 0;
    };
    const measure = () => {
      track.style.transform = "translate3d(0,0,0)";
      max = Math.max(0, track.scrollWidth - window.innerWidth);
      sec.style.height = `${window.innerHeight + max}px`;
      readScroll();
      force = true;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!force && Math.abs(target - cur) < 0.00008) return;
      force = false;
      cur += (target - cur) * 0.12;
      if (Math.abs(target - cur) < 0.00008) cur = target;

      track.style.transform = `translate3d(${(-cur * max).toFixed(1)}px,0,0)`;
      barRef.current.style.transform = `scaleX(${cur.toFixed(4)})`;

      // read all rects first, then write (avoids layout thrash)
      const vw = window.innerWidth;
      const centers = cards.map((c) => {
        const r = c.getBoundingClientRect();
        return (r.left + r.width / 2 - vw / 2) / vw;
      });
      let nearest = 0;
      let best = Infinity;
      centers.forEach((c, i) => {
        cards[i].style.setProperty("--px", c.toFixed(3));
        if (Math.abs(c) < best) {
          best = Math.abs(c);
          nearest = i;
        }
      });
      if (nearest !== lastIdx) {
        lastIdx = nearest;
        numRef.current.textContent = pad2(nearest + 1);
        cards.forEach((c, i) => c.classList.toggle("is-active", i === nearest));
      }
    };

    measure();
    raf = requestAnimationFrame(tick);
    const onScroll = () => readScroll();
    const onResize = () => measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Re-measure once fonts / images settle so the scroll distance is exact.
    const settle = setTimeout(measure, 600);
    document.fonts?.ready?.then(measure).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      sec.style.height = "";
      track.style.transform = "";
      void total;
    };
  }, [pinned]);

  return (
    <section id="work" ref={secRef} className={`work ${pinned ? "pinned" : ""}`}>
      <div className="work-sticky">
        <div className="container work-head">
          <div>
            <p className="kicker">Selected work</p>
            <h2 className="display">
              Look what I <em>deliver</em>
            </h2>
          </div>
          <div className="work-meter" aria-hidden={!pinned}>
            <span className="meter-num" ref={numRef}>
              01
            </span>
            <span className="meter-total">/ {pad2(work.length)}</span>
            <span className="meter-bar">
              <i ref={barRef} />
            </span>
          </div>
        </div>

        <div className="work-track" ref={trackRef}>
          {work.map((w, i) =>
            pinned ? (
              <div key={w.id} className="card-slot">
                <Card w={w} />
              </div>
            ) : (
              <Reveal key={w.id} delay={(i % 2) * 90} className="card-slot">
                <Card w={w} />
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}
