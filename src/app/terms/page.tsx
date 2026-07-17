import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 pb-24 pt-40 sm:px-8">
      <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        MacroTrack is still pre-launch, so there’s no product yet to set terms of
        service around. Full terms will be published here alongside the beta launch.
        Joining the waitlist doesn’t create any agreement beyond receiving updates
        about MacroTrack, which you can opt out of at any time.
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
