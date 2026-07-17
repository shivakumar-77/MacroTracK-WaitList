"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Smartphone } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label, FieldError } from "@/components/ui/form-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FITNESS_GOALS, PLATFORMS, waitlistSchema, type WaitlistFormValues } from "@/lib/validations";
import { addWaitlistEntry, FirebaseNotConfiguredError, isFirebaseConfigured } from "@/lib/firebase";
import { cn } from "@/lib/utils";

export function WaitlistSection() {
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { platform: "iphone" },
  });

  async function onSubmit(values: WaitlistFormValues) {
    setErrorMessage(null);
    try {
      await addWaitlistEntry(values);
      setSubmitState("success");
    } catch (err) {
      if (err instanceof FirebaseNotConfiguredError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Something went wrong. Please try again in a moment.");
        console.error("Waitlist submission failed:", err);
      }
      setSubmitState("error");
    }
  }

  return (
    <section id="waitlist" className="relative overflow-hidden py-24 sm:py-32">
      <GradientBlob variant="primary" className="left-[-10%] bottom-0 h-96 w-96" />
      <GradientBlob variant="accent" className="right-[-10%] top-0 h-80 w-80" animationClass="animate-float" />

      <div className="relative mx-auto max-w-xl px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Be Among the First
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Join the waitlist for early access, founder pricing, and a say in what we build next.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <Card className="overflow-hidden p-6 sm:p-8">
            {!isFirebaseConfigured() && (
              <p className="mb-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-200/80">
                Firebase isn’t configured yet — add your project credentials to{" "}
                <code className="rounded bg-black/30 px-1 py-0.5">.env.local</code> to enable real
                submissions. See <code className="rounded bg-black/30 px-1 py-0.5">.env.local.example</code>.
              </p>
            )}

            <AnimatePresence mode="wait">
              {submitState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success"
                  >
                    <Check className="h-8 w-8" strokeWidth={2.5} />
                  </motion.span>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">You’re on the list!</h3>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    We’ll email you the moment early access opens. Thanks for being here first.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                >
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Jordan Rivera"
                      hasError={!!errors.name}
                      {...register("name")}
                    />
                    <FieldError message={errors.name?.message} />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@email.com"
                      hasError={!!errors.email}
                      {...register("email")}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>

                  <div>
                    <Label htmlFor="goal">Fitness Goal</Label>
                    <Controller
                      control={control}
                      name="goal"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="goal" hasError={!!errors.goal}>
                            <SelectValue placeholder="Choose a goal" />
                          </SelectTrigger>
                          <SelectContent>
                            {FITNESS_GOALS.map((goal) => (
                              <SelectItem key={goal.value} value={goal.value}>
                                {goal.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldError message={errors.goal?.message} />
                  </div>

                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Controller
                      control={control}
                      name="platform"
                      render={({ field }) => (
                        <div id="platform" className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Platform">
                          {PLATFORMS.map((platform) => (
                            <button
                              key={platform.value}
                              type="button"
                              role="radio"
                              aria-checked={field.value === platform.value}
                              onClick={() => field.onChange(platform.value)}
                              className={cn(
                                "focus-ring flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-all duration-200",
                                field.value === platform.value
                                  ? "border-accent/50 bg-accent/10 text-accent"
                                  : "border-border/15 bg-card/60 text-muted-foreground hover:text-foreground"
                              )}
                            >
                              <Smartphone className="h-4 w-4" />
                              {platform.label}
                            </button>
                          ))}
                        </div>
                      )}
                    />
                    <FieldError message={errors.platform?.message} />
                  </div>

                  <div>
                    <Controller
                      control={control}
                      name="updates"
                      render={({ field }) => (
                        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
                          <Checkbox
                            checked={field.value === true}
                            onCheckedChange={(checked) => field.onChange(checked === true)}
                          />
                          I agree to receive updates about MacroTrack.
                        </label>
                      )}
                    />
                    <FieldError message={errors.updates?.message} />
                  </div>

                  {submitState === "error" && errorMessage && (
                    <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-xs text-red-300">
                      {errorMessage}
                    </p>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Joining…
                      </>
                    ) : (
                      "Join Waitlist"
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
