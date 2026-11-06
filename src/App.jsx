import { useCallback, useEffect, useState } from "react";
import Loader from "./components/Loader.jsx";
import Cursor from "./components/Cursor.jsx";
import Nav, { NAV_LINKS } from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Work from "./components/Work.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Services from "./components/Services.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { prefersReducedMotion, useScrollVars } from "./hooks.js";

const SECTION_IDS = ["top", ...NAV_LINKS.map((l) => l.id)];

function initialTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* storage unavailable */
  }
  return "dark";
}

export default function App() {
  const reduced = prefersReducedMotion();
  const [theme, setTheme] = useState(initialTheme);
  const [ready, setReady] = useState(reduced);
  const [loading, setLoading] = useState(!reduced);
  const [active, setActive] = useState("top");

  useScrollVars();

  // theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  // lock scroll while the loader plays
  useEffect(() => {
    document.body.classList.toggle("is-loading", loading);
    return () => document.body.classList.remove("is-loading");
  }, [loading]);

  const handleLoaded = useCallback(() => {
    setReady(true);
    setTimeout(() => setLoading(false), 1100);
  }, []);

  // active section for the nav pill
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`app ${ready ? "ready" : ""}`}>
      {loading && <Loader onDone={handleLoaded} />}
      <div className="progress" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav active={active} theme={theme} onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Services />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
