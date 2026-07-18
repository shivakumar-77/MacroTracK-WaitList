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
