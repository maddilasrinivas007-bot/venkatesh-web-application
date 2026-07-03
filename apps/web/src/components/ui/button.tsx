import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-judiciary hover:bg-navy hover:shadow-judiciary-lg',
        secondary:
          'bg-secondary text-secondary-foreground shadow-judiciary hover:bg-secondary/90',
        outline:
          'border-2 border-primary/30 bg-transparent text-navy dark:text-foreground hover:bg-primary/5 hover:border-primary',
        ghost:
          'text-foreground hover:bg-muted hover:text-navy dark:hover:text-white',
        gradient:
          'gradient-primary text-white shadow-judiciary-lg hover:opacity-95 hover:shadow-judiciary',
        accent:
          'gradient-gold text-white shadow-gold hover:opacity-95',
        premium:
          'gradient-gold text-white shadow-gold hover:opacity-95 font-semibold',
        navy:
          'bg-navy text-white shadow-judiciary hover:bg-navy/90',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-lg px-4',
        lg: 'h-13 rounded-xl px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
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
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
