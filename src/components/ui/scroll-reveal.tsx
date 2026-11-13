import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface ScrollRevealProps {
  children: string;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  start?: string;
  stagger?: number;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "div" | "span";
}

export function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.15,
  baseRotation = 2,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  wordAnimationEnd = "bottom 72%",
  start = "top 92%",
  stagger = 0.035,
  as: Component = "p",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current || window;

    const ctx = gsap.context(() => {
      const wordElements = el.querySelectorAll<HTMLElement>(".reveal-word");
      if (!wordElements.length) return;

      gsap.fromTo(
        wordElements,
        {
          opacity: baseOpacity,
          rotate: baseRotation,
          filter: enableBlur ? `blur(${blurStrength}px)` : "none",
        },
        {
          opacity: 1,
          rotate: 0,
          filter: "blur(0px)",
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            scroller,
            start,
            end: wordAnimationEnd,
            scrub: 1,
          },
        },
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseOpacity,
    baseRotation,
    blurStrength,
    wordAnimationEnd,
    start,
    stagger,
  ]);

  // Split text content into individual words wrapped in spans
  const splitText = (text: string) => {
    return text.split(/(\s+)/).map((segment, index) => {
      if (segment.match(/^\s+$/)) {
        return <React.Fragment key={index}>{segment}</React.Fragment>;
      }
      return (
        <span
          key={index}
          className="reveal-word inline-block will-change-[transform,opacity,filter]"
        >
          {segment}
        </span>
      );
    });
  };

  return (
    <div ref={containerRef} className={`scroll-reveal-container ${containerClassName}`}>
      <Component className={textClassName}>
        {typeof children === "string" ? splitText(children) : children}
      </Component>
    </div>
  );
}

export default ScrollReveal;
