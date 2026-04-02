import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sponsors from "./pages/Sponsors";
import GlobalCanvas from "./components/GlobalCanvas"; // Import our new 3D background

function App() {
  return (
    <HashRouter>
      {/* Main Wrapper: Needs to be relative and transparent so the 3D canvas shows through */}
      <div className="relative min-h-screen bg-transparent font-sans">
        
        {/* The persistent 3D scrollytelling background layer */}
        <GlobalCanvas />
        
        {/* The Foreground: Where your actual pages load. 
            z-10 ensures your buttons and text are clickable and sit ABOVE the 3D canvas */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sponsors" element={<Sponsors />} />
          </Routes>
        </div>

      </div>
    </HashRouter>
  );
}

export default App;