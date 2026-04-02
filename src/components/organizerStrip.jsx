import { useEffect, useRef, useState } from "react";
import quantumLogo from "../assets/quntum-logo.png";
import codexLogo from "../assets/codex-logo.png";

const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const OrganizerText = () => (
  <>
    Organized by{" "}
    <span
      className="font-bold cursor-default transition-colors duration-200 hover:text-(--primary-dark)"
      style={{ color: "var(--primary)" }}
    >
      CodeX Club
    </span>
    {" "}under the supervision of{" "}
    <span
      className="font-bold cursor-default transition-colors duration-200 hover:text-(--primary-dark)"
      style={{ color: "var(--primary)" }}
    >
      Department of Computer Science &amp; Engineering and Computer Applications
    </span>
  </>
);

function OrganizerStrip() {
  const [ref, inView] = useInView(0.2);

  return (
    <div
      ref={ref}
      className="rounded-(--radius) border px-5 sm:px-8 py-5 max-w-4xl mx-auto mt-10"
      style={{
        background:  "var(--bg-light)",
        borderColor: "var(--border)",
        boxShadow:   "0 4px 15px rgba(0,0,0,0.03)",
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div className="sm:hidden">
        <div className="flex flex-row items-center justify-center gap-4 mb-4 px-2">
          <img src={quantumLogo} alt="Quantum University" className="h-10 w-auto object-contain" />
          <img src={codexLogo}   alt="CodeX Club"         className="h-10 w-auto object-contain" />
        </div>
        <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-dark)" }}>
          <OrganizerText />
        </p>
      </div>
      <div className="hidden sm:flex flex-row items-center justify-between gap-5">
        <img src={quantumLogo} alt="Quantum University" className="h-14 w-auto object-contain shrink-0" />
        <p className="text-base leading-relaxed text-center flex-1" style={{ color: "var(--text-dark)" }}>
          <OrganizerText />
        </p>
        <img src={codexLogo} alt="CodeX Club" className="h-14 w-auto object-contain shrink-0" />
      </div>

    </div>
  );
}

export default OrganizerStrip;