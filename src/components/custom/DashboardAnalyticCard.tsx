import { PercentageArrow } from "@/assets/svg";
import { COLORS } from "@/constant/colors";
import { cn } from "@/lib/utils";
import React from "react";

type TProps = {
	heading: string;
	subHeading: string;
	percentage: string;
	className?: string;
};

const DashboardAnalyticCard = ({
	heading,
	percentage,
	subHeading,
	className,
}: TProps) => {
	return (
		<div
			className={cn(
				"w-full h-[125px] rounded-[12px] shadow-[0px_1px_4px_0px_#0C0C0D0D] p-6 gap-2 flex flex-col",
				className,
			)}
		>
			<span className='text-sm text-black font-normal '>{heading}</span>

			<div className='flex justify-between items-center '>
				<span className='font-bold text-[38px] text-neutral-1000'>
					{subHeading}
				</span>

				<div className='flex items-center gap-2'>
					<span className='text-xs font-normal font-inter text-black'>
						{percentage}
					</span>
					<PercentageArrow color={COLORS.black} />
				</div>
			</div>
		</div>
	);
};

export default DashboardAnalyticCard;
