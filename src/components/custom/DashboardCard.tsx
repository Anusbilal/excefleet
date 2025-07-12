import { COLORS } from "@/constant/colors";
import { cn } from "../../lib/utils";
import React from "react";
import { IconType } from "./CustomInputField";
import { Button } from "../ui/button";

type TProps = {
	heading: string;
	subHeading: string;
	buttontitle: string;
	className?: string;
	icon: IconType;
	onClick?: () => void;
};

const DashboardCard = ({
	heading,
	buttontitle,
	subHeading,
	className,
	icon: Icon,
	onClick,
}: TProps) => {
	return (
		<div className={cn("w-full min-h-[272px] rounded-[12px] p-6", className)}>
			<div className=' gap-2 flex flex-col max-w-[220px]'>
				<Icon className='w-10 h-10' color={COLORS.colorPallet.neutral[1000]} />

				<span className='text-[26px] text-neutral-1000 font-bold leading-8'>
					{heading}
				</span>
				<span className='font-normal text-xs leading-[18px] text-neutral-900'>
					{subHeading}
				</span>

				<Button
					variant='secondary'
					className='mt-2 max-w-[159px]'
					size='xs'
					onClick={onClick}
				>
					{buttontitle}
				</Button>
			</div>
		</div>
	);
};

export default DashboardCard;
