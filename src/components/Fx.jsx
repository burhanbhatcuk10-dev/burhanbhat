import { createElement } from "react";
import { useInView, useMagnetic, usePointerFx } from "../hooks.js";

/** Scroll-triggered fade / slide up. */
export function Reveal({ as = "div", delay = 0, className = "", style, children, ...rest }) {
  const [ref, seen] = useInView();
  return createElement(
    as,
    {
      ...rest,
      ref,
      className: `rv ${seen ? "in" : ""} ${className}`.trim(),
      style: { transitionDelay: `${delay}ms`, ...style },
    },
    children
  );
}

/** Surface with spotlight glow, border light and optional 3D tilt. */
export function FxCard({ as = "div", tilt = 6, className = "", children, ...rest }) {
  const ref = usePointerFx({ tilt });
  return createElement(as, { ref, className: `fx ${className}`.trim(), ...rest }, children);
}

/** Link / button that is pulled toward the pointer. */
export function Mag({ as = "a", strength = 0.28, children, ...rest }) {
  const ref = useMagnetic(strength);
  return createElement(as, { ref, ...rest }, children);
}

export default Reveal;
