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
