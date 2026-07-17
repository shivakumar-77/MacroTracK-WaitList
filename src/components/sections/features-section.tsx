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
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.08}
        >
          {FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon];
            return (
              <RevealItem key={feature.title}>
                <Card className="group relative h-full overflow-hidden p-6 transition-all duration-300 ease-premium hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-18px_rgb(var(--primary)/0.35)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-primary transition-transform duration-300 ease-premium group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
