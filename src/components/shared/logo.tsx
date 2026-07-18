import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/MacroTrack Logo .png"
        alt="MacroTrack"
        width={40}
        height={40}
        className="h-10 w-10 rounded-xl object-contain"
        priority
      />
      <span className="text-base font-semibold tracking-tight text-foreground">
        MacroTrack
      </span>
    </div>
  );
}
