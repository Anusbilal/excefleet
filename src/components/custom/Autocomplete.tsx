"use client";
import { CheckIcon } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { IconType } from "./CustomInputField";
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
	className?: string;
	iconClassName?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
	icon: IconType;
	disabled?: boolean;
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
	className,
	iconClassName,
}: Props<T>) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const filteredData = useMemo(() => {
		if (!value) {
			return data;
		} else {
			return data?.filter((item) =>
				item?.name?.toLowerCase().includes(value.toLowerCase()),
			);
		}
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
		<div
			ref={containerRef}
			className={cn(" relative bg-white min-h-[56px] w-full", className)}
		>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				disabled={disabled}
				className='flex items-center justify-between cursor-pointer w-full text-default-90 disabled:text-default-70/[.38]  pl-4 pr-3 py-1 rounded-[4px] min-h-[56px] h-full border-default-20 disabled:border-default-70/10 border'
			>
				<input
					placeholder={placeholder}
					name='filter'
					disabled={disabled}
					value={selected?.name || value}
					onChange={onChange}
					className='focus:outline-none  text-sm font-normal leading-5 text-default-90 disabled:text-default-70/[.38] disabled:placeholder:text-default-70/[.38] placeholder:text-default-90 w-full'
				/>

				<Icon
					className={cn("size-6  rotate-90", iconClassName)}
					aria-disabled={disabled}
				/>
			</button>

			{isOpen && (
				<div className='flex flex-col items-start shadow-[0px_16px_32px_-4px_#0C0C0D1A] bg-white absolute p-3 gap-3 z-10 top-[57px] overflow-x-hidden overflow-y-auto rounded-[8px] border border-background-disabled w-full max-h-[175px]'>
					{filteredData!?.length > 0 ? (
						filteredData?.map((item, index: number) => {
							return (
								<div
									key={index}
									className='flex items-center justify-between w-full cursor-pointer '
									onClick={() => {
										setIsOpen(false);
										handleSelect!(item);
									}}
								>
									<span className='font-inter font-normal text-sm text-neutral-800'>
										{item?.name}
									</span>
									{selected?.id === item?.id && (
										<CheckIcon className='size-4' />
									)}
								</div>
							);
						})
					) : (
						<span className='font-inter font-normal text-sm text-neutral-800'>
							No options
						</span>
					)}
				</div>
			)}
		</div>
	);
};

export default Autocomplete;
