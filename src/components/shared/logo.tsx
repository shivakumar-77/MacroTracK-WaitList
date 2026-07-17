import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-secondary to-accent font-bold text-white shadow-glow-primary">
        M
      </div>
      <span className="text-base font-semibold tracking-tight text-foreground">
        MacroTrack
      </span>
    </div>
  );
}
