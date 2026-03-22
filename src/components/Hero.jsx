import { useEffect, useState } from "react";
import logo from "../assets/qhackathon-name.svg";
import robot from "../assets/hero-robo.svg";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const calculateTimeLeft = () => {
    const countDate = new Date("April 24, 2026 09:00:00").getTime();
    const gap = countDate - Date.now();
    if (gap <= 0) return null;
    const s = 1000, m = s * 60, h = m * 60, d = h * 24;
    return {
      days: Math.floor(gap / d),
      hours: Math.floor((gap % d) / h),
      mins: Math.floor((gap % h) / m),
      secs: Math.floor((gap % m) / s),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeUnits = timeLeft
    ? [
      { value: timeLeft.days, label: "Days" },
      { value: timeLeft.hours, label: "Hrs" },
      { value: timeLeft.mins, label: "Min" },
      { value: timeLeft.secs, label: "Sec" },
    ]
    : [];

  const fadeUp = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section
      className="relative min-h-svh flex items-center px-4 sm:px-6 py-14 overflow-hidden"
      style={{ background: "radial-gradient(circle at top left, var(--secondary), var(--bg-light) 60%)" }}
    >
      {/* Blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-65 h-65 sm:w-115 sm:h-115 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--primary)" }} />
      <div className="pointer-events-none absolute bottom-0 right-0 w-50 h-50 sm:w-95 sm:h-95 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--primary-dark)" }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-16">

        {/* Robot — top on mobile */}
        <div
          className="w-full lg:flex-1 flex justify-center lg:order-2"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.94)",
            transition: "opacity 0.8s ease 120ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) 120ms",
          }}
        >
          <img
            src={robot}
            alt="Hackathon Robot Mascot"
            className="w-36 sm:w-56 lg:w-full lg:max-w-100 animate-float"
            style={{ filter: "drop-shadow(0 14px 22px rgba(140,46,124,0.18))" }}
          />
        </div>

        {/* Content */}
        <div className="lg:order-1 lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full">

          {/* Logo */}
          <img
            src={logo}
            alt="Q-Hackathon 2026 Logo"
            className="w-40 sm:w-56 lg:max-w-xs mb-4 drop-shadow-md"
            style={fadeUp(100)}
          />

          {/* Subtitle */}
          <p
            className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight mb-1"
            style={{ color: "var(--primary)", letterSpacing: "-0.4px", ...fadeUp(220) }}
          >
            36-Hour Intercollegiate Hackathon
          </p>

          {/* Date / location */}
          <p
            className="text-xs sm:text-sm lg:text-base font-semibold mb-5 sm:mb-7 opacity-70"
            style={{ color: "var(--text-dark)", ...fadeUp(330) }}
          >
            24–25 April 2026 &bull; Quantum University
          </p>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 mb-6 sm:mb-10 w-full sm:w-auto"
            style={fadeUp(440)}
          >
            <a href="https://bit.ly/4st6atF" className="w-full sm:w-auto">
              <button
                className="w-full font-bold text-sm px-5 sm:px-8 py-2.5 sm:py-3.5
                           rounded-(--radius) transition-all duration-300 cursor-pointer border-none"
                style={{
                  background: "var(--primary)",
                  color: "var(--text-light)",
                  boxShadow: "0 6px 18px rgba(140,46,124,0.28)",
                  fontFamily: "inherit",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "var(--primary-dark)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 22px rgba(140,46,124,0.38)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "var(--primary)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 18px rgba(140,46,124,0.28)";
                }}
                onMouseDown={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Register Now
              </button>
            </a>
            <button
              onClick={() => {
                const el = document.getElementById("tracks");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto font-bold text-sm px-5 sm:px-8 py-2.5 sm:py-3.5
             rounded-(--radius) bg-transparent transition-all duration-300 cursor-pointer"
              style={{
                border: "2px solid var(--border)",
                color: "var(--text-dark)",
                fontFamily: "inherit"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.color = "var(--primary)";
                e.currentTarget.style.background = "var(--secondary)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-dark)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              View Tracks
            </button>
          </div>

          {/* ── Countdown — always a single row of 4 ── */}
          {timeLeft ? (
            <div className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              {timeUnits.map(({ value, label }, i) => (
                <div
                  key={label}
                  className="flex-1 text-center rounded-(--radius) py-2.5 sm:py-3.5 px-1 sm:px-4"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.85)",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0) scale(1)" : "translateY(16px) scale(0.92)",
                    transition: `opacity 0.6s ease ${520 + i * 70}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${520 + i * 70}ms`,
                  }}
                >
                  <span
                    className="block text-xl sm:text-3xl font-bold leading-none mb-0.5"
                    style={{ color: "var(--primary)" }}
                  >
                    {String(value).padStart(2, "0")}
                  </span>
                  <small
                    className="uppercase text-[9px] sm:text-[11px] font-semibold tracking-wider opacity-60"
                    style={{ color: "var(--text-dark)" }}
                  >
                    {label}
                  </small>
                </div>
              ))}
            </div>
          ) : (
            <h3 className="text-lg sm:text-2xl font-bold" style={{ color: "var(--primary)" }}>
              🚀 The Hackathon has started!
            </h3>
          )}

        </div>
      </div>
    </section>
  );
};

export default Hero;