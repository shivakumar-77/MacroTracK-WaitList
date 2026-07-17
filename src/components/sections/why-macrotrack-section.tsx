"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, LayoutDashboard, Repeat, ShieldCheck, Sparkles } from "lucide-react";
import { WHY_MACROTRACK } from "@/data/content";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { GradientBlob } from "@/components/shared/gradient-blob";

const ICONS = { Layers, Sparkles, LayoutDashboard, Repeat, ShieldCheck };

// Alternate the accent color per card so green and purple both show up,
// per the brief ("Green icons, Purple accents").
const TONES = [
  { chip: "bg-green-50 text-primary" },
  { chip: "bg-indigo-50 text-secondary" },
  { chip: "bg-green-50 text-primary" },
  { chip: "bg-indigo-50 text-secondary" },
  { chip: "bg-green-50 text-primary" },
];

export function WhyMacroTrackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !blobRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // GSAP handles this section's background parallax — a different job
    // from Framer Motion's viewport-triggered card reveals below, and a
    // better fit for something continuously tied to scroll position.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        blobRef.current,
        { yPercent: -20 },
        {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why" ref={sectionRef} className="relative overflow-hidden py-24 sm:py-32">
      <div ref={blobRef} className="pointer-events-none absolute inset-0">
        <GradientBlob variant="secondary" className="left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2" animationClass="" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why MacroTrack
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Not just another tracker — the parts that make people actually stick with it.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {WHY_MACROTRACK.map((item, index) => {
            const Icon = ICONS[item.icon];
            const tone = TONES[index % TONES.length];
            return (
              <RevealItem key={item.title} className={index === 3 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <Card className="h-full p-7 transition-all duration-300 ease-premium hover:-translate-y-1.5 hover:shadow-card">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tone.chip}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
