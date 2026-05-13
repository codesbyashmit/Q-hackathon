import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import About from "../components/about";
import Tracks from "../components/tracks";
import Timeline from "../components/timeline";
import Prizes from "../components/prizes";
import Winners from "../components/Winners";
import FAQ from "../components/faq";
import Contact from "../components/contact";
import OrganizerStrip from "../components/organizerStrip";
import Footer from "../components/footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Winners />
      <About />
      <Tracks />
      <Timeline />
      <Prizes />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;