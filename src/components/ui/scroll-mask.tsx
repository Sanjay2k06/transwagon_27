import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

export interface ScrollMaskProps {
  variant?: "iris" | "wipe" | "curtain" | "slats" | "grid" | "type";
  src: string;
  alt?: string;
  word?: string;
  scrollLength?: number;
  settle?: number;
  smooth?: number;
  feather?: number;
  stagger?: number;
  columns?: number;
  originX?: number;
  originY?: number;
  angle?: number;
  zoom?: number;
  fit?: "cover" | "contain";
  radius?: number;
  overlay?: number;
  background?: string;
  revealContent?: boolean;
  children?: ReactNode;
  className?: string;
}

export function ScrollMask({
  variant = "iris",
  src,
  alt = "Revealed vehicle build",
  word = "TRANSWAGON",
  scrollLength = 2.4,
  settle = 0.84,
  smooth = 0.14,
  feather = 14,
  stagger = 0.55,
  columns = 8,
  originX = 50,
  originY = 50,
  angle = 108,
  zoom = 1.15,
  fit = "cover",
  radius = 16,
  overlay = 0.15,
  background = "transparent",
  revealContent = true,
  children,
  className = "",
}: ScrollMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = {
    damping: 24,
    stiffness: 140,
    mass: Math.max(0.2, smooth * 2),
  };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Normalized completion relative to settle
  const activeProgress = prefersReduced ? scrollYProgress : smoothProgress;
  const normalizedProgress = useTransform(activeProgress, (p) => {
    return Math.min(1, Math.max(0, p / settle));
  });

  // Parallax zoom on the underlying media
  const imageScale = useTransform(normalizedProgress, [0, 1], [zoom, 1]);
  const imageY = useTransform(normalizedProgress, [0, 1], ["-4%", "0%"]);

  // Content fade & lift
  const contentOpacity = useTransform(normalizedProgress, [0.3, 0.85], [0, 1]);
  const contentY = useTransform(normalizedProgress, [0.3, 0.85], [24, 0]);

  // Iris mask: circular expansion
  const irisRadius = useTransform(normalizedProgress, [0, 1], [0, 160]);
  const irisClip = useTransform(irisRadius, (r) => {
    return `circle(${r}% at ${originX}% ${originY}%)`;
  });

  // Wipe mask: linear directional clip
  const wipeClip = useTransform(normalizedProgress, (p) => {
    const rad = (angle * Math.PI) / 180;
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
    const offset = (p - 0.5) * 200;
    return `inset(0 0 0 0 round ${radius}px)`;
  });

  // Curtain mask: 2 doors opening outward from center
  const curtainLeft = useTransform(normalizedProgress, [0, 1], ["0%", "-50%"]);
  const curtainRight = useTransform(normalizedProgress, [0, 1], ["0%", "50%"]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{
        height: `${Math.max(1.2, scrollLength) * 100}vh`,
        backgroundColor: background,
      }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-12 py-10">
        <div
          className="relative w-full max-w-7xl h-[78vh] overflow-hidden border border-border/80 shadow-2xl bg-zinc-950"
          style={{ borderRadius: `${radius}px` }}
        >
          {/* Base Background Image with Parallax Scale */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <motion.img
              src={src}
              alt={alt}
              className="w-full h-full"
              style={{
                objectFit: fit,
                scale: prefersReduced ? 1 : imageScale,
                y: prefersReduced ? 0 : imageY,
              }}
            />
            {overlay > 0 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: `rgba(0, 0, 0, ${overlay})` }}
              />
            )}
          </div>

          {/* Mask Variants */}
          {variant === "iris" && (
            <motion.div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                clipPath: irisClip,
                WebkitClipPath: irisClip,
              }}
            >
              <motion.img
                src={src}
                alt={alt}
                className="w-full h-full"
                style={{
                  objectFit: fit,
                  scale: prefersReduced ? 1 : imageScale,
                  y: prefersReduced ? 0 : imageY,
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
                }}
              />
            </motion.div>
          )}

          {variant === "curtain" && (
            <>
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 bg-zinc-950 z-10 pointer-events-none border-r border-zinc-800"
                style={{ x: curtainLeft }}
              />
              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 bg-zinc-950 z-10 pointer-events-none border-l border-zinc-800"
                style={{ x: curtainRight }}
              />
            </>
          )}

          {variant === "slats" && (
            <div
              className="absolute inset-0 grid pointer-events-none z-10"
              style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: columns }).map((_, i) => {
                const start = (i / columns) * stagger;
                const end = Math.min(1, start + (1 - stagger));
                return (
                  <SlatPiece
                    key={i}
                    index={i}
                    progress={normalizedProgress}
                    start={start}
                    end={end}
                  />
                );
              })}
            </div>
          )}

          {variant === "type" && (
            <TypeCutoutMask
              word={word}
              progress={normalizedProgress}
              src={src}
              fit={fit}
              imageScale={imageScale}
              imageY={imageY}
            />
          )}

          {/* Reveal Content / Children with Parallax */}
          {revealContent && (
            <motion.div
              className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col md:flex-row md:items-end justify-between gap-6"
              style={{
                opacity: prefersReduced ? 1 : contentOpacity,
                y: prefersReduced ? 0 : contentY,
              }}
            >
              <div className="max-w-2xl text-white">
                {children ? (
                  children
                ) : (
                  <>
                    <span className="text-xs uppercase font-mono tracking-widest text-zinc-400">
                      High-Precision Automotive Fabrication
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-display font-extrabold uppercase mt-1 leading-tight text-white">
                      Built with intention. Proven on every route.
                    </h3>
                    <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                      Every commercial vehicle body is engineered for structural rigidity,
                      aerodynamic payload efficiency, and extreme weather durability.
                    </p>
                  </>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <ProgressBar progress={normalizedProgress} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function SlatPiece({
  progress,
  start,
  end,
  index,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  index: number;
}) {
  const scaleY = useTransform(progress, [start, end], [1, 0]);
  const origin = index % 2 === 0 ? "top" : "bottom";
  return (
    <motion.div
      className="w-full h-full bg-[#09090b] pointer-events-none"
      style={{
        scaleY,
        transformOrigin: origin,
      }}
    />
  );
}

function TypeCutoutMask({
  word,
  progress,
  imageScale,
}: {
  word: string;
  progress: MotionValue<number>;
  src: string;
  fit: "cover" | "contain";
  imageScale: MotionValue<number>;
  imageY: MotionValue<string>;
}) {
  const typeScale = useTransform(progress, [0, 0.7, 1], [1, 1.8, 8]);
  const typeOpacity = useTransform(progress, [0.75, 0.95], [1, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-zinc-950 pointer-events-none z-10 overflow-hidden"
      style={{ opacity: typeOpacity }}
    >
      <motion.div
        className="font-display font-black text-6xl sm:text-8xl md:text-9xl uppercase tracking-tighter text-white mix-blend-screen"
        style={{ scale: typeScale }}
      >
        {word}
      </motion.div>
    </motion.div>
  );
}

function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  const widthPercent = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
      <motion.div className="h-full bg-white rounded-full" style={{ width: widthPercent }} />
    </div>
  );
}
