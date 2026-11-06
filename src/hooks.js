import { useEffect, useRef, useState } from "react";

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const pad2 = (n) => String(n).padStart(2, "0");

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(pointer: fine)").matches;

/** Reactive media query. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && !!window.matchMedia?.(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

/** One-shot "scrolled into view" flag. */
export function useInView(threshold = 0.15, rootMargin = "0px 0px -6% 0px") {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion()) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, seen];
}

/**
 * Global scroll physics, written once per frame as CSS variables on <html>:
 *   --p    page progress 0..1
 *   --sy   eased scroll position in px (for parallax; only near the top)
 *   --vel  smoothed scroll velocity, clamped (drives marquee skew)
 */
export function useScrollVars() {
  useEffect(() => {
    const rootStyle = document.documentElement.style;
    const cache = {};
    const set = (name, value) => {
      if (cache[name] !== value) {
        cache[name] = value;
        rootStyle.setProperty(name, value);
      }
    };
    const reduced = prefersReducedMotion();
    let raf = 0;
    let last = window.scrollY;
    let eased = last;
    let vel = 0;

    const loop = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      set("--p", max > 0 ? (y / max).toFixed(4) : "0");
      eased += (y - eased) * (reduced ? 1 : 0.1);
      vel += (y - last - vel) * 0.14;
      last = y;
      if (y < 1800 || Math.abs(y - eased) > 0.5) set("--sy", eased.toFixed(1));
      set("--vel", reduced ? "0" : clamp(vel, -14, 14).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
}

/** Calls cb(el, rect) on mount, scroll and resize (rAF-throttled). */
export function useScrollLinked(ref, cb) {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      raf = 0;
      cbRef.current(el, el.getBoundingClientRect());
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

/** Element drifts toward the pointer while hovered. */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const leave = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return ref;
}

/**
 * Writes --mx/--my (cursor % inside the element, for spotlight glows)
 * and --rx/--ry (3D tilt in degrees) while the pointer is over it.
 */
export function usePointerFx({ tilt = 0 } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;
    let raf = 0;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        if (tilt) {
          el.style.setProperty("--rx", `${((0.5 - y) * tilt).toFixed(2)}deg`);
          el.style.setProperty("--ry", `${((x - 0.5) * tilt).toFixed(2)}deg`);
        }
      });
    };
    const leave = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [tilt]);
  return ref;
}

/** Eased count from 0 to `target` once `start` is true. */
export function useCountUp(target, start, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return value;
}

/** Live clock for a given IANA time zone (default: India). */
export function useClock(timeZone = "Asia/Kolkata") {
  const fmt = () => {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
    } catch {
      return "";
    }
  };
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return time;
}
