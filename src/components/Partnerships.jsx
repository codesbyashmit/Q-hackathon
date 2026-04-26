import { Store, Handshake, Check } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const partners = [
  {
    Icon: Store,
    title: "Stall Partner",
    price: "₹2,000 – ₹5,000",
    desc: "Perfect for food vendors or local startups looking for direct engagement with 300+ attendees.",
    perks: [
      "Dedicated stall space at the venue",
      "Opportunity to sell products/food",
      "Logo mention on the website",
    ],
    highlight: false,
    cta: "Apply for a Stall",
    color: "#e5e7eb", 
    glow: "rgba(255,255,255,0.05)"
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
    color: "#e51a80", 
    glow: "rgba(229, 26, 128, 0.15)"
  },
];

const PartnerBox = ({ partner, index }) => {
  const { Icon, title, price, desc, perks, highlight, cta, color, glow } = partner;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="w-full h-full flex"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative flex flex-col w-full rounded-2xl bg-(--bg-card-dark) border p-8 transition-colors duration-300 group
                   ${highlight ? 'border-(--border-soft) hover:border-(--primary)' : 'border-(--border-soft) hover:border-(--text-muted)'}`}
      >
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl"
          style={{ background: `radial-gradient(circle at center, ${glow} 0%, transparent 80%)` }}
        />
        {highlight && (
          <div 
            className="absolute top-0 inset-x-8 h-1 rounded-b-md opacity-80 group-hover:opacity-100 transition-opacity" 
            style={{ background: color, boxShadow: `0 2px 15px ${color}` }} 
          />
        )}

        <div style={{ transform: "translateZ(30px)" }} className="flex flex-col h-full relative z-10">
          
          <div className="flex items-center justify-between mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-sm"
              style={{ 
                background: highlight ? "var(--primary)" : "var(--bg-light)", 
                border: `1px solid ${highlight ? "var(--primary-dark)" : "var(--border-soft)"}` 
              }}
            >
              <Icon size={24} strokeWidth={2.5} color={highlight ? "#ffffff" : "var(--primary)"} />
            </div>
            
            <span
              className="text-xs font-bold px-4 py-2 rounded-full border"
              style={{ 
                background: highlight ? `${color}20` : "var(--bg-page)", 
                color: highlight ? color : "var(--text-muted)",
                borderColor: highlight ? `${color}40` : "var(--border-soft)"
              }}
            >
              {price}
            </span>
          </div>

          <h3 className="text-2xl font-black mb-3 text-(--text-heading) tracking-tight">
            {title}
          </h3>

          <p className="text-sm leading-relaxed mb-6 text-(--text-muted)">
            {desc}
          </p>
          <div className="w-full h-px bg-(--border-soft) mb-6" />
          <ul className="flex flex-col gap-3 mb-8 grow">
            {perks.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-(--text-body) font-medium">
                <div className="mt-0.5 shrink-0">
                  <Check size={16} strokeWidth={3} color={highlight ? color : "var(--primary)"} />
                </div>
                {p}
              </li>
            ))}
          </ul>
          
          <a
            href="https://drive.google.com/file/d/1nZfTdO8etlti3NfCVrHc0nu5bReZBJME/view?usp=drivesdk"
            target="_blank"
            rel="noreferrer"
            className={`btn-ui block w-full text-center text-sm py-3.5 rounded-xl mt-auto ${highlight ? "btn-ui-primary" : "btn-ui-outline"}`}
            style={highlight ? { borderColor: "var(--primary)" } : { borderColor: "var(--border-soft)" }}
            onMouseEnter={e => {
              if (highlight) {
                e.currentTarget.style.background  = "var(--primary-dark)";
                e.currentTarget.style.borderColor = "var(--primary-dark)";
                e.currentTarget.style.boxShadow   = `0 4px 20px ${glow}`;
                e.currentTarget.style.color       = "#ffffff";
              } else {
                e.currentTarget.style.background  = "var(--btn-outline-hover-bg)";
                e.currentTarget.style.borderColor = "var(--text-muted)";
              }
            }}
            onMouseLeave={e => {
              if (highlight) {
                e.currentTarget.style.background  = "var(--primary)";
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.boxShadow   = "none";
                e.currentTarget.style.color       = "#ffffff";
              } else {
                e.currentTarget.style.background  = "var(--btn-outline-bg)";
                e.currentTarget.style.borderColor = "var(--border-soft)";
              }
            }}
          >
            {cta}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Partnerships = () => {
  return (
    <section id="partnerships" className="py-20 sm:py-24 px-4 sm:px-6 relative z-10 bg-(--bg-page-elevated)">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">
            More Ways to Partner
          </h2>
          <div
            className="h-1 w-16 rounded-full mx-auto"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {partners.map((partner, i) => (
            <PartnerBox key={partner.title} partner={partner} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partnerships;