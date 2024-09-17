import { forwardRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor?: string;
  children?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, required, htmlFor, children, disabled, ...props }, ref) => {
    
    return (
      <label 
        htmlFor={htmlFor}
        className={cn(
          "flex items-center gap-2 h-9 w-full rounded-md border border-input bg-transparent px-2 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          (required ? 'border-l-4 border-l-primary pl-2' : 'pl-3'),
          (disabled ? 'opacity-50' : ''),
          className
        )}
      >
        <input
          type={type}
          ref={ref}
          className="w-full h-full border-0 outline-none bg-transparent border-hidden"
          disabled={disabled}
          {...props}
        />
        {children }
      </label>
    )
  }
)
Input.displayName = "Input"

export { Input };

