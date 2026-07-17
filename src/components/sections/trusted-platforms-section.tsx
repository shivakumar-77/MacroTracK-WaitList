import { Apple, Globe, Smartphone, Watch } from "lucide-react";
import { PLATFORMS_COMING_SOON } from "@/data/content";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";

const ICONS = { Apple, Smartphone, Globe, Watch };

export function TrustedPlatformsSection() {
  return (
    <section id="roadmap" className="border-y border-border py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Coming Soon
          </p>
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {PLATFORMS_COMING_SOON.map((platform) => {
            const Icon = ICONS[platform.icon];
            return (
              <RevealItem key={platform.name}>
                <div className="flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-border bg-white px-4 py-6 text-center shadow-soft transition-transform duration-300 ease-premium hover:-translate-y-1">
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-foreground">{platform.name}</span>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
