import { cn } from "@/lib/utils";

type GradientBlobProps = {
  className?: string;
  variant?: "primary" | "accent" | "success";
  animationClass?: string;
};

const VARIANT_GRADIENT: Record<NonNullable<GradientBlobProps["variant"]>, string> = {
  primary: "from-primary/40 via-secondary/25 to-transparent",
  accent: "from-accent/35 via-primary/20 to-transparent",
  success: "from-success/25 via-secondary/20 to-transparent",
};

/**
 * A large, blurred radial gradient used to give sections depth without
 * introducing any new colors — every blob is built from the same brand
 * palette at low opacity.
 */
export function GradientBlob({
  className,
  variant = "primary",
  animationClass = "animate-float-slow",
}: GradientBlobProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full bg-gradient-to-br blur-3xl",
        VARIANT_GRADIENT[variant],
        animationClass,
        className
      )}
    />
  );
}
