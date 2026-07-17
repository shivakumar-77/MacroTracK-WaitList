import { Bot, Check, Dumbbell, Flame, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type ScreenId = "dashboard" | "nutrition" | "workout" | "coach";

export const SCREEN_LABELS: Record<ScreenId, string> = {
  dashboard: "Today",
  nutrition: "Nutrition",
  workout: "Workout",
  coach: "AI Coach",
};

function CalorieRing({ percent }: { percent: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
      <circle cx="50" cy="50" r={radius} strokeWidth="8" className="fill-none stroke-card" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        strokeWidth="8"
        strokeLinecap="round"
        className="fill-none stroke-accent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
}

function MacroBar({ label, value, percent, tone }: { label: string; value: string; percent: number; tone: "accent" | "muted" | "dim" }) {
  const toneClass =
    tone === "accent" ? "bg-accent" : tone === "muted" ? "bg-secondary/70" : "bg-muted-foreground/40";
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-card">
        <div className={cn("h-full rounded-full", toneClass)} style={{ width: `${percent}%` }} />
      </div>
      <span className="w-10 text-right text-[10px] text-muted-foreground">{value}</span>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="flex h-full flex-col gap-4 px-4 pb-6 pt-11">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Tuesday, Jun 24</p>
        <p className="text-sm font-semibold text-foreground">Good morning, Alex</p>
      </div>

      <div className="glass flex items-center gap-4 rounded-2xl p-3">
        <CalorieRing percent={73} />
        <div>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Calories</p>
          <p className="text-lg font-bold text-foreground">
            1,540 <span className="text-xs font-normal text-muted-foreground">/ 2,100</span>
          </p>
          <div className="mt-1 flex items-center gap-1 text-[10px] text-accent">
            <Flame className="h-3 w-3" /> On track
          </div>
        </div>
      </div>

      <div className="glass space-y-2 rounded-2xl p-3">
        <MacroBar label="Protein" value="150g" percent={83} tone="accent" />
        <MacroBar label="Carbs" value="165g" percent={75} tone="muted" />
        <MacroBar label="Fat" value="48g" percent={68} tone="dim" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-2xl p-3">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Water</p>
          <p className="mt-1 text-sm font-semibold text-foreground">5 / 8 glasses</p>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-3 w-2 rounded-b-full rounded-t-sm",
                  i < 5 ? "bg-accent" : "bg-card"
                )}
              />
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-3">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Workout</p>
          <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-foreground">
            <Check className="h-3.5 w-3.5 text-success" /> Push day
          </p>
          <p className="mt-2 text-[10px] text-muted-foreground">Creatine · Vitamin D taken</p>
        </div>
      </div>
    </div>
  );
}

function NutritionScreen() {
  const meals = [
    { name: "Breakfast", items: "Oats, whey, banana", kcal: 420 },
    { name: "Lunch", items: "Chicken, rice, greens", kcal: 610 },
    { name: "Snack", items: "Greek yogurt, almonds", kcal: 260 },
    { name: "Dinner", items: "Paneer, roti, dal", kcal: 250 },
  ];
  return (
    <div className="flex h-full flex-col gap-3 px-4 pb-6 pt-11">
      <p className="text-sm font-semibold text-foreground">Nutrition Log</p>
      <div className="glass space-y-2 rounded-2xl p-3">
        <MacroBar label="Protein" value="150g" percent={83} tone="accent" />
        <MacroBar label="Carbs" value="165g" percent={75} tone="muted" />
        <MacroBar label="Fat" value="48g" percent={68} tone="dim" />
      </div>
      <div className="space-y-2">
        {meals.map((meal) => (
          <div key={meal.name} className="glass flex items-center justify-between rounded-2xl p-3">
            <div>
              <p className="text-xs font-semibold text-foreground">{meal.name}</p>
              <p className="text-[10px] text-muted-foreground">{meal.items}</p>
            </div>
            <span className="text-xs font-medium text-accent">{meal.kcal} kcal</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkoutScreen() {
  const exercises = [
    { name: "Bench Press", sets: "4 × 8 @ 80kg", done: true },
    { name: "Incline DB Press", sets: "3 × 10 @ 26kg", done: true },
    { name: "Shoulder Press", sets: "3 × 10 @ 40kg", done: true },
    { name: "Tricep Pushdown", sets: "3 × 12 @ 32kg", done: false },
  ];
  return (
    <div className="flex h-full flex-col gap-3 px-4 pb-6 pt-11">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">Push Day</p>
        <span className="flex items-center gap-1 text-[10px] text-accent">
          <Dumbbell className="h-3 w-3" /> 45 min
        </span>
      </div>
      <div className="space-y-2">
        {exercises.map((ex) => (
          <div key={ex.name} className="glass flex items-center justify-between rounded-2xl p-3">
            <div>
              <p className="text-xs font-semibold text-foreground">{ex.name}</p>
              <p className="text-[10px] text-muted-foreground">{ex.sets}</p>
            </div>
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full",
                ex.done ? "bg-success text-background" : "border border-border/20 text-transparent"
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoachScreen() {
  return (
    <div className="flex h-full flex-col gap-3 px-4 pb-6 pt-11">
      <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <Bot className="h-4 w-4 text-accent" /> AI Coach
      </p>
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        <div className="glass max-w-[85%] rounded-2xl rounded-tl-sm p-2.5 text-[11px] leading-relaxed text-foreground">
          Your protein’s been under target 4 days straight — add ~25g at dinner and you’ll hit it.
        </div>
        <div className="ml-auto max-w-[75%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-primary to-secondary p-2.5 text-[11px] text-white">
          What should I add?
        </div>
        <div className="glass max-w-[85%] rounded-2xl rounded-tl-sm p-2.5 text-[11px] leading-relaxed text-foreground">
          Greek yogurt or a scoop of whey both work with tonight’s dal and roti.
        </div>
        <div className="glass mt-auto flex items-center gap-2 rounded-full px-3 py-2">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="flex-1 text-[10px] text-muted-foreground">Ask your coach…</span>
          <Send className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

export function DashboardPreview({ screen }: { screen: ScreenId }) {
  switch (screen) {
    case "nutrition":
      return <NutritionScreen />;
    case "workout":
      return <WorkoutScreen />;
    case "coach":
      return <CoachScreen />;
    case "dashboard":
    default:
      return <DashboardScreen />;
  }
}
