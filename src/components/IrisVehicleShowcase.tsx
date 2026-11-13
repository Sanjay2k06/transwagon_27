import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface IrisVehicleShowcaseProps {
  src?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
}

export function IrisVehicleShowcase({
  src = "/images/work-1.jpg",
  alt = "TRANSWAGON Dual-Tone Commercial Container Body",
  title = "DUAL-TONE CONTAINER BODY",
  subtitle = "Heavy-duty corrugated cold-rolled steel, engineered understructure, and multi-lock rear security.",
}: IrisVehicleShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect user motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      if (maskRef.current) {
        maskRef.current.style.clipPath = "none";
      }
      return;
    }

    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    const mask = maskRef.current;
    const image = imageRef.current;

    if (!section || !pinContainer || !mask) return;

    const ctx = gsap.context(() => {
      // Create master scrub timeline with absolute viewport pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: pinContainer,
          start: "top top",
          end: "+=2200", // Generous dedicated scroll distance for smooth control
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Iris expansion: 0% -> 185% from progress 0 to 0.68
      // At 185%, the circle has fully cleared all 4 corners of any screen size (desktop, tablet, mobile portrait)
      tl.fromTo(
        mask,
        {
          clipPath: "circle(0% at 50% 50%)",
          WebkitClipPath: "circle(0% at 50% 50%)",
        },
        {
          clipPath: "circle(185% at 50% 50%)",
          WebkitClipPath: "circle(185% at 50% 50%)",
          ease: "power2.inOut",
          duration: 0.68,
        },
        0,
      );

      // 2. Parallax scale & settling on vehicle image
      if (image) {
        tl.fromTo(
          image,
          { scale: 1.12, y: "-2%" },
          { scale: 1.0, y: "0%", ease: "power1.out", duration: 0.68 },
          0,
        );
      }

      // 3. GUARANTEED COMPLETION LOCK:
      // Hold the 100% fully-revealed vehicle image firmly on screen
      // from 0.68 to 1.0 (~700px of scrolling) before releasing to next section!
      tl.to({}, { duration: 0.32 }, 0.68);
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative w-full bg-[#000000] text-white"
      aria-label="Vehicle Iris Reveal"
    >
      {/* Pinned Viewport Container - Locked by GSAP during scroll */}
      <div
        ref={pinContainerRef}
        className="w-full h-screen h-[100dvh] relative overflow-hidden select-none bg-black"
      >
        {/* IRIS-MASKED FULL-BLEED VEHICLE IMAGE FILLING FULL AVAILABLE SPACE WITHOUT BLACK GAPS */}
        <div
          ref={maskRef}
          className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path] bg-black"
          style={{
            clipPath: "circle(0% at 50% 50%)",
            WebkitClipPath: "circle(0% at 50% 50%)",
          }}
        >
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-[48%_center] md:object-center will-change-transform"
            loading="eager"
          />
          {/* Subtle Contrast Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>

        {/* ONLY CENTERED TEXT: HEADING & SUBTITLE PERFECTLY CENTERED */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-12 pointer-events-none">
          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight text-white drop-shadow-2xl">
            {title}
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base md:text-lg text-zinc-200 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-medium">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

export default IrisVehicleShowcase;
