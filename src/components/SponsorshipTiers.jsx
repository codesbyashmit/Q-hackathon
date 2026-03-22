import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

/* ── IntersectionObserver hook (fires once) ── */
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

const tiers = [
  {
    name: "Platinum",
    price: "₹40,000 – ₹60,000",
    featured: true,
    badge: "Most Impact",
    benefits: [
      "Largest logo on homepage",
      "Main stage backdrop branding",
      "Opening & Closing mentions",
      "Dedicated social media post",
      "Introduce problem statement",
      "Host CTF / challenge track",
      "Nominate Judge & Mentor",
      "Booth / promotional stall",
      "Resume database access",
      "Hiring opportunities",
    ],
  },
  {
    name: "Gold",
    price: "₹25,000 – ₹40,000",
    featured: false,
    badge: null,
    benefits: [
      "Large logo on website",
      "Logo on major event banners",
      "Opening & Closing mentions",
      "Social media promotion",
      "Host CTF challenge",
      "Nominate Judge & Mentor",
      "Promotional booth/counter",
      "Distribute merchandise",
      "Logo in highlight post",
    ],
  },
  {
    name: "Silver",
    price: "₹15,000 – ₹25,000",
    featured: false,
    badge: null,
    benefits: [
      "Logo on website & banners",
      "Prize distribution mention",
      "Social media acknowledgement",
      "Host mini challenge",
      "Nominate 1 Mentor",
      "Brand mention in report",
      "Mention in emails",
    ],
  },
  {
    name: "Bronze",
    price: "₹5,000 – ₹10,000",
    featured: false,
    badge: null,
    benefits: [
      "Logo on website section",
      "Logo in list poster",
      "Social media acknowledgement",
      "Mention in closing slides",
      "Brand name on page",
      "Thank-you post mention",
    ],
  },
];

/* ── Tier Card ── */
const TierCard = ({ tier, index, inView }) => {
  const { name, price, featured, badge, benefits } = tier;
  const delay = index * 100;

  const handleSponsorClick = (e) => {
    e.preventDefault();
    window.open("https://drive.google.com/file/d/1nZfTdO8etlti3NfCVrHc0nu5bReZBJME/view?usp=drivesdk", "_blank");
  };

  return (
    <div
      className="relative flex flex-col rounded-(--radius) border px-7 pt-10 pb-8
                 transition-all duration-300 hover:-translate-y-1"
      style={{
        background:   featured
          ? "linear-gradient(to bottom, #ffffff, var(--secondary))"
          : "var(--text-light)",
        border:       featured ? "2px solid var(--primary)" : "1px solid var(--border)",
        boxShadow:    featured
          ? "0 16px 40px rgba(140,46,124,0.18)"
          : "0 2px 10px rgba(0,0,0,0.04)",
        // Landing animation
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
        transition: `opacity 0.65s ease ${delay}ms,
                     transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     box-shadow 0.3s ease`,
      }}
      onMouseEnter={e => {
        if (!featured) e.currentTarget.style.boxShadow = "0 12px 28px rgba(140,46,124,0.10)";
      }}
      onMouseLeave={e => {
        if (!featured) e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)";
      }}
    >
      {/* Badge */}
      {badge && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[10px]
                     font-black uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap"
          style={{ background: "var(--primary)" }}
        >
          {badge}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h2
          className="text-2xl font-bold mb-1"
          style={{ color: "var(--text-dark)" }}
        >
          {name}
        </h2>
        <p className="text-base font-extrabold" style={{ color: "var(--primary)" }}>
          {price}
        </p>
      </div>

      {/* Benefits */}
      <ul className="flex flex-col gap-2.5 flex-1 mb-8">
        {benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#444" }}>
            <Check
              size={14}
              strokeWidth={3}
              className="mt-0.5 shrink-0"
              style={{ color: "var(--primary)" }}
            />
            <span className={i === 0 && featured ? "font-bold" : ""}>{b}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={handleSponsorClick}
        className="block w-full text-center text-sm font-bold py-3 rounded-(--radius)
                   border-2 transition-all duration-200 cursor-pointer"
        style={
          featured
            ? { background: "var(--primary)", color: "white", borderColor: "var(--primary)" }
            : { background: "transparent", color: "var(--primary)", borderColor: "var(--primary)" }
        }
        onMouseEnter={e => {
          e.currentTarget.style.background   = "var(--primary-dark)";
          e.currentTarget.style.borderColor  = "var(--primary-dark)";
          e.currentTarget.style.color        = "white";
        }}
        onMouseLeave={e => {
          if (featured) {
            e.currentTarget.style.background  = "var(--primary)";
            e.currentTarget.style.borderColor = "var(--primary)";
            e.currentTarget.style.color       = "white";
          } else {
            e.currentTarget.style.background  = "transparent";
            e.currentTarget.style.borderColor = "var(--primary)";
            e.currentTarget.style.color       = "var(--primary)";
          }
        }}
      >
        Become a Sponsor
      </button>
    </div>
  );
};

/* ── Main Component ── */
const SponsorshipTiers = () => {
  const [headerRef, headerInView] = useInView(0.3);
  const [gridRef,   gridInView]   = useInView(0.05);

  return (
    <section className="py-20 px-5 bg-(--bg-light)">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div
          ref={headerRef}
          className="text-center mb-12"
          style={{
            opacity:    headerInView ? 1 : 0,
            transform:  headerInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 80ms, transform 0.6s ease 80ms",
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--primary)" }}>
            Sponsorship Tiers
          </h2>
          <div
            className="h-1 w-16 rounded-full mx-auto mt-3"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
        </div>

        {/* Grid — 1 col mobile → 2 col tablet → 4 col desktop */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-start"
        >
          {tiers.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} index={i} inView={gridInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorshipTiers;