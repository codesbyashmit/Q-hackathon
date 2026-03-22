import logo from "../assets/qhackathon-name.svg";
import { Link } from "react-router-dom";

const exploreLinks = [
  { name: "Home", to: "/" },
  { name: "About", section: "about" },
  { name: "Tracks", section: "tracks" },
  { name: "Roadmap", section: "timeline-section" },
  { name: "FAQs", section: "faq" },
];

const engageLinks = [
  { name: "Register Now", to: "https://bit.ly/4st6atF" },
  { name: "Sponsor Us", to: "/sponsors" }
  
];

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-glow-line"></div>

      <div className="container footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link">
            <img src={logo} className="footer-logo-img" />
          </Link>

          <p>
            Empowering the next generation of innovators through code,
            collaboration, and creativity.
          </p>

          <div className="social-links">
            <a href="https://www.instagram.com/qu_codex/" className="social-icon">IG</a>
            <a href="https://www.linkedin.com/company/qucodex/" className="social-icon">IN</a>
            <a href="https://www.qucodex.com" className="social-icon">X</a>
          </div>
        </div>

        {/* Explore */}
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            {exploreLinks.map((link, i) => (
              <li key={i}>
                {link.to ? (
  <Link to={link.to}>{link.name}</Link>
) : (
  <button
    onClick={() => {
      const el = document.getElementById(link.section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }}
    style={{ background: "none", border: "none", cursor: "pointer" }}
  >
    {link.name}
  </button>
)}
              </li>
            ))}
          </ul>
        </div>

        {/* Engage */}
        <div className="footer-links">
          <h4>Engage</h4>
          <ul>
            {engageLinks.map((link, i) => (
              <li key={i}>
                {link.to.startsWith("http") ? (
                  <a href={link.to} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                ) : (
                  <Link to={link.to}>
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="container bottom-flex">
          <p>
            © 2026 CodeX Club. Built with{" "}
            <span className="heart">♥</span>
          </p>
          <p className="footer-location">📍 Quantum University</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;