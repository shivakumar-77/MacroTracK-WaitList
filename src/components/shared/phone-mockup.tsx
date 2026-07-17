import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A hand-built iPhone frame — bezel, Dynamic Island, side buttons — so
 * the hero and product preview never depend on a fake screenshot image.
 * Whatever is passed as children is the actual rendered "screen".
 */
export function PhoneMockup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-[280px] sm:w-[300px]", className)}>
      {/* Side buttons */}
      <div className="absolute -left-[3px] top-28 h-8 w-[3px] rounded-l-sm bg-gray-800" />
      <div className="absolute -left-[3px] top-40 h-14 w-[3px] rounded-l-sm bg-gray-800" />
      <div className="absolute -left-[3px] top-56 h-14 w-[3px] rounded-l-sm bg-gray-800" />
      <div className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r-sm bg-gray-800" />

      <div className="relative rounded-[2.75rem] border-[6px] border-gray-900 bg-gray-900 p-1.5 shadow-[0_30px_60px_-15px_rgb(17,24,39,0.35)]">
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.25rem] bg-background">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-2.5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
          <div className="h-full w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
