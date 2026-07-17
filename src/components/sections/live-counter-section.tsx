"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { getWaitlistCount, isFirebaseConfigured } from "@/lib/firebase";

export function LiveCounterSection() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    getWaitlistCount()
      .then(setCount)
      .catch((err) => console.error("Couldn't load waitlist count:", err));
  }, []);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
        <Reveal>
          <div className="mx-auto inline-flex flex-col items-center gap-3 rounded-3xl border border-border bg-white px-10 py-8 shadow-soft sm:flex-row sm:gap-6 sm:px-14">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-primary">
              <Users className="h-6 w-6" />
            </span>
            <div>
              {count !== null ? (
                <p className="text-3xl font-bold text-foreground sm:text-4xl">
                  <AnimatedCounter value={count} suffix="+" />
                </p>
              ) : (
                <p className="text-3xl font-bold text-foreground sm:text-4xl">Be the first</p>
              )}
              <p className="text-sm text-muted-foreground">People Joined</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
