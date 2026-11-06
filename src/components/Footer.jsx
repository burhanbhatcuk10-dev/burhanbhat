import { profile } from "../data.js";
import { prefersReducedMotion } from "../hooks.js";
import { Reveal } from "./Fx.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <Reveal className="footer-giant" aria-hidden="true">
        <span>{profile.name}</span>
      </Reveal>
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <nav aria-label="Footer">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
            }}
          >
            Back to top ↑
          </a>
        </nav>
      </div>
    </footer>
  );
}
