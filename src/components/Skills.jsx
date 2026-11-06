import { skillGroups } from "../data.js";
import { FxCard, Reveal } from "./Fx.jsx";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal className="section-head">
          <p className="kicker">Toolkit</p>
          <h2 className="display">
            Skills that <em>ship</em>
          </h2>
        </Reveal>

        <div className="skills-grid">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 2) * 90}>
              <FxCard tilt={4} className="skill-card">
                <span className="skill-no">0{i + 1}</span>
                <h3>{g.title}</h3>
                <ul>
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </FxCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
