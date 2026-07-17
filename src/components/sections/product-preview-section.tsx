"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneMockup } from "@/components/shared/phone-mockup";
import { DashboardPreview, SCREEN_LABELS, type ScreenId } from "@/components/shared/dashboard-preview";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

const SCREENS: ScreenId[] = ["dashboard", "nutrition", "workout", "coach"];
const INTERVAL_MS = 5000;

export function ProductPreviewSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reducedMotion) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % SCREENS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  const current = SCREENS[index];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <GradientBlob variant="secondary" className="left-1/2 top-0 h-96 w-96 -translate-x-1/2" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A dashboard built to be opened daily
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Nutrition, training, and coaching — all rendered live, cycling automatically below.
          </p>
        </Reveal>

        <div
          className="relative mx-auto mt-16 flex justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <PhoneMockup className="w-[300px] sm:w-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full"
              >
                <DashboardPreview screen={current} />
              </motion.div>
            </AnimatePresence>
          </PhoneMockup>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {SCREENS.map((screen, i) => (
            <button
              key={screen}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${SCREEN_LABELS[screen]} screen`}
              aria-current={i === index}
              className="focus-ring group flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors"
            >
              <span
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 ease-premium",
                  i === index ? "w-6 bg-accent" : "w-1.5 bg-border group-hover:bg-gray-300"
                )}
              />
              <span
                className={cn(
                  "hidden text-xs sm:inline",
                  i === index ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {SCREEN_LABELS[screen]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
