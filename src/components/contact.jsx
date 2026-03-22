import { useEffect, useRef, useState } from "react";
import { Mail, Instagram, MapPin, Phone, User } from "lucide-react";
import OrganizerStrip from "./organizerStrip";
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

/* ── Info Card ── */
const InfoCard = ({ inView, delay }) => (
  <div
    className="flex flex-col bg-white rounded-(--radius) border p-7
                transition-all duration-300 hover:-translate-y-1 hover:border-(--primary)"
    style={{
      borderColor: "var(--border)",
      boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                   border-color 0.3s ease, box-shadow 0.3s ease`,
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 10px 28px rgba(140,46,124,0.10)"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.05)"; }}
  >
    <h3 className="text-xl font-bold mb-5" style={{ color: "var(--primary-dark)" }}>
      General Inquiries
    </h3>

    {/* Email */}
    <div className="mb-4">
      <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest mb-1.5"
        style={{ color: "var(--primary)" }}>
        <Mail size={11} strokeWidth={2.5} /> Email
      </span>
      <a href="mailto:codexclub@email.com"
        className="text-sm font-medium transition-colors duration-200 hover:text-(--primary)"
        style={{ color: "var(--text-dark)" }}>
        codexclub@email.com
      </a>
    </div>

    {/* Instagram */}
    <div className="mb-4">
      <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest mb-1.5"
        style={{ color: "var(--primary)" }}>
        <Instagram size={11} strokeWidth={2.5} /> Instagram
      </span>
      <a href="https://instagram.com/codexclub" target="_blank" rel="noreferrer"
        className="text-sm font-medium transition-colors duration-200 hover:text-(--primary)"
        style={{ color: "var(--text-dark)" }}>
        @codexclub
      </a>
    </div>

    {/* Address */}
    <div>
      <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest mb-1.5"
        style={{ color: "var(--primary)" }}>
        <MapPin size={11} strokeWidth={2.5} /> Address
      </span>
      <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--text-dark)" }}>
        Computer Science Dept, Tech Institute Main Campus
      </p>
    </div>
  </div>
);

/* ── Lead Card ── */
const LeadCard = ({ name, role, desc, phone, inView, delay }) => (
  <div
    className="flex flex-col bg-white rounded-(--radius) border p-7
                transition-all duration-300 hover:-translate-y-1 hover:border-(--primary)"
    style={{
      borderColor: "var(--border)",
      boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                   border-color 0.3s ease, box-shadow 0.3s ease`,
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 10px 28px rgba(140,46,124,0.10)"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.05)"; }}
  >
    {/* Badge */}
    <span className="inline-flex items-center gap-1.5 w-fit text-xs font-bold px-3 py-1 rounded-full mb-4"
      style={{ background: "var(--secondary)", color: "var(--primary-dark)" }}>
      <User size={11} strokeWidth={2.5} />
      {role}
    </span>

    <h3 className="text-xl font-bold mb-1" style={{ color: "var(--primary-dark)" }}>{name}</h3>
    <p className="text-sm mb-5 grow" style={{ color: "#777" }}>{desc}</p>

    {/* Phone CTA */}
    <a
      href={`tel:${phone.replace(/\s/g, "")}`}
      className="flex items-center justify-center gap-2 font-bold text-sm px-4 py-3
                 rounded-(--radius) border-2 transition-all duration-200"
      style={{ color: "var(--primary)", borderColor: "var(--secondary)" }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "var(--primary)";
        e.currentTarget.style.color = "white";
        e.currentTarget.style.borderColor = "var(--primary)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--primary)";
        e.currentTarget.style.borderColor = "var(--secondary)";
      }}
    >
      <Phone size={14} strokeWidth={2.5} />
      {phone}
    </a>
  </div>
);



/* ── Main Section ── */
const Contact = () => {
  const [headerRef, headerInView] = useInView(0.3);
  const [cardsRef, cardsInView] = useInView(0.1);

  return (
    <section
      id="contact"
      className="py-20 px-6"
      style={{ background: "var(--bg-light)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-12"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3"
            style={{ color: "var(--text-dark)" }}>
            Get In Touch
          </h2>
          <div className="h-1 w-16 rounded-full mx-auto"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }} />
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InfoCard inView={cardsInView} delay={0} />
          <LeadCard
            name="Shobhit Singh"
            role="Event Lead"
            desc="For technical queries & platform support"
            phone="+91 98973 01104"
            inView={cardsInView}
            delay={100}
          />
          <LeadCard
            name="Ayushman Ganeriwal"
            role="Event Lead"
            desc="For registration & logistics info"
            phone="+91 99844 33785"
            inView={cardsInView}
            delay={200}
          />
        </div>

        {/* Organizer strip */}
        <OrganizerStrip inView={cardsInView} delay={300} />
      </div>
    </section>
  );
};

export default Contact;