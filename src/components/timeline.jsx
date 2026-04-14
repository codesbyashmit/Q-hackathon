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
      style={{ position: "relative" }}
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
          <h2 className="section-heading mb-4">
            Event Roadmap
          </h2>
          <div
            className="h-1.5 w-24 rounded-full mx-auto"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
        </motion.div>
        <div className="relative">
          <div 
            className="absolute top-0 bottom-0 left-7.25 md:left-1/2 md:-translate-x-1/2 w-1.5 rounded-full"
            style={{ background: "var(--border)" }}
          />
          
          {/*progressline*/}
          <motion.div 
            className="absolute top-0 bottom-0 left-7.25 md:left-1/2 md:-translate-x-1/2 w-1.5 rounded-full origin-top drop-shadow-[0_0_8px_rgba(140,46,124,0.6)]"
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
                className="relative flex flex-col md:flex-row items-start md:items-center"
              >
                {/* desktop zig-zag side */}
                {index % 2 === 0 ? (
                  <div className="hidden md:flex w-1/2 pr-12 justify-end">
                    <div className="w-full max-w-md text-right">
                      <span className="block mb-3 text-sm lg:text-base font-black uppercase tracking-widest text-(--primary)">
                        {evt.date}
                      </span>
                      <PipelineCard title={evt.title} description={evt.description} Icon={evt.Icon} />
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:block w-1/2" />
                )}

                {/*mobile date*/}
                <div className="md:hidden pl-16 mb-3">
                   <span className="text-sm font-black uppercase tracking-widest" style={{ color: "var(--primary)" }}>
                    {evt.date}
                  </span>
                </div>

                {/*center*/}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 shrink-0 w-8 h-8 rounded-full border-4 border-white shadow-md bg-(--primary) z-20 mt-1 md:mt-0" />

                <div className="pl-16 md:hidden w-full">
                  <PipelineCard title={evt.title} description={evt.description} Icon={evt.Icon} />
                </div>

                {/* desktop zig-zag opposite side */}
                {index % 2 !== 0 ? (
                  <div className="hidden md:flex w-1/2 pl-12 justify-start">
                    <div className="w-full max-w-md text-left">
                      <span className="block mb-3 text-sm lg:text-base font-black uppercase tracking-widest text-(--primary)">
                        {evt.date}
                      </span>
                      <PipelineCard title={evt.title} description={evt.description} Icon={evt.Icon} />
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:block w-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;