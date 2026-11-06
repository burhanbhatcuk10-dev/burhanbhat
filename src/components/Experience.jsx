import { useRef } from "react";
import { experience, education } from "../data.js";
import { clamp, useScrollLinked } from "../hooks.js";
import { FxCard, Reveal } from "./Fx.jsx";

export default function Experience() {
  const listRef = useRef(null);

  // The vertical line fills as you scroll down the timeline.
  useScrollLinked(listRef, (el, rect) => {
    const vh = window.innerHeight;
    const p = clamp((vh * 0.6 - rect.top) / rect.height);
    el.style.setProperty("--tp", p.toFixed(4));
  });

  return (
    <section id="experience" className="section alt">
      <div className="container exp-layout">
        <Reveal className="exp-intro">
          <p className="kicker">Experience</p>
          <h2 className="display">
            Ten years, <em>three disciplines</em>
          </h2>
          <p className="lede">
            From UI/UX and QA automation to leading engineering, design and AI teams, each step shaped how I deliver today.
          </p>

          <div className="edu">
            <p className="kicker small">Education</p>
            {education.map((ed) => (
              <div key={ed.degree} className="edu-item">
                <h4>{ed.degree}</h4>
                <p>{ed.school}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <ol className="timeline" ref={listRef}>
          {experience.map((e, i) => (
            <Reveal as="li" key={e.role} delay={i * 60} className="tl-item">
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-meta">
                <span className="tl-period">{e.period}</span>
                <span className="tl-team">{e.team}</span>
              </div>
              <FxCard tilt={0} className="tl-card">
                <h3>{e.role}</h3>
                <ul>
                  {e.points.map((p, j) => (
                    <li key={p} style={{ "--j": j }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </FxCard>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
