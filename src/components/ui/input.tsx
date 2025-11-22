import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", errorMessage, ...props }, ref) => {
    const hasError = !!errorMessage;

    return (
      <div className="w-full">
        <input
          type={type}
          ref={ref}
          className={cn(
            "relative block w-full appearance-none rounded-lg border bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm dark:bg-gray-800 dark:text-white",
            "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            hasError
              ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
              : "border-gray-300 focus:border-blue-500 focus-visible:border-blue-500 dark:border-gray-700",
            className
          )}
          aria-invalid={hasError}
          {...props}
        />
        {hasError && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
