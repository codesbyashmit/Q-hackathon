import { useState } from "react";
import { Brain, ShieldCheck, Link2, Leaf, Rocket } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const tracks = [
  {
    Icon: Brain,
    backKeyword: "AI",
    backTitle: "Intelligence",
    title: "AI for Real-World Impact",
    quote: "Intelligence that solves, not just predicts.",
    description: "Build AI systems that tackle real problems in healthcare, agriculture, education, finance, or public services. Focus on automation, prediction, and decision support.",
    tags: ["AI", "Machine Learning", "Neural Networks"],
  },
  {
    Icon: ShieldCheck,
    backKeyword: "SEC",
    backTitle: "Cybersecurity",
    title: "Cybersecurity & Digital Safety",
    quote: "Secure what matters.",
    description: "Develop solutions to protect systems and users from cyber threats. Work on threat detection, authentication, vulnerability analysis, and data protection across web, mobile, and cloud.",
    tags: ["Cybersecurity", "Ethical Hacking", "Encryption"],
  },
  {
    Icon: Link2,
    backKeyword: "WEB3",
    backTitle: "Economy",
    title: "Blockchain & Digital Economy",
    quote: "Trust through decentralization.",
    description: "Create blockchain-based systems that improve transparency and efficiency. Build DApps, smart contracts, or decentralized financial and record systems.",
    tags: ["Blockchain", "Web3", "Smart Contracts"],
  },
  {
    Icon: Leaf,
    backKeyword: "ECO",
    backTitle: "Sustainability",
    title: "Smart India & Sustainable Tech",
    quote: "Engineering solutions for scale.",
    description: "Design solutions for large-scale challenges in India, including smart infrastructure, environmental monitoring, energy, and agriculture. Leverage Web2, IoT, or data-driven systems.",
    tags: ["Sustainability", "IoT", "Web2", "Smart Systems"],
  },
  {
    Icon: Rocket,
    backKeyword: "OPEN",
    backTitle: "Innovation",
    title: "Open Innovation Track",
    quote: "No theme. No excuses.",
    description: "Bring any original idea with strong technical depth and real-world value. Clear problem, solid execution—that’s all that matters.",
    tags: ["Any Domain", "Any Technology"],
  },
];

const TrackCard = ({ Icon, title, description, tags, quote, backKeyword, backTitle, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      style={{ perspective: 1000, willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsFlipped(true)}
      className="w-full h-full min-h-75 sm:min-h-80 cursor-default"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
        className="relative w-full h-full"
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 0 : 180 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 15 }}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          className="relative w-full h-full shadow-lg rounded-(--radius)"
        >
          {/* Backside */}
          <div
            style={{ 
              backfaceVisibility: "hidden", 
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, #111111 0%, var(--primary-dark) 150%)" 
            }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 
                       rounded-(--radius) border border-[#333] overflow-hidden group"
          >
            <span 
              className="absolute inset-0 flex items-center justify-center text-7xl sm:text-8xl font-black pointer-events-none select-none" 
              style={{ color: "var(--primary)", opacity: 0.15 }}
            >
              {backKeyword}
            </span>
            
            <motion.div 
              animate={{ y: [0, -5, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
              style={{ willChange: "transform", transform: "translateZ(0)" }}
              className="z-10 flex flex-col items-center"
            >
              <Icon size={42} style={{ color: "var(--secondary)" }} className="mb-4 opacity-90" />
              <p className="font-bold text-lg sm:text-xl tracking-[0.2em] uppercase text-(--text-inverse) shadow-sm text-center">
                {backTitle}
              </p>
            </motion.div>
          </div>

          {/* Frontside */}
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="absolute inset-0 flex flex-col items-start text-left p-5 sm:p-7 
                       rounded-(--radius) border border-(--border) overflow-hidden bg-(--bg-page-elevated)
                       hover:border-(--primary) transition-colors duration-300"
          >
            <div
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
            />

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-2">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl shrink-0"
                style={{ background: "var(--secondary)" }}
              >
                <Icon size={20} style={{ color: "var(--primary)" }} />
              </div>
              <h3 className="text-[17px] sm:text-lg font-extrabold text-(--text-light) leading-tight">
                {title}
              </h3>
            </div>

            <p className="text-[13px] sm:text-sm font-semibold italic mb-3 mt-1" style={{ color: "var(--primary)" }}>
              "{quote}"
            </p>

            <p className="text-[13px] sm:text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-muted)" }}>
              {description}
            </p>
            <div className="mt-auto flex flex-wrap gap-1.5 sm:gap-2 w-full">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full"
                  style={{ color: "var(--primary)", background: "var(--secondary)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Tracks = () => {
  return (
    <section
      id="tracks"
      className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="section-heading mb-3">
            Hackathon Tracks
          </h2>
          <p className="text-sm sm:text-base mb-4 font-medium" style={{ color: "var(--text-muted)" }}>
            Select a domain and build the future.
          </p>
          <div
            className="h-1 w-16 sm:w-24 rounded-full mx-auto"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 place-items-center">
          {tracks.map((track, i) => (
            <div
              key={track.title}
              className={`w-full max-w-md h-full lg:col-span-2 ${
                i === 3 ? "lg:col-start-2" : i === 4 ? "lg:col-start-4" : ""
              }`}
            >
              <TrackCard {...track} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;