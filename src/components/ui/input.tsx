import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "focus-ring h-12 w-full rounded-xl border bg-card/60 px-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors duration-200",
          hasError ? "border-red-500/60" : "border-border/15 focus-visible:border-accent/60",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
