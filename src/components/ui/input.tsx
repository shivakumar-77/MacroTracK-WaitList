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
          "h-14 w-full rounded-xl border bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200",
          hasError
            ? "border-red-300 focus-visible:ring-2 focus-visible:ring-red-200"
            : "border-border focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
