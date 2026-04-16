import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const MOBILE_BREAKPOINT = 768;

export const usePerformanceMode = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();

    mediaQuery.addEventListener("change", updateIsMobile);
    window.addEventListener("resize", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);

  return {
    isMobile,
    shouldReduceMotion: Boolean(prefersReducedMotion) || isMobile,
  };
};
