import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        " outline-none flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm ring-offset-background file:border-0 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
