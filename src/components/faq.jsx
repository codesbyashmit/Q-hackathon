import { useState } from "react";
import { Plus, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  { question: "Who can participate?", answer: "Students from invited colleges and universities can participate. Only undergraduate and postgraduate students are eligible." },
  { question: "What is the registration fee?", answer: "₹500 per team. Additional ₹250–₹300 per participant for accommodation and food (optional)." },
  { question: "What is the team size?", answer: "Each team must have 4 to 6 members." },
  { question: "Is the hackathon online or offline?", answer: "It is a 36-hour offline hackathon on-campus at Quantum University." },
  { question: "What are the hackathon tracks?", answer: "AI, Cybersecurity, Blockchain, Smart India & Sustainability, and Open Innovation." },
  { question: "What is the duration?", answer: "36 hours of continuous development including evaluation rounds and final presentations." },
  { question: "How are projects evaluated?", answer: "Projects go through internal shortlisting followed by final jury evaluation based on innovation, technical depth, and usability." },
  { question: "Is accommodation available?", answer: "Yes, separate accommodation for boys and girls is available with ID verification and monitoring." },
  { question: "What are the prizes?", answer: "Winners and runners-up receive trophies, certificates, and cash prizes from a ₹15,000–₹25,000 pool." },
];

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={() => setIsOpen(!isOpen)}
      className={`cursor-pointer border rounded-2xl p-5 sm:p-7 transition-colors duration-400 ease-in-out ${
        isOpen 
          ? "bg-(--primary) border-(--primary) shadow-[0_10px_30px_rgba(140,46,124,0.3)]" 
          : "bg-white border-(--border) hover:border-(--primary) shadow-sm hover:shadow-md"
      }`}
    >
      <motion.div layout className="flex justify-between items-center gap-4">
        <motion.h3 
          layout="position"
          className={`font-bold text-base sm:text-lg transition-colors duration-400 ${
            isOpen ? "text-white" : "text-(--text-dark)"
          }`}
        >
          {question}
        </motion.h3>
        
        <motion.div
          layout="position"
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors duration-400 ${
            isOpen ? "bg-white/20 text-white" : "bg-(--secondary) text-(--primary)"
          }`}
        >
          <Plus size={20} strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ opacity: { duration: 0.2 }, height: { type: "spring", stiffness: 100, damping: 15 } }}
            className="overflow-hidden"
          >
            <motion.p 
              layout="position"
              className="mt-4 text-sm sm:text-base leading-relaxed text-white/90"
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <section
      id="faq"
      className="py-20 sm:py-32 px-4 sm:px-6 relative bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        
        {/*left side*/}
        <div className="w-full lg:w-[40%] lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4" style={{ color: "var(--text-dark)" }}>
              Got<br />Questions?
            </h2>
            <div
              className="h-1.5 w-20 rounded-full mb-6"
              style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
            />
            <p className="text-base sm:text-lg mb-8" style={{ color: "#666" }}>
              Everything you need to know about participating in Q-Hackathon 2026. Can't find the answer you're looking for?
            </p>

            {/*supportbox*/}
            <div className="p-6 rounded-2xl border border-(--border) bg-white shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--secondary)" }}>
                <Mail size={24} style={{ color: "var(--primary)" }} />
              </div>
              <div>
                <h4 className="font-bold text-(--text-dark) mb-1">Email Support</h4>
                <p className="text-sm text-gray-500 mb-2">Our team will contact you back as soon as possible.</p>
                <a 
                  href="mailto:codexclub@email.com" 
                  className="text-sm font-bold hover:underline transition-all"
                  style={{ color: "var(--primary)" }}
                >
                  codexclub@email.com &rarr;
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/*right side*/}
        <div className="w-full lg:w-[60%] flex flex-col gap-4">
          {faqData.map((item, i) => (
            <FAQItem key={item.question} {...item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;