import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/logo.svg";

const navLinks = [
  { label: "Home", section: "home" },
  { label: "About", section: "about" },
  { label: "Tracks", section: "tracks" },
  { label: "Roadmap", section: "timeline-section" },
  { label: "FAQ", section: "faq" },
  { label: "Contact", section:"contact"}
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  useEffect(() => {
    if (location.pathname !== "/") return;

    const observers = [];
        navLinks.forEach(({ section }) => {
      if (section === "home") {
        const handleScroll = () => {
          if (window.scrollY < 300) setActiveSection("home");
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }

      const el = document.getElementById(section);
      if (el) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(section);
            }
          },
          { threshold: 0.4 } 
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);

  const scrollToSection = (sectionId) => {
    closeMenu();
    setActiveSection(sectionId);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (sectionId === "home") window.scrollTo({ top: 0, behavior: "smooth" });
        else document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      if (sectionId === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="relative z-10 flex items-center gap-2" onClick={() => scrollToSection("home")}>
            <img src={logo} className="h-8 sm:h-10 w-auto drop-shadow-sm" alt="Q-Hackathon" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/40 shadow-inner">
            {navLinks.map(({ label, section }) => {
              const isActive = activeSection === section && location.pathname === "/";
              return (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`relative px-5 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${
                    isActive ? "text-white" : "text-(--text-dark) hover:text-(--primary)"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-(--primary) rounded-full -z-10 shadow-md"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {label}
                </button>
              );
            })}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/sponsors" 
              className={`text-sm font-bold transition-colors ${location.pathname === '/sponsors' ? 'text-(--primary)' : 'text-(--text-dark) hover:text-(--primary)'}`}
              onClick={closeMenu}
            >
              Sponsors
            </Link>
            <a
              href="https://unstop.com/p/qhackathon-2026-quantum-university-roorkee-1663126"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-(--primary) text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(140,46,124,0.4)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Register
            </a>
          </div>

          {/*mobile menu */}
          <button
            className="md:hidden relative z-50 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-(--primary) rounded-full transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-(--primary) rounded-full transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-(--primary) rounded-full transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm z-50 bg-(--bg-light) shadow-2xl flex flex-col pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map(({ label, section }, i) => {
                const isActive = activeSection === section && location.pathname === "/";
                return (
                  <motion.button
                    key={section}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => scrollToSection(section)}
                    className={`text-left text-lg font-bold py-3 px-4 rounded-xl transition-colors ${
                      isActive ? "bg-(--primary)/10 text-(--primary)" : "text-(--text-dark)"
                    }`}
                  >
                    {label}
                  </motion.button>
                )
              })}
              
              <div className="h-px bg-(--border) my-4 w-full" />

              <Link
                to="/sponsors"
                className={`text-lg font-bold py-3 px-4 rounded-xl ${location.pathname === '/sponsors' ? 'text-(--primary)' : 'text-(--text-dark)'}`}
                onClick={closeMenu}
              >
                Sponsors
              </Link>

              <a
                href="https://unstop.com/p/qhackathon-2026-quantum-university-roorkee-1663126"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 text-center py-4 rounded-xl bg-(--primary) text-white font-black tracking-widest uppercase shadow-md"
              >
                Register Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;