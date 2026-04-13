import { motion } from "framer-motion";

const partners = [
  { id: 1, name: "Unstop", logoUrl: "/sponsors/unstop.png" },
  { id: 2, name: ".xyz", logoUrl: "/sponsors/xyz.png" },
];

const Partners = () => {
  return (
    <section 
      id="partners" 
      className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ 
        background: "rgba(5, 5, 5, 0.88)", 
        backdropFilter: "blur(24px)", 
        WebkitBackdropFilter: "blur(24px)" 
      }}
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Our Partners
          </h2>
          <p className="text-base sm:text-lg font-medium text-gray-400">
            Proudly collaborating with amazing organizations
          </p>
          <div
            className="h-1.5 w-16 rounded-full mx-auto mt-6"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
        </motion.div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="w-full sm:w-1/2 max-w-sm flex flex-col items-center justify-center p-12 sm:p-16 rounded-2xl border border-white/10 bg-white/5 shadow-2xl"
            >
              <img 
                src={partner.logoUrl} 
                alt={`${partner.name} Logo`} 
                className="h-16 md:h-20 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Partners;