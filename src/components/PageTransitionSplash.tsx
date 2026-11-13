import { useEffect, useState, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

export function PageTransitionSplash() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const previousPathRef = useRef<string | null>(null);

  // Splash active on opening any page AND on subsequent page navigation
  const [active, setActive] = useState(true);

  // Trigger branded text splash on initial open and route transitions
  useEffect(() => {
    setActive(true);
    const duration = previousPathRef.current === null ? 900 : 650;
    const timer = window.setTimeout(() => {
      setActive(false);
    }, duration);
    previousPathRef.current = currentPath;

    return () => window.clearTimeout(timer);
  }, [currentPath]);

  // Lock background scroll during splash to prevent content jumps or bleed-through
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="transwagon-branded-text-splash"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#000000] text-white overflow-hidden select-none touch-none w-screen h-screen h-[100dvh]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="TRANSWAGON Transition"
        >
          {/* Subtle Monochrome Vignette */}
          <div className="absolute inset-0 bg-radial from-zinc-900/40 to-black pointer-events-none" />

          {/* Centered Branded Stencil & Typography */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto"
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.03, y: -6 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src="/images/transwagon-truck-white.png"
              alt="TRANSWAGON"
              className="w-16 sm:w-20 md:w-24 h-auto object-contain mb-4 filter drop-shadow(0 4px 18px rgba(0, 0, 0, 0.8))"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.05 }}
            />
            <motion.h1
              className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white drop-shadow-2xl"
              initial={{ opacity: 0, letterSpacing: "0.06em" }}
              animate={{ opacity: 1, letterSpacing: "-0.01em" }}
              transition={{ duration: 0.48, delay: 0.08 }}
            >
              TRANSWAGON
            </motion.h1>
            <motion.p
              className="mt-2.5 text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.24em] text-zinc-300 max-w-md mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
            >
              QUALITY COACH BUILDERS &amp; GENERAL FABRICATORS
            </motion.p>
            <motion.div
              className="w-12 sm:w-16 h-[2px] bg-white/80 mt-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.22 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
