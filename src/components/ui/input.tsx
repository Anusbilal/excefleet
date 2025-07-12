import * as React from "react";

import { cn } from "../../lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot='input'
			className={cn(
				"file:text-foreground placeholder:text-foreground pl-4 pr-3 py-1 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-14 w-full min-w-0 rounded-[4px] text-foreground border bg-transparent  text-sm  transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed  disabled:text-default-70/[.38] disabled:border-default-70/10 disabled:placeholder:text-default-70/[.38]",
				"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
