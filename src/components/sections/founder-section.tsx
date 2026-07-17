import { Instagram, Linkedin } from "lucide-react";
import { FOUNDER } from "@/data/content";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function FounderSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-xl px-5 sm:px-8">
        <Reveal>
          <Card className="flex flex-col items-center gap-4 p-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-xl font-bold text-white shadow-glow-primary">
              {getInitials(FOUNDER.name)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{FOUNDER.name}</h3>
              <p className="text-sm text-accent">{FOUNDER.role}</p>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{FOUNDER.bio}</p>
            <div className="mt-2 flex items-center gap-3">
              <a
                href={FOUNDER.linkedinUrl}
                aria-label="LinkedIn"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border/12 text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={FOUNDER.instagramUrl}
                aria-label="Instagram"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border/12 text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
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
