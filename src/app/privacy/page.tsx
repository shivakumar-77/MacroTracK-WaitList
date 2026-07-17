import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 pb-24 pt-40 sm:px-8">
      <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        MacroTrack is still pre-launch. The full privacy policy — covering exactly what
        we collect, how it’s stored, and how to request deletion — will be published
        here before the beta opens. Right now, joining the waitlist stores only the
        name, email, fitness goal, and platform you submit, used solely to notify you
        about early access.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Questions in the meantime? Reach out at{" "}
        <a href="mailto:hello@macrotrack.app" className="text-accent hover:underline">
          hello@macrotrack.app
        </a>
        .
      </p>
    </section>
  );
}
