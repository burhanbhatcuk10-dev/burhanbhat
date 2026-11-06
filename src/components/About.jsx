import { aboutText, aboutImages, facts } from "../data.js";
import { Reveal } from "./Fx.jsx";
import Img from "./Img.jsx";
import { ScrollWords } from "./Text.jsx";

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <Reveal className="kicker-row">
          <p className="kicker">About</p>
        </Reveal>

        <ScrollWords text={aboutText} />

        <div className="about-grid">
          <Reveal className="about-facts">
            <dl>
              {facts.map((f) => (
                <div key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="about-media">
            {aboutImages.map((im, i) => (
              <Reveal key={i} delay={i * 120} className={`clip m${i + 1}`}>
                <div className="clip-in">
                  <Img src={im.src} alt={im.alt} tone={im.tone} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
