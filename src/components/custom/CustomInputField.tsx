import { cn } from "@/lib/utils";
import React, { SVGProps } from "react";
import { Input } from "../ui/input";

import { LucideIcon } from "lucide-react";

export type IconType = LucideIcon | React.FC<SVGProps<SVGSVGElement>>;

type TProps = React.ComponentProps<"input"> & {
	className?: string;
	inputClassName?: string;
	preIcon?: IconType;
	postIcon?: IconType;
	placeholder?: string;
	preIconClassName?: string;
	onViewPassword?: () => void;
};

const CustomInputField = ({
	className,
	preIcon: PreIcon,
	postIcon: PostIcon,
	placeholder,
	onViewPassword,
	inputClassName,
	preIconClassName,
	...props
}: TProps) => {
	return (
		<div className={cn("relative w-full", className)}>
			{PreIcon && (
				<PreIcon
					className={cn(
						"absolute left-3 top-1/2 size-5 -translate-y-1/2",
						preIconClassName,
					)}
				/>
			)}
			<Input
				placeholder={placeholder}
				autoComplete='on'
				{...props}
				className={cn(inputClassName)}
			/>

			{PostIcon && (
				<PostIcon
					className='absolute right-3 top-1/2 size-6 -translate-y-1/2 cursor-pointer'
					onClick={onViewPassword}
					width={24}
					height={24}
				/>
			)}
		</div>
	);
};

export default CustomInputField;
