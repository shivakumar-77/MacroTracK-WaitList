#!/usr/bin/env bash
# Applies the premium-polish pass (copy, spacing, hover/animation,
# footer, SEO, real logo/founder image wiring) to an existing local
# checkout. Run from your project ROOT (same folder as package.json).
#
# Overwrites the 11 files below. If you've hand-edited any of them
# since the last handoff, back those changes up first.
set -e
echo "Applying MacroTrack premium-polish pass..."

mkdir -p public
echo "  ensured public/ exists — drop logo.png and founder.jpg in there"

mkdir -p "src/app"
cat > 'src/app/layout.tsx' << 'MTRACK_EOF'
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const SITE_URL = "https://macrotrack.app";
const SITE_DESCRIPTION =
  "The all-in-one AI fitness app to track workouts, calories, nutrition, water, body measurements, and AI-powered progress.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MacroTrack – AI Fitness Tracking App",
    template: "%s · MacroTrack",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "MacroTrack",
    "AI fitness app",
    "calorie tracker",
    "macro tracker",
    "workout tracker",
    "AI coach",
    "fitness waitlist",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "MacroTrack – AI Fitness Tracking App",
    description: SITE_DESCRIPTION,
    siteName: "MacroTrack",
  },
  twitter: {
    card: "summary_large_image",
    title: "MacroTrack – AI Fitness Tracking App",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8FAFC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Loaded via <link> rather than next/font so the build has no
            external network dependency — swap to next/font/google any
            time for automatic self-hosting and zero layout shift. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ ["--font-inter" as string]: "'Inter', system-ui, sans-serif" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
MTRACK_EOF
echo "  updated src/app/layout.tsx"

mkdir -p "src/components/shared"
cat > 'src/components/shared/logo.tsx' << 'MTRACK_EOF'
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo.png"
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
MTRACK_EOF
echo "  updated src/components/shared/logo.tsx"

mkdir -p "src/components/shared"
cat > 'src/components/shared/reveal.tsx' << 'MTRACK_EOF'
"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/** Fades + slides content up as it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 20, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-12% 0px" }}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
};

/** Wraps a list of children and staggers their fade-up as a group. */
export function RevealGroup({ children, className, staggerDelay = 0.1 }: RevealGroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={variants} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}
MTRACK_EOF
echo "  updated src/components/shared/reveal.tsx"

mkdir -p "src/components/layout"
cat > 'src/components/layout/navbar.tsx' << 'MTRACK_EOF'
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-6 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <nav
          className={`flex h-16 items-center justify-between rounded-full px-6 transition-all duration-500 ease-premium sm:px-7 ${
            scrolled ? "glass-strong shadow-soft" : "glass"
          }`}
        >
          <a href="#top" className="focus-ring rounded-lg">
            <Logo />
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="focus-ring rounded text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button asChild size="sm">
              <a href="#waitlist">Get Early Access</a>
            </Button>
          </div>

          <button
            type="button"
            className="focus-ring rounded-lg p-2 text-foreground md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong mt-2 overflow-hidden rounded-3xl shadow-soft md:hidden"
            >
              <div className="flex flex-col gap-1 px-5 pb-5 pt-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="focus-ring rounded-lg px-2 py-3 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
                <Button asChild className="mt-2 w-full" onClick={() => setMenuOpen(false)}>
                  <a href="#waitlist">Get Early Access</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
MTRACK_EOF
echo "  updated src/components/layout/navbar.tsx"

mkdir -p "src/components/layout"
cat > 'src/components/layout/footer.tsx' << 'MTRACK_EOF'
import { Github, Instagram, Linkedin } from "lucide-react";
import { Logo } from "@/components/shared/logo";

const SOCIALS = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "GitHub", href: "#", icon: Github },
];

const LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "mailto:hello@macrotrack.app" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <Logo />

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} className="focus-ring rounded transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-border pt-6 text-center text-xs text-muted-foreground/70 md:text-left">
        <p>© {year} MacroTrack. All rights reserved.</p>
        <p className="mt-1">Made with ❤️ by Shiva Kumar</p>
      </div>
    </footer>
  );
}
MTRACK_EOF
echo "  updated src/components/layout/footer.tsx"

