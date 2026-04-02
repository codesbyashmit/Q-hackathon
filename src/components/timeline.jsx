import { useRef } from "react";
import { ClipboardList, ClipboardX, PartyPopper, ScanSearch, Trophy } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

const events = [
  {
    date: "April 01, 2026",
    title: "Registration Opens",
    description: "Secure your spot and start forming your dream team.",
    Icon: ClipboardList,
  },
  {
    date: "April 28, 2026",
    title: "Registration Closes",
    description: "Final call for applications. No entries accepted after midnight.",
    Icon: ClipboardX,
  },
  {
    date: "May 01, 09:00 AM",
    title: "Opening Ceremony",
    description: "Keynote speeches, track reveals, and the 36-hour hack begins!",
    Icon: PartyPopper,
  },
  {
    date: "May 02, 10:00 AM",
    title: "Mid Evaluation",
    description: "Mentors will review your progress and provide technical guidance.",
    Icon: ScanSearch,
  },
  {
    date: "May 02, 09:00 PM",
    title: "Final Presentation",
    description: "Pitch your solution to our panel of industry experts.",
    Icon: Trophy,
  },
];

const PipelineCard = ({ title, description, Icon }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  return (
    <motion.div
      style={{ perspective: 1000, willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="w-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-(--radius) border border-(--border) bg-white p-6 sm:p-8 shadow-sm hover:border-(--primary) hover:shadow-lg transition-colors duration-300"
      >
        <div className="flex items-start gap-4" style={{ transform: "translateZ(30px)" }}>
          <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-(--secondary)">
            <Icon size={24} style={{ color: "var(--primary)" }} strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-(--text-dark) mb-2">
              {title}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#666" }}>
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Timeline = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20, restDelta: 0.001 });

  return (
    <section
      id="timeline-section"
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 bg-transparent overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4" style={{ color: "var(--text-dark)" }}>
            Event Roadmap
          </h2>
          <div
            className="h-1.5 w-24 rounded-full mx-auto"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
        </motion.div>
        <div className="relative">
          <div 
            className="absolute top-0 bottom-0 left-[29px] md:left-[calc(30%-3px)] w-1.5 rounded-full"
            style={{ background: "var(--border)" }}
          />
          
          {/*progressline*/}
          <motion.div 
            className="absolute top-0 bottom-0 left-[29px] md:left-[calc(30%-3px)] w-1.5 rounded-full origin-top drop-shadow-[0_0_8px_rgba(140,46,124,0.6)]"
            style={{ background: "var(--primary)", scaleY }}
          />

          <div className="relative z-10 flex flex-col gap-12 sm:gap-16">
            {events.map((evt, index) => (
              <motion.div
                key={evt.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col md:flex-row items-start"
              >
                {/*mobile date*/}
                <div className="md:hidden pl-16 mb-3">
                   <span className="text-sm font-black uppercase tracking-widest" style={{ color: "var(--primary)" }}>
                    {evt.date}
                  </span>
                </div>

                {/*leftside*/}
                <div className="hidden md:flex w-[30%] pr-10 pt-4 justify-end text-right">
                  <span className="text-lg lg:text-xl font-black uppercase tracking-widest text-(--primary)">
                    {evt.date.split(',')[0]} <br/> 
                    <span className="text-sm opacity-60 text-(--text-dark)">{evt.date.split(',')[1]}</span>
                  </span>
                </div>

                {/*center*/}
                <div className="absolute left-4 md:static md:flex shrink-0 w-8 h-8 rounded-full border-4 border-white shadow-md bg-(--primary) z-20 mt-1 md:mt-4 md:-ml-4" />

                <div className="pl-16 md:pl-10 w-full md:w-[70%]">
                  <PipelineCard title={evt.title} description={evt.description} Icon={evt.Icon} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;