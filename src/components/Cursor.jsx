import { useEffect, useRef } from "react";
import { isFinePointer, prefersReducedMotion } from "../hooks.js";

/** Trailing ring + dot + soft ambient glow. Fine pointers only. */
export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);
  const glow = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const ringEl = ring.current;
    const dotEl = dot.current;
    const glowEl = glow.current;
    const labelEl = label.current;
    document.documentElement.classList.add("custom-cursor");
    let x = -200,
      y = -200,
      rx = -200,
      ry = -200,
      gx = -200,
      gy = -200,
      raf = 0;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      ringEl.classList.add("on");
      dotEl.classList.add("on");
      glowEl.classList.add("on");
      dotEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const over = (e) => {
      const t = e.target;
      const tagged = t.closest?.("[data-cursor]");
      const hot = t.closest?.("a, button, input, textarea, .row-head");
      labelEl.textContent = tagged ? tagged.getAttribute("data-cursor") : "";
      ringEl.classList.toggle("label", Boolean(tagged));
      ringEl.classList.toggle("grow", Boolean(hot) && !tagged);
    };
    const leave = () => {
      ringEl.classList.remove("on");
      dotEl.classList.remove("on");
      glowEl.classList.remove("on");
    };
    const down = () => ringEl.classList.add("press");
    const up = () => ringEl.classList.remove("press");

    const loop = () => {
      rx += (x - rx) * 0.17;
      ry += (y - ry) * 0.17;
      gx += (x - gx) * 0.07;
      gy += (y - gy) * 0.07;
      ringEl.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`;
      glowEl.style.transform = `translate3d(${gx.toFixed(1)}px, ${gy.toFixed(1)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={glow} className="cursor-glow" aria-hidden="true" />
      <div ref={ring} className="cursor" aria-hidden="true">
        <span ref={label} className="cursor-label" />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
