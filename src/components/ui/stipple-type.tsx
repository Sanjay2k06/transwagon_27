import { useEffect, useRef, useState } from "react";

interface StippleTypeProps {
  text: string;
  className?: string;
  fontFamily?: string;
  fontSize?: number;
  textColor?: string;
  stippleColor?: string;
  dotSize?: number;
  density?: number;
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export function StippleType({
  text,
  className = "",
  fontFamily = '"Google Sans Flex", "Syne", "DM Sans", -apple-system, sans-serif',
  fontSize = 64,
  textColor = "#09090b",
  stippleColor = "#18181b",
  dotSize = 1.25,
  density = 6,
  interactive = true,
}: StippleTypeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: -1000,
    y: -1000,
    active: false,
    radius: 90,
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const initParticles = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 320);
      // Dynamically calculate responsive font size based on container width
      const responsiveFontSize = Math.min(fontSize, Math.max(28, width * 0.082));
      const height = Math.max(responsiveFontSize * 1.4, 60);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Create offscreen canvas to sample text
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offCtx.fillStyle = "#000000";
      offCtx.font = `800 ${responsiveFontSize}px ${fontFamily}`;
      offCtx.textBaseline = "middle";
      offCtx.textAlign = "left";

      // Measure and fit text
      let measuredFont = responsiveFontSize;
      const textWidth = offCtx.measureText(text).width;
      if (textWidth > width - 20) {
        measuredFont = Math.floor((responsiveFontSize * (width - 24)) / textWidth);
        offCtx.font = `800 ${measuredFont}px ${fontFamily}`;
      }

      const textY = height / 2;
      offCtx.fillText(text, 0, textY);

      const imageData = offCtx.getImageData(0, 0, width, height);
      const data = imageData.data;
      particles = [];

      const step = Math.max(3, Math.floor(density));
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 48) {
            // Jitter for stipple/marbled ink aesthetic
            const jitterX = (Math.random() - 0.5) * 1.8;
            const jitterY = (Math.random() - 0.5) * 1.8;
            const px = x + jitterX;
            const py = y + jitterY;
            const radius = Math.max(0.7, (alpha / 255) * dotSize + (Math.random() * 0.4 - 0.2));

            particles.push({
              x: px,
              y: py,
              originX: px,
              originY: py,
              vx: 0,
              vy: 0,
              size: radius,
              alpha: Math.min(1, (alpha / 255) * 0.95),
            });
          }
        }
      }
      setIsReady(true);
    };

    initParticles();

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      initParticles();
    });
    resizeObserver.observe(container);

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const friction = 0.88;
      const spring = 0.07;
      const mouseForceRadius = mouse.radius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (interactive && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseForceRadius && distance > 0) {
            // Fluid swirling force
            const angle = Math.atan2(dy, dx);
            const force = (1 - distance / mouseForceRadius) * 4.2;
            const swirl = angle + Math.PI / 3;

            p.vx += Math.cos(swirl) * force * 1.2 + Math.cos(angle) * force * 0.8;
            p.vy += Math.sin(swirl) * force * 1.2 + Math.sin(angle) * force * 0.8;
          }
        }

        // Return to home position
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * spring;
        p.vy += homeDy * spring;

        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        // Render stipple dot
        ctx.fillStyle = stippleColor;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
      container.addEventListener("touchmove", handleTouchMove, { passive: true });
      container.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (interactive) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [text, fontSize, fontFamily, stippleColor, dotSize, density, interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block w-full select-none ${className}`}
      style={{ minHeight: `${fontSize * 0.9}px` }}
    >
      <span className="sr-only">{text}</span>
      <canvas
        ref={canvasRef}
        className={`block transition-opacity duration-300 ${isReady ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
      {!isReady && (
        <span
          className="absolute inset-0 font-display font-bold leading-none tracking-tight text-foreground"
          style={{ fontSize: `${fontSize * 0.8}px` }}
        >
          {text}
        </span>
      )}
    </div>
  );
}
