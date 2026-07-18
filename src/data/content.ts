export type Feature = {
  icon: "Flame" | "Dumbbell" | "Droplets" | "BrainCircuit" | "TrendingUp" | "UtensilsCrossed" | "CalendarDays" | "BarChart3";
  title: string;
  description: string;
};

export const FEATURES: Feature[] = [
  {
    icon: "Flame",
    title: "AI Calorie Tracking",
    description: "Log a meal in seconds and let AI estimate calories and macros from what you type or photograph.",
  },
  {
    icon: "Dumbbell",
    title: "Workout Tracking",
    description: "Log sets, reps, and weight, and watch your lifts trend up over weeks instead of relying on memory.",
  },
  {
    icon: "Droplets",
    title: "Water Tracking",
    description: "Tap to log a glass and see your daily intake fill up against a target built around your body.",
  },
  {
    icon: "BrainCircuit",
    title: "AI Coach",
    description: "A coach that actually reads your logs and tells you what to adjust this week, not generic advice.",
  },
  {
    icon: "TrendingUp",
    title: "Body Progress",
    description: "Weight, measurements, and progress photos, lined up on one timeline so trends are impossible to miss.",
  },
  {
    icon: "UtensilsCrossed",
    title: "Meal Planning",
    description: "Personalized meal plans built around your goal, your macros, and the food you actually like eating.",
  },
  {
    icon: "CalendarDays",
    title: "Workout Plans",
    description: "Structured training plans that adapt as you get stronger, so you're never guessing what's next.",
  },
  {
    icon: "BarChart3",
    title: "Smart Analytics",
    description: "Clear charts on adherence, trends, and consistency — the numbers that actually predict progress.",
  },
];

export type TimelineItem = {
  icon: "Layers" | "Sparkles" | "LayoutDashboard" | "Repeat" | "ShieldCheck";
  title: string;
  description: string;
};

export const WHY_MACROTRACK: TimelineItem[] = [
  {
    icon: "Layers",
    title: "Everything in one app",
    description: "Calories, workouts, water, supplements, and progress photos — no more switching between five different trackers.",
  },
  {
    icon: "Sparkles",
    title: "AI insights that matter",
    description: "Your AI Coach reads your actual logs and flags what's working and what's quietly stalling your progress.",
  },
  {
    icon: "LayoutDashboard",
    title: "A dashboard you'll enjoy opening",
    description: "Clean, fast, and designed to make checking in feel good instead of feeling like a chore.",
  },
  {
    icon: "Repeat",
    title: "Built for consistency",
    description: "Small nudges and streaks that keep you logging on the days you don't feel like it — no guilt, just momentum.",
  },
  {
    icon: "ShieldCheck",
    title: "Privacy focused",
    description: "Your data trains your own insights, not a public feed. Nothing is shared unless you choose to share it.",
  },
];

export type Platform = {
  name: string;
  icon: "Apple" | "Smartphone" | "Globe" | "Watch";
};

export const PLATFORMS_COMING_SOON: Platform[] = [
  { name: "iOS", icon: "Apple" },
  { name: "Android", icon: "Smartphone" },
  { name: "Web", icon: "Globe" },
  { name: "Wearables", icon: "Watch" },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ: FaqItem[] = [
  {
    question: "When will MacroTrack launch?",
    answer:
      "We're finishing the core app now. Waitlist members get first access when the beta opens, with a public launch date announced closer to release — join the list and you'll hear about both before anyone else.",
  },
  {
    question: "Will it be free?",
    answer:
      "Yes. MacroTrack has a free tier that covers calorie, macro, workout, and water tracking. A Pro plan will unlock the AI Coach, advanced analytics, and personalized meal and workout plans.",
  },
  {
    question: "Android or iPhone?",
    answer:
      "Both. MacroTrack is being built for iOS and Android from day one, alongside a web dashboard, so switching phones won't mean losing your history.",
  },
  {
    question: "How does the AI actually work?",
    answer:
      "The AI Coach looks at what you actually log — meals, workouts, water, and trends over time — and turns that into specific, plain-language suggestions instead of generic tips that ignore your data.",
  },
];

/**
 * Founder details. Name inferred from the "Made with ❤️ by Shiva Kumar"
 * footer credit — update directly if that's not accurate, and swap in
 * real LinkedIn/Instagram URLs when ready (left as "#" placeholders
 * rather than fabricated links).
 */
export const FOUNDER = {
  name: "Shiva Kumar",
  role: "Founder & CEO",
  bio: "Building the fitness app I always wished existed—one place to track workouts, nutrition, progress, and AI coaching.",
  linkedinUrl: "#",
  instagramUrl: "#",
};
