import { useState } from "react";
import { Brain, ShieldCheck, Link2, Leaf, Rocket } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const tracks = [
  {
    Icon: Brain,
    backKeyword: "AI",
    backTitle: "Intelligence",
    title: "AI for Impact",
    quote: "Computing with a conscience.",
    description: "Leverage Machine Learning and Neural Networks to solve pressing societal challenges.",
    tag: "Deep Tech",
  },
  {
    Icon: ShieldCheck,
    backKeyword: "SEC",
    backTitle: "Cybersecurity",
    title: "Cybersecurity",
    quote: "Secure the digital frontier.",
    description: "Defend the digital ecosystem with encryption, ethical hacking, and secure protocols.",
    tag: "Security",
  },
  {
    Icon: Link2,
    backKeyword: "WEB3",
    backTitle: "Economy",
    title: "Blockchain",
    quote: "Decentralize everything.",
    description: "Build decentralized apps (DApps) and smart contracts for a transparent future.",
    tag: "Web3",
  },
  {
    Icon: Leaf,
    backKeyword: "ECO",
    backTitle: "Sustainability",
    title: "Smart India",
    quote: "Innovate for tomorrow.",
    description: "Develop sustainable solutions for rural development, energy efficiency, and smart cities.",
    tag: "Sustainability",
  },
  {
    Icon: Rocket,
    backKeyword: "OPEN",
    backTitle: "Innovation",
    title: "Open Innovation",
    quote: "No limits, just logic.",
    description: "Have a unique idea? This track is for wildcards and groundbreaking, disruptive concepts.",
    tag: "Any Theme",
  },
];

const TrackCard = ({ Icon, title, description, tag, quote, backKeyword, backTitle, index }) => {
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
      className="w-full h-full min-h-[280px] sm:min-h-[300px] cursor-default"
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
          {/* backside */}
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
              <p className="font-bold text-lg sm:text-xl tracking-[0.2em] uppercase text-white shadow-sm">
                {backTitle}
              </p>
            </motion.div>
          </div>

          {/* frontside */}
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="absolute inset-0 flex flex-col items-start text-left p-5 sm:p-7 
                       rounded-(--radius) border border-(--border) overflow-hidden bg-white
                       hover:border-(--primary) transition-colors duration-300"
          >
            <div
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
            />

            <div className="flex items-center gap-4 mb-1">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl shrink-0"
                style={{ background: "var(--secondary)" }}
              >
                <Icon size={20} style={{ color: "var(--primary)" }} />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-(--text-dark)">
                {title}
              </h3>
            </div>

            <p className="text-sm font-semibold italic mb-3 mt-2" style={{ color: "var(--primary)" }}>
              "{quote}"
            </p>

            <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-1" style={{ color: "#555" }}>
              {description}
            </p>

            <span
              className="mt-auto text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full"
              style={{ color: "var(--primary)", background: "var(--secondary)" }}
            >
              {tag}
            </span>
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3" style={{ color: "var(--text-dark)" }}>
            Hackathon Tracks
          </h2>
          <p className="text-sm sm:text-base mb-4 font-medium" style={{ color: "#777" }}>
            Select a domain and build the future.
          </p>
          <div
            className="h-1 w-16 sm:w-24 rounded-full mx-auto"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
        </motion.div>

        {/* grid */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {tracks.map((track, i) => (
            <div 
              key={track.title} 
              className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] max-w-md"
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