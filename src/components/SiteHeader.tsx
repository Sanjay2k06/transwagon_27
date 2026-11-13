import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, MessageCircle, Instagram, ArrowUpRight } from "lucide-react";

const navItems = [
  { number: "01", label: "Home", href: "/" },
  { number: "02", label: "About", href: "/about" },
  { number: "03", label: "Services", href: "/services" },
  { number: "04", label: "Gallery", href: "/gallery" },
  { number: "05", label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* SINGLE COMPACT WHITE STICKY NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 w-full z-40 h-16 transition-all duration-200 border-b ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-border shadow-sm shadow-black/5"
            : "bg-white border-border/80"
        }`}
      >
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* LEFT: TRANSWAGON Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 select-none no-underline group shrink-0"
            aria-label="TRANSWAGON Home"
          >
            <img
              src="/images/transwagon-truck-dark.png"
              alt="TRANSWAGON"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display text-sm font-black tracking-tight uppercase text-black leading-none">
                TRANSWAGON
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase hidden sm:inline-block mt-0.5">
                Coach Builders · Bangalore
              </span>
            </div>
          </Link>

          {/* CENTER: Intentionally empty to keep navbar clean with no duplicate center links */}
          <div className="flex-1" />

          {/* RIGHT: Phone Button + Single MENU Button */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+918197810561"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-700 hover:text-black border border-zinc-200 px-3 py-1.5 rounded transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-black" />
              <span>8197810561</span>
            </a>

            {/* Single Black MENU Button with White Icon */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 bg-black text-white hover:bg-zinc-800 px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-sm transition-all active:scale-95 border border-black"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              {menuOpen ? (
                <X className="w-4 h-4 text-white stroke-[2.5]" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4 text-white stroke-[2.5]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* FULL-HEIGHT RIGHT-SIDE SLIDE-OUT NAVIGATION PANEL */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              aria-hidden="true"
            />

            {/* Slide-out Menu Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white text-zinc-950 z-50 shadow-2xl flex flex-col justify-between p-6 sm:p-12 overflow-y-auto border-l border-zinc-200"
              aria-label="Site Navigation Panel"
            >
              {/* Drawer Top Header with Close Button */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/transwagon-truck-dark.png"
                    alt="TRANSWAGON"
                    className="h-7 w-auto object-contain"
                  />
                  <span className="font-display text-sm font-black uppercase text-black tracking-tight">
                    TRANSWAGON
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded bg-zinc-100 hover:bg-zinc-200 text-black transition-colors cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5 text-black stroke-[2.2]" />
                </button>
              </div>

              {/* All Five Links Arranged Vertically */}
              <div className="py-8">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 block mb-6">
                  Navigation // Direct Links
                </span>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive = currentPath === item.href;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`group flex items-center justify-between py-3.5 border-b border-zinc-100 hover:border-black transition-colors ${
                          isActive ? "border-black font-black" : ""
                        }`}
                      >
                        <div className="flex items-baseline gap-3">
                          <span
                            className={`font-mono text-xs transition-colors ${
                              isActive
                                ? "text-black font-bold"
                                : "text-zinc-400 group-hover:text-black"
                            }`}
                          >
                            {item.number}
                          </span>
                          <span
                            className={`font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight group-hover:translate-x-1 transition-transform ${
                              isActive ? "text-black" : "text-zinc-900 group-hover:text-black"
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                        <ArrowUpRight
                          className={`w-5 h-5 transition-all ${
                            isActive
                              ? "text-black"
                              : "text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Direct Contact Channels at Bottom */}
              <div className="pt-6 border-t border-zinc-100 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                  Contact &amp; Workshop
                </span>
                <a
                  href="tel:+918197810561"
                  className="flex items-center justify-between p-3 rounded bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-black transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-black" /> Call: +91 8197810561
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </a>
                <a
                  href="https://wa.me/918197810561"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-black transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp Chat
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </a>
                <a
                  href="https://www.instagram.com/trans.wagon27?utm_source=qr&igsh=MWoxbnNsa3lrcjJkbQ%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-black transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-600" /> @trans.wagon27
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
