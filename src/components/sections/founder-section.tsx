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
                src="/Founder.png"
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
