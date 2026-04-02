import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.svg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const scrollToTop = () => {
    closeMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    closeMenu();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "About", section: "about" },
    { label: "Tracks", section: "tracks" },
    { label: "Roadmap", section: "timeline-section" },
    { label: "FAQ", section: "faq" },
  ];

  return (
    <>
      <header
        className="navbar"
        style={{
          transition: "box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="container">

          {/* Logo */}
          <Link to="/" className="logo" onClick={scrollToTop}>
            <img src={logo} className="nav-logo" alt="Q-Hackathon" />
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-links hidden-mobile">
            <div className="page-links">
              <Link to="/" className="nav-item" onClick={scrollToTop}>Home</Link>
              {navLinks.map(({ label, section }) => (
                <button
                  key={section}
                  className="nav-item nav-btn-link"
                  onClick={() => scrollToSection(section)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="action-links">
              <Link to="/sponsors" className="nav-item external-link" onClick={scrollToTop}>
                Sponsors
              </Link>
              <a
                href="https://bit.ly/4st6atF"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-nav"
              >
                Register Now
              </a>
            </div>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
          >
            <span className="bar" style={{
              display: "block", width: "24px", height: "2px",
              background: "var(--primary)", borderRadius: "2px", marginBottom: "5px",
              transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }} />
            <span className="bar" style={{
              display: "block", width: "24px", height: "2px",
              background: "var(--primary)", borderRadius: "2px", marginBottom: "5px",
              transition: "opacity 0.2s ease",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span className="bar" style={{
              display: "block", width: "24px", height: "2px",
              background: "var(--primary)", borderRadius: "2px",
              transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }} />
          </button>

        </div>
      </header>

      {/*mobile menu backgrond*/}
      <div
        onClick={closeMenu}
        style={{
          position: "fixed", inset: 0, zIndex: 40,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(3px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/*hamburger menu*/}
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(80vw, 300px)",
          zIndex: 50,
          background: "var(--bg-light)",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
          display: "flex", flexDirection: "column",
          padding: "80px 28px 36px",
          gap: "8px",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/*close button*/}
        <button
          onClick={closeMenu}
          style={{
            position: "absolute", top: "20px", right: "20px",
            background: "none", border: "none", cursor: "pointer",
            fontSize: "1.4rem", color: "var(--text-dark)", lineHeight: 1,
          }}
          aria-label="Close menu"
        >
          ✕
        </button>

        {/*home*/}
        <Link
          to="/"
          className="nav-item"
          onClick={scrollToTop}
          style={drawerLinkStyle}
        >
          Home
        </Link>

        {/*section link*/}
        {navLinks.map(({ label, section }, i) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            style={{
              ...drawerLinkStyle,
              background: "none", border: "none", cursor: "pointer",
              textAlign: "left", fontFamily: "inherit",
              // Stagger fade-in when drawer opens
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateX(0)" : "translateX(20px)",
              transition: `opacity 0.35s ease ${80 + i * 50}ms, transform 0.35s ease ${80 + i * 50}ms`,
            }}
          >
            {label}
          </button>
        ))}
        <div style={{ height: "1px", background: "var(--border)", margin: "8px 0" }} />

        {/*sponsors*/}
        <Link
          to="/sponsors"
          className="nav-item external-link"
          onClick={scrollToTop}
          style={drawerLinkStyle}
        >
          Sponsors
        </Link>

        {/*register*/}
        <a
          href="https://bit.ly/4st6atF"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "8px",
            display: "block",
            textAlign: "center",
            padding: "12px 0",
            borderRadius: "var(--radius)",
            background: "var(--primary)",
            color: "white",
            fontWeight: 700,
            fontSize: "0.95rem",
            textDecoration: "none",
          }}
        >
          Register Now
        </a>
      </div>
    </>
  );
}

const drawerLinkStyle = {
  display: "block",
  padding: "10px 0",
  fontSize: "1rem",
  fontWeight: 600,
  color: "var(--text-dark)",
  textDecoration: "none",
  borderBottom: "1px solid var(--border)",
};

export default Navbar;