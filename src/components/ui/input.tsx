import * as React from "react";

import { cn } from "@/lib/utils";
import { boolean } from "zod";

function Input({
	className,
	type,
	placeholder,
	errorMessage,
	disabled,
	name,
	...props
}: React.ComponentProps<"input"> & { errorMessage?: string }) {
	return (
		<div>
			<div className='relative'>
				<input
					data-slot='input'
					type={type}
					className={cn(
						"pl-4 pr-3 py-1 appearance-none dark:text-white disabled:text-default-70/[.38]",
						"peer border flex h-14 w-full min-w-0 rounded-[4px] font-roboto bg-transparent text-[16px] transition-[color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-default-70/10 disabled:placeholder:text-default-70/[.38]",

						Boolean(errorMessage)
							? "text-destructive border-destructive focus:border-destructive"
							: "text-default-70 border-input focus:border-input dark:border-input dark:focus:border-input",

						className,
					)}
					placeholder=' '
					{...props}
					disabled={disabled}
					name={name}
					id={name}
				/>
				<label
					htmlFor={name}
					className={cn(
						"absolute text-sm font-normal peer-disabled:text-default-70/[.38]",
						"duration-300 transform z-[2px] origin-[0] bg-transparent",
						"top-1/2 -translate-y-1/2 start-4",
						"peer-focus:bg-russian-violet-20 peer-focus:text-[12px] peer-focus:font-roboto peer-focus:px-1",
						"peer-[&:not(:placeholder-shown)]:bg-russian-violet-20 peer-[&:not(:placeholder-shown)]:font-roboto peer-[&:not(:placeholder-shown)]:text-[12px] peer-[&:not(:placeholder-shown)]:px-1",
						"peer-focus:-translate-y-4 peer-focus:start-3  peer-focus:top-2 peer-focus:scale-75",
						"peer-[&:not(:placeholder-shown)]:-translate-y-4 peer-[&:not(:placeholder-shown)]:start-3 peer-[&:not(:placeholder-shown)]:top-2  peer-[&:not(:placeholder-shown)]:scale-75",
						errorMessage
							? [
									"text-destructive",
									"peer-focus:text-destructive",
									"peer-[&:not(:placeholder-shown)]:text-destructive",
							  ]
							: [
									"text-default-90",
									"peer-focus:text-default-90",
									"peer-[&:not(:placeholder-shown)]:text-default-90",
							  ],
						className,
					)}
				>
					{placeholder}
				</label>
			</div>
			{errorMessage && (
				<p className='mt-2 text-xs text-red-600 dark:text-red-400'>
					{errorMessage}
				</p>
			)}
		</div>
	);
}

export { Input };
