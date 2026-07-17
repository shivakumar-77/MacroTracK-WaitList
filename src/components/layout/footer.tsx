import { Instagram, Linkedin, Mail } from "lucide-react";
import { Logo } from "@/components/shared/logo";

const SOCIALS = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Email", href: "mailto:hello@macrotrack.app", icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <Logo />

        <div className="flex items-center gap-4">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <a href="/privacy" className="focus-ring rounded hover:text-foreground">
            Privacy Policy
          </a>
          <a href="/terms" className="focus-ring rounded hover:text-foreground">
            Terms
          </a>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-7xl text-center text-xs text-muted-foreground/70 md:text-left">
        © {year} MacroTrack. All rights reserved.
      </p>
    </footer>
  );
}
