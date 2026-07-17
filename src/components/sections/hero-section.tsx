"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { ParticleField } from "@/components/shared/particle-field";
import { PhoneMockup } from "@/components/shared/phone-mockup";
import { DashboardPreview } from "@/components/shared/dashboard-preview";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateY, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${springY}deg) rotateY(${springX}deg)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -10);
    rotateY.set(px * 10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-24 pt-36 sm:pt-44"
    >
      <div className="bg-radial-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <GradientBlob variant="primary" className="left-[-10%] top-10 h-80 w-80" />
      <GradientBlob
        variant="accent"
        className="right-[-8%] top-40 h-96 w-96"
        animationClass="animate-float"
      />
      <ParticleField className="pointer-events-none absolute inset-0 -z-0 opacity-70" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-accent"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Fitness Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Transform Your Fitness <br className="hidden sm:block" />
            with <span className="text-gradient">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
          >
            Track calories, workouts, nutrition, and progress — all powered
            by intelligent AI that actually pays attention to your data.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button asChild size="lg">
              <a href="#waitlist">Join the Waitlist</a>
            </Button>
            <Button variant="secondary" size="lg" disabled className="gap-2">
              <PlayCircle className="h-5 w-5" />
              Watch Demo
              <span className="text-muted-foreground">(Coming Soon)</span>
            </Button>
          </motion.div>
        </div>

        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative mx-auto flex justify-center"
        >
          <motion.div style={{ transform }}>
            <PhoneMockup>
              <DashboardPreview screen="dashboard" />
            </PhoneMockup>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
