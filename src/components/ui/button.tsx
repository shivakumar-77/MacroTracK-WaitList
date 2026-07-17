import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-300 ease-premium disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-glow-primary hover:scale-[1.04] hover:shadow-[0_14px_30px_-8px_rgb(var(--primary)/0.55)] active:scale-100",
        secondary:
          "border border-border bg-white text-foreground shadow-card hover:scale-[1.03] hover:bg-gray-50 active:scale-100",
        outline:
          "border border-border bg-transparent text-foreground hover:scale-[1.03] hover:bg-gray-50 active:scale-100",
        ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-gray-100",
        link: "bg-transparent text-primary underline-offset-4 hover:underline p-0",
      },
      size: {
        default: "h-12 px-6 text-sm",
        sm: "h-10 px-4 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
