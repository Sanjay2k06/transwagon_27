export interface BrandMarkProps {
  compact?: boolean;
  variant?: "auto" | "white" | "dark";
  className?: string;
}

export function BrandMark({ compact = false, variant = "auto", className = "" }: BrandMarkProps) {
  const isWhite = variant === "white";
  const isDark = variant === "dark";

  return (
    <span
      className={`brand-mark${compact ? " brand-mark-compact" : ""} ${className}`}
      aria-hidden="true"
    >
      {isWhite ? (
        <img
          src="/images/transwagon-truck-white.png"
          alt="TRANSWAGON Truck Logo"
          className="h-full w-full object-contain"
        />
      ) : isDark ? (
        <img
          src="/images/transwagon-truck-dark.png"
          alt="TRANSWAGON Truck Logo"
          className="h-full w-full object-contain"
        />
      ) : (
        <>
          <img
            src="/images/transwagon-truck-dark.png"
            alt="TRANSWAGON Truck Logo"
            className="h-full w-full object-contain dark:hidden"
          />
          <img
            src="/images/transwagon-truck-white.png"
            alt="TRANSWAGON Truck Logo"
            className="h-full w-full object-contain hidden dark:block"
          />
        </>
      )}
    </span>
  );
}
