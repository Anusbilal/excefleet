"use client";

import { CheckIcon } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type TAutocomplete = {
	id: string;
	name: string;
};

interface Props<T> {
	data?: T[];
	selected?: T;
	handleSelect?: (item: T) => void;
	placeholder: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	disabled?: boolean;
	errorMessage?: string;
	className?: string;
	iconClassName?: string;
}

const Autocomplete = <T extends TAutocomplete>({
	data,
	selected,
	handleSelect,
	placeholder,
	value,
	onChange,
	icon: Icon,
	disabled,
	errorMessage,
	className,
	iconClassName,
}: Props<T>) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const filteredData = useMemo(() => {
		if (!value) return data;
		return data?.filter((item) =>
			item?.name?.toLowerCase().includes(value.toLowerCase()),
		);
	}, [data, value]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		window.addEventListener("click", handleClickOutside);
		return () => window.removeEventListener("click", handleClickOutside);
	}, [isOpen]);

	return (
		<div className={cn("w-full", className)}>
			<div ref={containerRef} className='relative'>
				<input
					id={placeholder}
					name={placeholder}
					disabled={disabled}
					value={selected?.name ?? value ?? ""}
					onChange={onChange}
					onFocus={() => setIsOpen(true)}
					placeholder=' '
					className={cn(
						"pl-4 pr-10 py-1 appearance-none dark:text-white disabled:text-default-70/[.38]",
						"peer border flex h-14 w-full rounded-[4px] font-roboto bg-transparent text-[16px] transition-[color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-default-70/10 disabled:placeholder:text-default-70/[.38]",
						errorMessage
							? "text-destructive border-destructive focus:border-destructive"
							: "text-default-70 border-input focus:border-input dark:border-input dark:focus:border-input",
					)}
				/>

				{/* Floating Label */}
				<label
					htmlFor={placeholder}
					className={cn(
						"absolute text-sm peer-disabled:text-default-70/[.38]",
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
					)}
				>
					{placeholder}
				</label>

				{/* Toggle Icon */}
				<button
					type='button'
					onClick={() => setIsOpen((prev) => !prev)}
					disabled={disabled}
					aria-label='Toggle options'
					className='absolute top-0 bottom-0 end-2  cursor-pointer flex items-center justify-center disabled:text-default-70/[.38] text-default-90'
				>
					<Icon
						className={cn(
							"size-6 transition-transform rotate-90 duration-300",
							isOpen && "rotate-270",
							iconClassName,
						)}
						aria-hidden='true'
					/>
				</button>

				{/* Dropdown */}
				{isOpen && (
					<div className='absolute top-[57px] z-10 w-full max-h-[175px] overflow-y-auto rounded-[8px] border border-background-disabled bg-white p-3 shadow-[0px_16px_32px_-4px_#0C0C0D1A] flex flex-col gap-3'>
						{filteredData && filteredData.length > 0 ? (
							filteredData.map((item, index) => (
								<div
									key={index}
									className='flex items-center justify-between w-full cursor-pointer hover:bg-neutral-100 px-2 py-1 rounded'
									onClick={() => {
										setIsOpen(false);
										handleSelect?.(item);
									}}
								>
									<span className='font-inter font-normal text-sm text-neutral-800'>
										{item.name}
									</span>
									{selected?.id === item.id && <CheckIcon className='size-4' />}
								</div>
							))
						) : (
							<span className='font-inter font-normal text-sm text-neutral-800'>
								No options
							</span>
						)}
					</div>
				)}
			</div>

			{/* Error message */}
			{errorMessage && (
				<p className='mt-2 text-xs text-red-600 dark:text-red-400'>
					{errorMessage}
				</p>
			)}
		</div>
	);
};

export default Autocomplete;
