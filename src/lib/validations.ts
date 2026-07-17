import { z } from "zod";

export const FITNESS_GOALS = [
  { value: "lose-fat", label: "Lose Fat" },
  { value: "build-muscle", label: "Build Muscle" },
  { value: "improve-endurance", label: "Improve Endurance" },
  { value: "general-health", label: "General Health" },
] as const;

export const PLATFORMS = [
  { value: "iphone", label: "iPhone" },
  { value: "android", label: "Android" },
] as const;

export const waitlistSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(80, "That name looks too long."),
  email: z.string().trim().min(1, "Enter your email.").email("Enter a valid email address."),
  goal: z.enum(
    FITNESS_GOALS.map((g) => g.value) as [string, ...string[]],
    { errorMap: () => ({ message: "Choose the goal closest to yours." }) }
  ),
  platform: z.enum(
    PLATFORMS.map((p) => p.value) as [string, ...string[]],
    { errorMap: () => ({ message: "Choose your platform." }) }
  ),
  updates: z.literal(true, {
    errorMap: () => ({ message: "You'll need to agree to receive updates to join." }),
  }),
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;
