import { useEffect, useRef, useState } from "react";
import { Download, Mail } from "lucide-react";

/* ── IntersectionObserver hook (fires once) ── */
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

const SponsorCTA = () => {
  const [headerRef, headerInView] = useInView(0.3);
  const [boxRef,    boxInView]    = useInView(0.2);

  const handleDownloadBrochure = (e) => {
    e.preventDefault();
    window.open("https://drive.google.com/file/d/1nZfTdO8etlti3NfCVrHc0nu5bReZBJME/view?usp=drivesdk", "_blank");
  };

  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-10"
          style={{
            opacity:    headerInView ? 1 : 0,
            transform:  headerInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.65s ease 80ms, transform 0.65s ease 80ms",
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--primary)" }}>
            Partner With Us
          </h2>
          <div
            className="h-1 w-16 rounded-full mx-auto mb-5"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
          <p className="text-base sm:text-lg leading-relaxed mx-auto max-w-xl" style={{ color: "#555" }}>
            We are currently looking for visionary companies to help make Q-Hackathon 2026 a
            reality. Be the first to claim your spot!
          </p>
        </div>

        {/* CTA Box */}
        <div
          ref={boxRef}
          className="rounded-(--radius) border text-center px-8 py-10 sm:px-12"
          style={{
            background:  "var(--bg-light)",
            borderColor: "var(--border)",
            boxShadow:   "0 10px 30px rgba(0,0,0,0.04)",
            opacity:    boxInView ? 1 : 0,
            transform:  boxInView ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
            transition: "opacity 0.7s ease 180ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) 180ms",
          }}
        >
          <p className="text-lg sm:text-xl font-bold mb-7" style={{ color: "var(--text-dark)" }}>
            Ready to empower the next generation of tech leaders?
          </p>

          {/* Button group */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">

            {/* Primary — Download */}
            <button
              onClick={handleDownloadBrochure}
              className="inline-flex items-center justify-center gap-2
                         font-bold text-sm px-6 py-3.5 rounded-(--radius)
                         border-2 transition-all duration-200 whitespace-nowrap cursor-pointer"
              style={{
                background:  "var(--primary)",
                color:       "white",
                borderColor: "var(--primary)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = "var(--primary-dark)";
                e.currentTarget.style.borderColor = "var(--primary-dark)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = "var(--primary)";
                e.currentTarget.style.borderColor = "var(--primary)";
              }}
            >
              <Download size={15} strokeWidth={2.5} />
              Download Brochure (PDF)
            </button>

            {/* Outline — Contact */}
            <a
              href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=codex.club@quantumeducation.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2
                         font-bold text-sm px-6 py-3.5 rounded-(--radius)
                         border-2 bg-transparent transition-all duration-200 whitespace-nowrap"
              style={{
                color:       "var(--primary)",
                borderColor: "var(--primary)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = "var(--primary)";
                e.currentTarget.style.color       = "white";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = "transparent";
                e.currentTarget.style.color       = "var(--primary)";
              }}
            >
              <Mail size={15} strokeWidth={2.5} />
              Contact Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SponsorCTA;