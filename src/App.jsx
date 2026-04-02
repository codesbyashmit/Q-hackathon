import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sponsors from "./pages/Sponsors";
import GlobalCanvas from "./components/GlobalCanvas"; 

function App() {
  return (
    <HashRouter>
      <div className="relative min-h-screen bg-transparent font-sans">
                <GlobalCanvas />
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