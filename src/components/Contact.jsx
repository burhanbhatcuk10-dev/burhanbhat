import { useState } from "react";
import { profile } from "../data.js";
import { useClock } from "../hooks.js";
import { Mag, Reveal } from "./Fx.jsx";
import { Arrow, WaveText } from "./Text.jsx";

export default function Contact() {
  const clock = useClock();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <p className="kicker">Contact</p>
          <h2 className="display huge">
            Let’s build something <em>remarkable</em> together.
          </h2>
        </Reveal>

        <Reveal delay={80} className="mail-wrap">
          <Mag href={`mailto:${profile.email}`} className="big-mail" data-cursor="Write">
            <WaveText text={profile.email} />
          </Mag>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-info">
            <ul className="contact-list">
              <li>
                <span>Phone</span>
                <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
              </li>
              <li>
                <span>Based in</span>
                <b>{profile.location}</b>
              </li>
              <li>
                <span>Local time</span>
                <b className="mono">{clock} IST</b>
              </li>
            </ul>
            <Mag href={profile.resume} download className="btn btn-ghost">
              <span>Download résumé (PDF)</span>
              <Arrow />
            </Mag>
          </Reveal>

          <Reveal delay={100}>
            <form className="form" onSubmit={onSubmit}>
              <label>
                <span>Name</span>
                <input required value={form.name} onChange={update("name")} placeholder="Your name" autoComplete="name" />
              </label>
              <label>
                <span>Email</span>
                <input required type="email" value={form.email} onChange={update("email")} placeholder="you@company.com" autoComplete="email" />
              </label>
              <label>
                <span>Message</span>
                <textarea required rows="5" value={form.message} onChange={update("message")} placeholder="What are you building?" />
              </label>
              <button type="submit" className="btn btn-primary">
                <span>Send message</span>
                <Arrow />
              </button>
              {sent && <p className="form-note">Your email app should open with the message ready to send.</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
