"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { WHY_MACROTRACK } from "@/data/content";
import { Reveal } from "@/components/shared/reveal";

export function WhyMacroTrackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why MacroTrack
          </h2>
        </Reveal>

        <div ref={sectionRef} className="relative mt-16">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border/10 sm:left-6">
            <div
              ref={lineRef}
              className="h-full w-full origin-top bg-gradient-to-b from-accent via-secondary to-primary"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <ul className="space-y-10">
            {WHY_MACROTRACK.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <li className="relative flex gap-5 pl-1 sm:gap-6">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-background shadow-glow-primary sm:h-12 sm:w-12">
                    <Check className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
