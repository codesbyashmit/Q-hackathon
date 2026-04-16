import { Download, Mail } from "lucide-react";
import { motion } from "framer-motion";

const SponsorCTA = () => {
  const handleDownloadBrochure = (e) => {
    e.preventDefault();
    window.open("https://drive.google.com/file/d/1nZfTdO8etlti3NfCVrHc0nu5bReZBJME/view?usp=drivesdk", "_blank");
  };
  return (
    <section id="sponsor-cta" className="py-24 px-4 sm:px-6 bg-(--bg-page-elevated) relative overflow-hidden">
      {/*background glow*/}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-(--primary) opacity-20 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-(--border-soft) bg-(--bg-card-dark) backdrop-blur-xl text-center px-6 py-16 sm:px-16 shadow-2xl relative overflow-hidden"
        >
          {/*gradient accent*/}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-(--primary-dark) via-(--primary) to-(--primary-dark)" />

          <h2 className="section-heading mb-5">
            Partner With Us
          </h2>
          
          <p className="text-base sm:text-lg leading-relaxed mx-auto max-w-2xl text-(--text-muted) mb-10 font-medium">
            We are currently looking for visionary companies to help make Q-Hackathon 2026 a reality. Claim your spot and empower the next generation of tech leaders.
          </p>

          {/*button group*/}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            {/*download button*/}
            <button
              onClick={handleDownloadBrochure}
              className="btn-ui btn-ui-primary group w-full sm:w-auto"
            >
              <Download size={18} strokeWidth={2.5} className="group-hover:-translate-y-1 transition-transform duration-300" />
              Download Brochure
            </button>

            {/*secondary contact*/}
            <a
              href="mailto:codex.club@quantumeducation.in"
              className="btn-ui btn-ui-outline group w-full sm:w-auto"
            >
              <Mail size={18} strokeWidth={2.5} className="group-hover:scale-110 transition-transform duration-300" />
              Contact Us
            </a>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorCTA;