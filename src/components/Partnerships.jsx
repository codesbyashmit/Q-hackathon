import { useEffect, useRef, useState } from "react";
import { Store, Handshake, Check } from "lucide-react";

/* ── IntersectionObserver hook (fires once) ── */
const useInView = (threshold = 0.15) => {
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

const partners = [
  {
    Icon: Store,
    title: "Local Business / Stall Partner",
    price: "₹2,000 – ₹5,000",
    desc: "Perfect for food vendors or local startups looking for direct engagement with 300+ attendees.",
    perks: [
      "Dedicated stall space at the venue",
      "Opportunity to sell products/food",
      "Logo mention on the website",
    ],
    highlight: false,
    cta: "Apply for a Stall",
    primary: false,
  },
  {
    Icon: Handshake,
    title: "Custom Partnership",
    price: "₹10,000 – ₹30,000",
    desc: "Tailor your impact. Sponsor specific tracks, developer swag, or event meals.",
    perks: [
      "Track-specific branding & prizes",
      "Custom social media campaigns",
      "Sponsor merchandise / dev kits",
    ],
    highlight: true,
    cta: "Let's Build Together",
    primary: true,
  },
];

/* ── Partner Box ── */
const PartnerBox = ({ partner, index, inView }) => {
  const { Icon, title, price, desc, perks, highlight, cta, primary } = partner;
  const delay = index * 130;

  const handlePDFClick = (e) => {
    e.preventDefault();
    window.open("https://drive.google.com/file/d/1nZfTdO8etlti3NfCVrHc0nu5bReZBJME/view?usp=drivesdk", "_blank");
  };

  return (
    <div
      className="relative flex flex-col rounded-(--radius) border bg-white px-8 py-9
                 transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor:  highlight ? "var(--primary)" : "var(--border)",
        borderTopWidth: highlight ? "4px" : "1px",
        boxShadow:    highlight
          ? "0 12px 32px rgba(140,46,124,0.12)"
          : "0 4px 14px rgba(0,0,0,0.05)",
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
        transition: `opacity 0.65s ease ${delay}ms,
                     transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     box-shadow 0.3s ease`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "0 16px 36px rgba(140,46,124,0.14)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = highlight
          ? "0 12px 32px rgba(140,46,124,0.12)"
          : "0 4px 14px rgba(0,0,0,0.05)";
      }}
    >
      {/* Icon bubble */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ background: highlight ? "var(--primary)" : "var(--secondary)" }}
      >
        <Icon size={22} strokeWidth={1.8} color={highlight ? "white" : "var(--primary)"} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-dark)" }}>
        {title}
      </h3>

      {/* Price badge */}
      <span
        className="inline-block text-sm font-bold px-3.5 py-1 rounded-full mb-4 w-fit"
        style={{ background: "var(--secondary)", color: "var(--primary-dark)" }}
      >
        {price}
      </span>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "#555" }}>
        {desc}
      </p>

      {/* Perks */}
      <ul className="flex flex-col gap-2 mb-8">
        {perks.map((p, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#444" }}>
            <Check size={13} strokeWidth={3} className="mt-0.5 shrink-0"
              style={{ color: "var(--primary)" }} />
            {p}
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <button
        onClick={handlePDFClick}
        className="block w-full text-center text-sm font-bold py-3 rounded-(--radius)
                   border-2 transition-all duration-200 mt-auto cursor-pointer"
        style={
          primary
            ? { background: "var(--primary)", color: "white", borderColor: "var(--primary)" }
            : { background: "transparent", color: "var(--primary)", borderColor: "var(--primary)" }
        }
        onMouseEnter={e => {
          e.currentTarget.style.background  = "var(--primary-dark)";
          e.currentTarget.style.borderColor = "var(--primary-dark)";
          e.currentTarget.style.color       = "white";
        }}
        onMouseLeave={e => {
          if (primary) {
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
        {cta}
      </button>
    </div>
  );
};

/* ── Main Component ── */
const Partnerships = () => {
  const [headerRef, headerInView] = useInView(0.3);
  const [gridRef,   gridInView]   = useInView(0.1);

  return (
    <section className="py-20 px-5" style={{ background: "var(--bg-light)" }}>
      <div className="max-w-4xl mx-auto">

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
            More Ways to Partner
          </h2>
          <div
            className="h-1 w-16 rounded-full mx-auto mt-3"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
        </div>

        {/* 2-column grid — stacks on mobile */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {partners.map((partner, i) => (
            <PartnerBox key={partner.title} partner={partner} index={i} inView={gridInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partnerships;