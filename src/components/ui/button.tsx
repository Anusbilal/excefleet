import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap font-inter  rounded-[8px] text-base font-semibold transition-all disabled:pointer-events-none disabled:bg-background-disabled disabled:border-border-disabled disabled:border  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					"bg-russian-violet-600 text-white hover:bg-russian-violet-600/90",
				outline: "border border-primary-500 text-primary-500",
				secondary: "text-xs bg-secondary-700  text-white",
			},
			size: {
				default: "h-[54px]  has-[>svg]:px-3",
				sm: "h-[50px] has-[>svg]:px-2.5",
				xs: "h-[34px]",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
