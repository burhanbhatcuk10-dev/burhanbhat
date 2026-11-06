import { marqueeA, marqueeB } from "../data.js";

function Row({ items, reverse = false, outline = false }) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className={`mq-row ${outline ? "outline" : ""}`}>
      <div className={`mq-track ${reverse ? "reverse" : ""}`}>
        {loop.map((t, i) => (
          <span key={i} className="mq-item">
            {t}
            <i aria-hidden="true">✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two opposing tickers that lean into the scroll direction. */
export default function Marquee() {
  return (
    <section className="marquee" aria-label="Core skills">
      <div className="mq-skew">
        <Row items={marqueeA} />
        <Row items={marqueeB} reverse outline />
      </div>
    </section>
  );
}
