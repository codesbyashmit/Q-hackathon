import { Trophy, Medal, Award, Star } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const prizes = [
  {
    tier: "gold",
    Icon: Trophy,
    label: "Winner",
    amount: "₹7,000",
    perks: ["Winner's Trophy", "Merit Certificate"],
    accentColor: "#f5c400",
    bgGradient: "linear-gradient(135deg, #1a1500 0%, #332700 100%)",
    desktopOrder: "md:order-2",
    heightClass: "md:min-h-[380px]", 
  },
  {
    tier: "silver",
    Icon: Medal,
    label: "1st Runner-Up",
    amount: "₹5,000",
    perks: [" Trophy", "Merit Certificate"],
    accentColor: "#e5e7eb",
    bgGradient: "linear-gradient(135deg, #111111 0%, #222222 100%)",
    desktopOrder: "md:order-1",
    heightClass: "md:min-h-[340px]",
  },
  {
    tier: "bronze",
    Icon: Award,
    label: "2nd Runner-Up",
    amount: "₹3,000",
    perks: ["Trophy", "Merit Certificate"],
    accentColor: "#d97706", 
    bgGradient: "linear-gradient(135deg, #1a0f00 0%, #2a1800 100%)",
    desktopOrder: "md:order-3",
    heightClass: "md:min-h-[320px]",
  },
];

const PrizeCard = ({ tier, Icon, label, amount, perks, accentColor, bgGradient, desktopOrder, heightClass, index }) => {
  const isGold = tier === "gold";
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className={`w-full max-w-sm mx-auto flex ${desktopOrder}`}
      style={{ perspective: 1000, willChange: "transform", zIndex: isGold ? 20 : 10 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", background: bgGradient }}
        className={`relative w-full flex flex-col items-center text-center p-8 rounded-2xl border border-[#333] shadow-2xl ${heightClass} justify-center transition-colors duration-300 group`}
      >
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${accentColor}33 0%, transparent 70%)` }}
        />

        <div 
          className="absolute top-0 inset-x-8 h-1 rounded-b-md" 
          style={{ background: accentColor, boxShadow: `0 2px 10px ${accentColor}` }} 
        />

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          style={{ transform: "translateZ(40px)" }}
          className="mb-6 relative"
        >
          <div 
            className="absolute inset-0 blur-md opacity-50" 
            style={{ background: accentColor }} 
          />
          <Icon size={isGold ? 56 : 42} style={{ color: accentColor }} className="relative z-10 drop-shadow-lg" />
        </motion.div>

        <p 
          style={{ transform: "translateZ(30px)" }}
          className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] mb-2 text-gray-400"
        >
          {label}
        </p>

        <h3 
          style={{ transform: "translateZ(50px)", color: accentColor }}
          className={`font-black tracking-tight mb-6 drop-shadow-md ${isGold ? 'text-5xl sm:text-6xl' : 'text-4xl sm:text-5xl'}`}
        >
          {amount}
        </h3>

        <ul className="flex flex-col gap-3 w-full" style={{ transform: "translateZ(20px)" }}>
          {perks.map(text => (
            <li key={text} className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-gray-300">
              <Star size={12} style={{ color: accentColor }} />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

const Prizes = () => {
  return (
    <section
      id="prizes"
      className="relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6 text-center bg-transparent"
    >
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4" style={{ color: "var(--text-dark)" }}>
            The Prize Pool
          </h2>
          <div
            className="h-1.5 w-24 rounded-full mx-auto mb-6"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
          
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-(--border) bg-white shadow-sm">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Value</span>
            <span className="text-xl font-black text-(--primary)">₹15,000</span>
          </div>
        </motion.div>

        {/* Podium Layout */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-6 md:gap-4 lg:gap-8">
          {prizes.map((prize, i) => (
            <PrizeCard key={prize.tier} {...prize} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prizes;