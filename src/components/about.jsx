import { useEffect, useRef, useState } from "react";
import { getOptimizedUrl } from "../utils/imageOptimizer";

const stats = [
  { value: "36",   label: "Hours of Hacking" },
  { value: "60+",  label: "Innovative Teams"  },
  { value: "05",   label: "Tech Tracks"        },
  { value: "₹1.5L", label: "Worth Prize Pool"         },
];

const useInView = (threshold = 0.1) => {
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

/* ── Stat Card ──  -+*/
const StatCard = ({ value, label, index, inView }) => (
  <div
    className="group relative overflow-hidden rounded-(--radius) text-center
               px-3 py-6 sm:px-6 sm:py-10
               border border-white/15 transition-all duration-300
               hover:-translate-y-1 sm:hover:-translate-y-2"
    style={{
      background:           "rgba(20,20,20,0.60)",
      backdropFilter:       "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      boxShadow:            "0 8px 32px rgba(0,0,0,0.30)",
      opacity:    inView ? 1 : 0,
      transform:  inView ? "translateY(0) scale(1)" : "translateY(36px) scale(0.95)",
      transition: `opacity 0.65s ease ${index * 100}ms,
                   transform 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms,
                   box-shadow 0.3s ease`,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow   = "0 16px 32px rgba(140,46,124,0.60)";
      e.currentTarget.style.background  = "rgba(40,40,40,0.80)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.30)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow   = "0 8px 32px rgba(0,0,0,0.30)";
      e.currentTarget.style.background  = "rgba(20,20,20,0.60)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
    }}
  >
    {/* Top accent bar */}
    <div
      className="absolute top-0 left-0 w-full h-0.75 scale-x-0 group-hover:scale-x-100
                 transition-transform duration-300 origin-center"
      style={{ background: "var(--primary)" }}
    />

    <p
      className="text-3xl sm:text-5xl font-bold leading-none mb-1.5 sm:mb-2"
      style={{ color: "var(--secondary)" }}
    >
      {value}
    </p>
    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/65 leading-tight">
      {label}
    </p>
  </div>
);

/* ── Main Section ── */
const About = () => {
  const [headerRef, headerInView] = useInView(0.2);
  const [statsRef,  statsInView]  = useInView(0.1);

  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6">

      {/* ── Cinematic Background Carousel ── */}
      <div className="absolute inset-0 z-0">
        {[getOptimizedUrl("hero-bg.jpg"), getOptimizedUrl("hero6-min.jpg"), getOptimizedUrl("hero7-min.jpg")].map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center opacity-0"
            style={{
              backgroundImage: `url('${src}')`,
              animation:       "cinematicFade 18s infinite linear",
              animationDelay:  `${i * 6}s`,
            }}
          />
        ))}
        {/* Dark frosted overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:           "rgba(0,0,0,0.25)",
            backdropFilter:       "blur(3px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading block */}
        <div
          ref={headerRef}
          className="text-center max-w-xl mx-auto mb-10 sm:mb-16"
          style={{
            opacity:    headerInView ? 1 : 0,
            transform:  headerInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease 100ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) 100ms",
          }}
        >
          <h2 className="section-heading mb-3">
            About the Hackathon
          </h2>
          <div
            className="h-1 w-16 sm:w-20 rounded-full mx-auto mb-4 sm:mb-6"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/80">
            Q-Hackathon is a 36-hour intercollegiate innovation event where
            students collaborate to build real-world technology solutions
            across multiple domains.
          </p>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5"
        >
          {stats.map(({ value, label }, i) => (
            <StatCard key={label} value={value} label={label} index={i} inView={statsInView} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cinematicFade {
          0%   { opacity: 0; transform: scale(1);   }
          10%  { opacity: 1;                         }
          33%  { opacity: 1;                         }
          43%  { opacity: 0;                         }
          100% { opacity: 0; transform: scale(1.15); }
        }
      `}</style>
    </section>
  );
};

export default About;