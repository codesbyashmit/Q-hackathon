import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sponsors from "./pages/Sponsors";
import { Suspense, lazy } from "react";
const GlobalCanvas = lazy(() => import("./components/GlobalCanvas"));

function App() {
  return (
    <HashRouter>
      <div className="relative min-h-screen bg-[#050505] font-sans">
                <Suspense fallback={<div className="absolute inset-0 bg-[#050505] -z-20" />}>
          <GlobalCanvas />
        </Suspense>

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