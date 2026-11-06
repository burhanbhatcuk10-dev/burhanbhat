import { services } from "../data.js";
import { FxCard, Reveal } from "./Fx.jsx";

export default function Services() {
  return (
    <section id="services" className="section alt">
      <div className="container">
        <Reveal className="section-head">
          <p className="kicker">Services</p>
          <h2 className="display">
            How I can <em>help</em>
          </h2>
        </Reveal>

        <div className="services-grid">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <FxCard tilt={5} className="service" data-cursor="Let’s talk">
                <span className="service-no">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <a href="#contact" className="link-arrow">
                  Start a conversation <span aria-hidden="true">→</span>
                </a>
              </FxCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
