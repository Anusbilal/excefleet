import { cn } from "@/lib/utils";
import React from "react";

type TProps = {
	children: React.ReactNode;
	className?: string;
};

const CardContainer = ({ children, className }: TProps) => {
	return (
		<div
			className={cn(
				"w-full flex flex-col bg-white border border-neutral-200 shadow-[0px_16px_32px_-4px_#0C0C0D1A] rounded-[8px]  py-8 px-6",
				className,
			)}
		>
			{children}
		</div>
	);
};

export default CardContainer;
