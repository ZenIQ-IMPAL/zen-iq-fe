import * as React from "react";
import { cn } from "@/lib/utils";  

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "relative block w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className 
      )}
      {...props}  
    />
  );
}

export { Input };
