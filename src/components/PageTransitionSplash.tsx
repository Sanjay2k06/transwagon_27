import { useEffect, useState, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

export function PageTransitionSplash() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const previousPathRef = useRef<string | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Skip on initial mount so home splash / initial page can display naturally
    if (previousPathRef.current === null) {
      previousPathRef.current = currentPath;
      return;
    }

    if (previousPathRef.current !== currentPath) {
      previousPathRef.current = currentPath;
      setAnimating(true);
      const timer = window.setTimeout(() => {
        setAnimating(false);
      }, 550);
      return () => window.clearTimeout(timer);
    }
  }, [currentPath]);

  return (
    <AnimatePresence>
      {animating && (
        <motion.div
          key={currentPath}
          className="fixed inset-0 z-[999] pointer-events-none flex flex-col items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          aria-hidden="true"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-radial from-zinc-900/60 to-black pointer-events-none" />

          {/* Type Variant Stencil Expansion Animation */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center text-center px-4"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: [0.92, 1, 1.08], opacity: [0, 1, 1] }}
            exit={{ scale: 1.15, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src="/images/transwagon-truck-white.png"
              alt="TRANSWAGON"
              className="w-16 sm:w-20 h-auto object-contain mb-4 filter drop-shadow(0 4px 12px rgba(0,0,0,0.5))"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            />
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              TRANSWAGON
            </h1>
            <p className="mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-zinc-400">
              QUALITY COACH BUILDERS &amp; GENERAL FABRICATORS
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
