import { motion as Motion } from "framer-motion";
import { Crown, Medal, Award, Building2, Users } from "lucide-react";
import { winnersData } from "../data/winnersData";

const rankIcons = {
  Winner: Crown,
  "1st Runner-Up": Medal,
  "2nd Runner-Up": Award,
};

const fireworks = [
  { left: "8%", top: "10%", delay: 0, color: "#ff5ca8", scale: 1 },
  { right: "12%", top: "12%", delay: 0.25, color: "#ffd44d", scale: 0.9 },
  { left: "44%", top: "2%", delay: 0.4, color: "#ffffff", scale: 0.8 },
];

const FireworkBurst = ({ color, delay, scale }) => (
  <Motion.div
    className="absolute"
    style={{ transformOrigin: "center" }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0.4, scale, 1.15],
      rotate: [0, 18, 32],
    }}
    transition={{
      duration: 2.2,
      delay,
      repeat: Infinity,
      repeatDelay: 1.6,
      ease: "easeOut",
    }}
  >
    <div
      className="absolute left-1/2 top-1/2 rounded-full"
      style={{
        width: 12,
        height: 12,
        marginLeft: -6,
        marginTop: -6,
        background: color,
        boxShadow: `0 0 16px ${color}, 0 0 30px ${color}`,
      }}
    />
    {Array.from({ length: 8 }).map((_, rayIndex) => (
      <span
        key={rayIndex}
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: 2,
          height: 34,
          marginLeft: -1,
          marginTop: -17,
          background: `linear-gradient(180deg, ${color}, transparent)`,
          transform: `rotate(${rayIndex * 45}deg) translateY(-18px)`,
          transformOrigin: "center 18px",
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    ))}
    {Array.from({ length: 6 }).map((_, sparkleIndex) => (
      <span
        key={sparkleIndex}
        className="absolute rounded-full"
        style={{
          width: 4 + (sparkleIndex % 2),
          height: 4 + (sparkleIndex % 2),
          background: sparkleIndex % 2 === 0 ? color : "#ffffff",
          left: `${50 + Math.cos((sparkleIndex / 6) * Math.PI * 2) * 24}%`,
          top: `${50 + Math.sin((sparkleIndex / 6) * Math.PI * 2) * 24}%`,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    ))}
  </Motion.div>
);

const WinnerCard = ({ winner, index, featured = false }) => {
  const RankIcon = rankIcons[winner.rank] ?? Award;
  return (
    <Motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: index * 0.15 }}
      className={`relative group rounded-2xl border border-(--border-soft) bg-(--bg-card-dark) overflow-hidden transition-colors duration-300 hover:border-(--primary) ${featured ? "p-6 sm:p-8" : "p-6"}`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 18% 6%, rgba(255, 221, 124, 0.18) 0%, transparent 54%), radial-gradient(circle at 84% 18%, rgba(245, 196, 0, 0.1) 0%, transparent 42%)`,
        }}
      />

      {featured && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-48" />
          <div
            className="absolute -inset-x-10 -top-8 h-28 blur-3xl opacity-70"
            style={{
              background: `linear-gradient(90deg, rgba(255, 244, 194, 0.08) 0%, rgba(245, 196, 0, 0.24) 50%, rgba(255, 207, 90, 0.1) 100%)`,
            }}
          />
          {fireworks.map((firework, fireworkIndex) => (
            <Motion.div
              key={`${winner.id}-firework-${fireworkIndex}`}
              className="absolute"
              style={{
                left: firework.left,
                top: firework.top,
                right: firework.right,
              }}
            >
              <FireworkBurst color={firework.color} delay={firework.delay} scale={firework.scale} />
            </Motion.div>
          ))}
        </div>
      )}

      <div className={`relative z-10 grid gap-6 ${featured ? "lg:grid-cols-[1.2fr_1fr] lg:items-center" : "grid-cols-1"}`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--border-soft) bg-(--bg-page) mb-4">
            <RankIcon size={16} style={{ color: winner.accent }} />
            <span className="text-xs font-black uppercase tracking-[0.14em] text-(--text-muted)">{winner.rank}</span>
          </div>

          <h3 className={`${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"} font-black tracking-tight text-(--text-light)`}>
            {winner.teamName}
          </h3>

          <div className="mt-3 flex items-center gap-2 text-sm sm:text-base text-(--text-muted)">
            <Building2 size={16} style={{ color: winner.accent }} />
            <span>{winner.institution}</span>
          </div>

          <div className="mt-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-(--text-muted) mb-3 inline-flex items-center gap-2">
              <Users size={14} style={{ color: winner.accent }} />
              Team Members
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {winner.members.map((member) => (
                <li
                  key={member}
                  className="px-3 py-2 rounded-xl border border-(--border-soft) bg-(--bg-page) text-sm font-semibold text-(--text-light)"
                >
                  {member}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`${featured ? "lg:pl-6" : ""}`}>
          <div className="relative rounded-2xl overflow-hidden border border-(--border-soft) bg-(--bg-page)">
            <img
              src={winner.image}
              alt={`${winner.teamName} group photo`}
              className={`w-full object-cover ${featured ? "h-64 sm:h-72" : "h-56 sm:h-64"}`}
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ background: `linear-gradient(90deg, ${winner.accent}, var(--primary))` }}
            />
          </div>
        </div>
      </div>
    </Motion.article>
  );
};

const Winners = () => {
  const featuredWinner = winnersData.find((winner) => winner.featured);
  const runnerUps = winnersData.filter((winner) => !winner.featured);

  return (
    <section
      id="winners"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background: "var(--bg-page-elevated)" }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="section-heading mb-4">Meet The Winners</h2>
          <p className="text-base sm:text-lg font-medium text-(--text-muted)">
            Celebrating the top teams from Q-Hackathon.
          </p>
          <div
            className="h-1.5 w-20 rounded-full mx-auto mt-6"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
        </Motion.div>

        {featuredWinner && <WinnerCard winner={featuredWinner} index={0} featured />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {runnerUps.map((winner, index) => (
            <WinnerCard key={winner.id} winner={winner} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Winners;