import * as React from "react";
import { ChevronFirst, ChevronLast, MoreHorizontalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";
import { PaginationArrow } from "@/assets/svg";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			role='navigation'
			aria-label='pagination'
			data-slot='pagination'
			className={cn(className)}
			{...props}
		/>
	);
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot='pagination-content'
			className={cn("flex flex-row items-center gap-1 lg:gap-4 ", className)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
	return <li data-slot='pagination-item' {...props} />;
}

type PaginationLinkProps = {
	isActive?: boolean;
	classNameIcon?: string;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
	React.ComponentProps<"a">;

function PaginationLink({
	className,
	isActive,
	size = "default",
	...props
}: PaginationLinkProps) {
	return (
		<a
			aria-current={isActive ? "page" : undefined}
			data-slot='pagination-link'
			data-active={isActive}
			className={cn(
				buttonVariants({
					variant: isActive ? "default" : "outline",
					size,
				}),
				className,
				`${
					size === "default"
						? "size-8 border-none hover:bg-russian-violet-700  rounded-[2px]"
						: "h-[30px] w-8 rounded-[2px]"
				} font-normal text-xs ${
					isActive
						? "text-primary-20 bg-russian-violet-700 hover:bg-russian-violet-700/90"
						: "text-russian-violet-200 hover:text-primary-20 hover:bg-russian-violet-700/90 border-none"
				}`,
			)}
			{...props}
		/>
	);
}

function PaginationPrevious({
	className,
	classNameIcon,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label='Go to previous page'
			size='default'
			className={cn(className)}
			{...props}
		>
			<PaginationArrow
				color={props?.color}
				className={cn(classNameIcon)}
				width={16}
				height={16}
			/>
		</PaginationLink>
	);
}

function PaginationFirst({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label='Go to previous page'
			size='default'
			className={cn(className)}
			{...props}
		>
			<ChevronFirst color={props?.color} />
		</PaginationLink>
	);
}
function PaginationLast({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label='Go to previous page'
			size='default'
			className={cn(className)}
			{...props}
		>
			<ChevronLast color={props?.color} />
		</PaginationLink>
	);
}

function PaginationNext({
	className,
	classNameIcon,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label='Go to next page'
			size='default'
			className={cn(className)}
			{...props}
		>
			<PaginationArrow
				color={props?.color}
				className={cn(classNameIcon)}
				width={16}
				height={16}
			/>
		</PaginationLink>
	);
}

function SelectRowsPerPage({
	options,
	setPageSize,
	pageSize,
}: {
	options: number[];
	setPageSize: (newSize: number) => void;
	pageSize: number;
}) {
	return (
		<div className='flex items-center gap-4'>
			<span className='text-primary-foreground text-sm font-semibold whitespace-nowrap'>
				Showing
			</span>

			<Select
				value={String(pageSize)}
				onValueChange={(value) => setPageSize(Number(value))}
			>
				<SelectTrigger className='bg-transparent cursor-pointer rounded-[4px] text-primary-foreground text-sm font-semibold px-0 pl-4 py-2 pr-2 '>
					<SelectValue>{String(pageSize)}</SelectValue>
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option} value={String(option)}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden
			data-slot='pagination-ellipsis'
			className={cn("flex size-9 items-center justify-center", className)}
			{...props}
		>
			<MoreHorizontalIcon className='size-4' />
			<span className='sr-only'>More pages</span>
		</span>
	);
}

export {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationFirst,
	PaginationLast,
	SelectRowsPerPage,
	PaginationEllipsis,
};