mkdir -p "src/components/sections"
cat > 'src/components/sections/hero-section.tsx' << 'MTRACK_EOF'
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
      className="relative overflow-hidden pb-28 pt-40 sm:pb-36 sm:pt-52"
    >
      <div className="bg-radial-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <GradientBlob variant="primary" className="left-[-10%] top-10 h-80 w-80" />
      <GradientBlob
        variant="secondary"
        className="right-[-8%] top-32 h-96 w-96"
        animationClass="animate-float"
      />
      <ParticleField className="pointer-events-none absolute inset-0 -z-0 opacity-70" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 px-5 sm:px-8 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-1.5 text-xs font-medium text-green-700"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Fitness Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            The AI Fitness App <br className="hidden sm:block" />
            That Actually <span className="text-gradient">Understands</span> You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
          >
            Track workouts, calories, nutrition, water, body progress, and
            receive personalized AI coaching — all in one beautifully
            designed app.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button asChild size="lg">
              <a href="#waitlist">Get Early Access</a>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              disabled
              className="gap-2 border-dashed text-muted-foreground shadow-none hover:scale-100 hover:bg-white disabled:opacity-100"
            >
              <PlayCircle className="h-5 w-5" />
              Watch Demo
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-muted-foreground">
                Coming Soon
              </span>
            </Button>
          </motion.div>
        </div>

        <div className="relative mx-auto flex justify-center animate-float-slow">
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div style={{ transform }}>
              <PhoneMockup>
                <DashboardPreview screen="dashboard" />
              </PhoneMockup>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
MTRACK_EOF
echo "  updated src/components/sections/hero-section.tsx"

mkdir -p "src/components/sections"
cat > 'src/components/sections/features-section.tsx' << 'MTRACK_EOF'
import { BarChart3, BrainCircuit, CalendarDays, Droplets, Dumbbell, Flame, TrendingUp, UtensilsCrossed } from "lucide-react";
import { FEATURES } from "@/data/content";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";

