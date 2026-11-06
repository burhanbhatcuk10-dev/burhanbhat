import { useEffect, useRef, useState } from "react";

/**
 * Remote image with a graceful lifecycle:
 * tone-gradient placeholder -> fades/zooms in on load -> stays as gradient on error.
 */
export default function Img({ src, alt = "", tone = "a", eager = false, className = "" }) {
  const ref = useRef(null);
  const [state, setState] = useState("loading");

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete) setState(el.naturalWidth > 0 ? "ok" : "err");
  }, [src]);

  return (
    <span className={`img tone-${tone} is-${state} ${className}`.trim()}>
      <img
        ref={ref}
        src={src}
        alt={state === "err" ? "" : alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable="false"
        onLoad={() => setState("ok")}
        onError={() => setState("err")}
      />
    </span>
  );
}
