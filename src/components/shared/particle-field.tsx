"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
};

/**
 * A quiet field of drifting dots behind the hero. Pure canvas — no
 * dependency needed for something this simple, and it stays out of the
 * way of Framer Motion / GSAP, which handle every other animation.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrame = 0;

    const PARTICLE_COUNT = 46;
    const COLORS = ["34, 197, 94", "99, 102, 241"]; // primary green, secondary purple

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * window.devicePixelRatio;
      canvas!.height = height * window.devicePixelRatio;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function seed() {
      particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.3 + 0.08,
        color: COLORS[i % COLORS.length],
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx!.fill();
      }
      animationFrame = requestAnimationFrame(draw);
    }

    resize();
    seed();

    if (prefersReducedMotion) {
      draw();
      cancelAnimationFrame(animationFrame);
    } else {
      draw();
    }

    const handleResize = () => {
      resize();
      seed();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  );
}