const ICONS = {
  Flame,
  Dumbbell,
  Droplets,
  BrainCircuit,
  TrendingUp,
  UtensilsCrossed,
  CalendarDays,
  BarChart3,
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            One app, every part of the picture
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Everything you’d normally track across four different apps, built to work together instead of against each other.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.08}
        >
          {FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon];
            return (
              <RevealItem key={feature.title}>
                <Card className="group relative h-full overflow-hidden p-7 transition-all duration-500 ease-premium hover:-translate-y-2 hover:border-primary/25 hover:shadow-[0_24px_48px_-20px_rgb(var(--primary)/0.22)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-primary transition-transform duration-500 ease-premium group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-base font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
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
MTRACK_EOF
echo "  updated src/components/sections/features-section.tsx"

mkdir -p "src/components/sections"
cat > 'src/components/sections/why-macrotrack-section.tsx' << 'MTRACK_EOF'
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
  { chip: "bg-green-50 text-primary", hoverBorder: "hover:border-primary/25" },
  { chip: "bg-indigo-50 text-secondary", hoverBorder: "hover:border-secondary/25" },
  { chip: "bg-green-50 text-primary", hoverBorder: "hover:border-primary/25" },
  { chip: "bg-indigo-50 text-secondary", hoverBorder: "hover:border-secondary/25" },
  { chip: "bg-green-50 text-primary", hoverBorder: "hover:border-primary/25" },
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
    <section id="why" ref={sectionRef} className="relative overflow-hidden py-28 sm:py-36">
      <div ref={blobRef} className="pointer-events-none absolute inset-0">
        <GradientBlob variant="secondary" className="left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2" animationClass="" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            The MacroTrack Difference
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            Not just another tracker — the parts that make people actually stick with it.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {WHY_MACROTRACK.map((item, index) => {
            const Icon = ICONS[item.icon];
            const tone = TONES[index % TONES.length];
            return (
              <RevealItem key={item.title} className={index === 3 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <Card
                  className={`group h-full p-8 transition-all duration-500 ease-premium hover:-translate-y-2 hover:shadow-card ${tone.hoverBorder}`}
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 ease-premium group-hover:scale-110 group-hover:rotate-3 ${tone.chip}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
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
MTRACK_EOF
echo "  updated src/components/sections/why-macrotrack-section.tsx"

mkdir -p "src/components/sections"
cat > 'src/components/sections/waitlist-section.tsx' << 'MTRACK_EOF'
"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Smartphone } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label, FieldError } from "@/components/ui/form-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FITNESS_GOALS, PLATFORMS, waitlistSchema, type WaitlistFormValues } from "@/lib/validations";
import { addWaitlistEntry, FirebaseNotConfiguredError, isFirebaseConfigured } from "@/lib/firebase";
import { cn } from "@/lib/utils";

export function WaitlistSection() {
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { platform: "iphone" },
  });

  async function onSubmit(values: WaitlistFormValues) {
    setErrorMessage(null);
    try {
      await addWaitlistEntry(values);
      setSubmitState("success");
    } catch (err) {
      if (err instanceof FirebaseNotConfiguredError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Something went wrong. Please try again in a moment.");
        console.error("Waitlist submission failed:", err);
      }
      setSubmitState("error");
    }
  }

  return (
    <section id="waitlist" className="relative overflow-hidden py-24 sm:py-32">
      <GradientBlob variant="primary" className="left-[-10%] bottom-0 h-96 w-96" />
      <GradientBlob variant="secondary" className="right-[-10%] top-0 h-80 w-80" animationClass="animate-float" />

      <div className="relative mx-auto max-w-xl px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Join the Early Access Waitlist
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Join the waitlist for early access, founder pricing, and a say in what we build next.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <Card className="overflow-hidden p-8 sm:p-11">
            {!isFirebaseConfigured() && (
              <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
                Firebase isn’t configured yet — add your project credentials to{" "}
                <code className="rounded bg-amber-100 px-1 py-0.5">.env.local</code> to enable real
                submissions. See <code className="rounded bg-amber-100 px-1 py-0.5">.env.local.example</code>.
              </p>
            )}

            <AnimatePresence mode="wait">
              {submitState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <span className="relative flex h-16 w-16 items-center justify-center">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-primary/60" aria-hidden="true" />
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
                      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-primary"
                    >
                      <Check className="h-8 w-8" strokeWidth={2.5} />
                    </motion.span>
                  </span>
                  <motion.h3
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="mt-5 text-xl font-semibold text-foreground"
                  >
                    You’re on the list!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.4 }}
                    className="mt-2 max-w-xs text-sm text-muted-foreground"
                  >
                    We’ll email you the moment early access opens. Thanks for being here first.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-6"
                >
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Jordan Rivera"
                      hasError={!!errors.name}
                      {...register("name")}
                    />
                    <FieldError message={errors.name?.message} />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@email.com"
                      hasError={!!errors.email}
                      {...register("email")}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>

                  <div>
                    <Label htmlFor="goal">Fitness Goal</Label>
                    <Controller
                      control={control}
                      name="goal"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="goal" hasError={!!errors.goal}>
                            <SelectValue placeholder="Choose a goal" />
                          </SelectTrigger>
                          <SelectContent>
                            {FITNESS_GOALS.map((goal) => (
                              <SelectItem key={goal.value} value={goal.value}>
                                {goal.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldError message={errors.goal?.message} />
                  </div>

                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Controller
                      control={control}
                      name="platform"
                      render={({ field }) => (
                        <div id="platform" className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Platform">
                          {PLATFORMS.map((platform) => (
                            <button
                              key={platform.value}
                              type="button"
                              role="radio"
                              aria-checked={field.value === platform.value}
                              onClick={() => field.onChange(platform.value)}
                              className={cn(
                                "focus-ring flex h-14 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-all duration-200",
                                field.value === platform.value
                                  ? "border-primary/40 bg-green-50 text-primary"
                                  : "border-border bg-white text-muted-foreground hover:bg-gray-50 hover:text-foreground"
                              )}
                            >
                              <Smartphone className="h-4 w-4" />
                              {platform.label}
                            </button>
                          ))}
                        </div>
                      )}
                    />
                    <FieldError message={errors.platform?.message} />
                  </div>

                  <div>
                    <Controller
                      control={control}
                      name="updates"
                      render={({ field }) => (
                        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
                          <Checkbox
                            checked={field.value === true}
                            onCheckedChange={(checked) => field.onChange(checked === true)}
                          />
                          I agree to receive updates about MacroTrack.
                        </label>
                      )}
                    />
                    <FieldError message={errors.updates?.message} />
                  </div>

                  {submitState === "error" && errorMessage && (
                    <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">
                      {errorMessage}
                    </p>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Getting you in…
                      </>
                    ) : (
                      "Get Early Access"
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
MTRACK_EOF
echo "  updated src/components/sections/waitlist-section.tsx"

mkdir -p "src/components/sections"
cat > 'src/components/sections/founder-section.tsx' << 'MTRACK_EOF'
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";
import { FOUNDER } from "@/data/content";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";

export function FounderSection() {
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-xl px-5 sm:px-8">
        <Reveal>
          <Card className="flex flex-col items-center gap-5 p-10 text-center sm:p-12">
            <div className="relative h-24 w-24">
              <div
                className="absolute inset-0 scale-125 rounded-full bg-gradient-to-br from-primary to-secondary opacity-40 blur-xl"
                aria-hidden="true"
              />
              <Image
                src="/founder.jpg"
                alt={FOUNDER.name}
                width={96}
                height={96}
                className="relative h-24 w-24 rounded-full object-cover shadow-[0_12px_28px_-10px_rgb(var(--primary)/0.5)]"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">{FOUNDER.name}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{FOUNDER.role}</p>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{FOUNDER.bio}</p>
            <div className="mt-2 flex items-center gap-3">
              <a
                href={FOUNDER.linkedinUrl}
                aria-label="LinkedIn"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={FOUNDER.instagramUrl}
                aria-label="Instagram"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
MTRACK_EOF
echo "  updated src/components/sections/founder-section.tsx"

mkdir -p "src/data"
cat > 'src/data/content.ts' << 'MTRACK_EOF'
export type Feature = {
  icon: "Flame" | "Dumbbell" | "Droplets" | "BrainCircuit" | "TrendingUp" | "UtensilsCrossed" | "CalendarDays" | "BarChart3";
  title: string;
  description: string;
};

export const FEATURES: Feature[] = [
  {
    icon: "Flame",
    title: "AI Calorie Tracking",
    description: "Log a meal in seconds and let AI estimate calories and macros from what you type or photograph.",
  },
  {
    icon: "Dumbbell",
    title: "Workout Tracking",
    description: "Log sets, reps, and weight, and watch your lifts trend up over weeks instead of relying on memory.",
  },
  {
    icon: "Droplets",
    title: "Water Tracking",
    description: "Tap to log a glass and see your daily intake fill up against a target built around your body.",
  },
  {
    icon: "BrainCircuit",
    title: "AI Coach",
    description: "A coach that actually reads your logs and tells you what to adjust this week, not generic advice.",
  },
  {
    icon: "TrendingUp",
    title: "Body Progress",
    description: "Weight, measurements, and progress photos, lined up on one timeline so trends are impossible to miss.",
  },
  {
    icon: "UtensilsCrossed",
    title: "Meal Planning",
    description: "Personalized meal plans built around your goal, your macros, and the food you actually like eating.",
  },
  {
    icon: "CalendarDays",
    title: "Workout Plans",
    description: "Structured training plans that adapt as you get stronger, so you're never guessing what's next.",
  },
  {
    icon: "BarChart3",
    title: "Smart Analytics",
    description: "Clear charts on adherence, trends, and consistency — the numbers that actually predict progress.",
  },
];

export type TimelineItem = {
  icon: "Layers" | "Sparkles" | "LayoutDashboard" | "Repeat" | "ShieldCheck";
  title: string;
  description: string;
};

export const WHY_MACROTRACK: TimelineItem[] = [
  {
    icon: "Layers",
    title: "Everything in one app",
    description: "Calories, workouts, water, supplements, and progress photos — no more switching between five different trackers.",
  },
  {
    icon: "Sparkles",
    title: "AI insights that matter",
    description: "Your AI Coach reads your actual logs and flags what's working and what's quietly stalling your progress.",
  },
  {
    icon: "LayoutDashboard",
    title: "A dashboard you'll enjoy opening",
    description: "Clean, fast, and designed to make checking in feel good instead of feeling like a chore.",
  },
  {
    icon: "Repeat",
    title: "Built for consistency",
    description: "Small nudges and streaks that keep you logging on the days you don't feel like it — no guilt, just momentum.",
  },
  {
    icon: "ShieldCheck",
    title: "Privacy focused",
    description: "Your data trains your own insights, not a public feed. Nothing is shared unless you choose to share it.",
  },
];

export type Platform = {
  name: string;
  icon: "Apple" | "Smartphone" | "Globe" | "Watch";
};

export const PLATFORMS_COMING_SOON: Platform[] = [
  { name: "iOS", icon: "Apple" },
  { name: "Android", icon: "Smartphone" },
  { name: "Web", icon: "Globe" },
  { name: "Wearables", icon: "Watch" },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ: FaqItem[] = [
  {
    question: "When will MacroTrack launch?",
    answer:
      "We're finishing the core app now. Waitlist members get first access when the beta opens, with a public launch date announced closer to release — join the list and you'll hear about both before anyone else.",
  },
  {
    question: "Will it be free?",
    answer:
      "Yes. MacroTrack has a free tier that covers calorie, macro, workout, and water tracking. A Pro plan will unlock the AI Coach, advanced analytics, and personalized meal and workout plans.",
  },
  {
    question: "Android or iPhone?",
    answer:
      "Both. MacroTrack is being built for iOS and Android from day one, alongside a web dashboard, so switching phones won't mean losing your history.",
  },
  {
    question: "How does the AI actually work?",
    answer:
      "The AI Coach looks at what you actually log — meals, workouts, water, and trends over time — and turns that into specific, plain-language suggestions instead of generic tips that ignore your data.",
  },
];

/**
 * Founder details. Name inferred from the "Made with ❤️ by Shiva Kumar"
 * footer credit — update directly if that's not accurate, and swap in
 * real LinkedIn/Instagram URLs when ready (left as "#" placeholders
 * rather than fabricated links).
 */
export const FOUNDER = {
  name: "Shiva Kumar",
  role: "Founder & CEO",
  bio: "Building the fitness app I always wished existed—one place to track workouts, nutrition, progress, and AI coaching.",
  linkedinUrl: "#",
  instagramUrl: "#",
};
MTRACK_EOF
echo "  updated src/data/content.ts"

echo "Done. Add public/logo.png + public/founder.jpg, then: npm run build"