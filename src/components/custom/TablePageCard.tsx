import { COLORS } from "@/constant/colors";
import { cn } from "../../lib/utils";
import React from "react";
import { IconType } from "./CustomInputField";
import { Button } from "../ui/button";

type TProps = {
	heading: string;
	subHeading: string;
	buttontitle: string;
	icon: IconType;
	onClick: () => void;
};

const TablePageCard = ({
	heading,
	buttontitle,
	subHeading,
	icon: Icon,
	onClick,
}: TProps) => {
	return (
		<div
			className={cn(
				"w-full min-h-[95px] rounded-[12px] p-6 bg-primary-800 gap-6 flex flex-col lg:flex-row items-center border border-russian-violet-400 ",
			)}
		>
			<div className='flex justify-center items-center size-10 bg-primary-900 border border-primary-500 rounded-full overflow-hidden'>
				<Icon className='w-6 h-6' color={COLORS.colorPallet.primary[100]} />
			</div>

			<div className='flex flex-col flex-1 items-center lg:items-start'>
				<span className='text-[18px] text-white font-semibold leading-[26px] text-center lg:text-start'>
					{heading}
				</span>
				<span className='font-normal text-xs leading-[18px] text-white text-center lg:text-start'>
					{subHeading}
				</span>
			</div>

			<Button
				variant='secondary'
				className='bg-primary-900 border border-primary-500 rounded-[8px] h-[44px]  py-3 px-4 text-sm font-semibold text-white'
				onClick={onClick}
			>
				{buttontitle}
			</Button>
		</div>
	);
};

export default TablePageCard;
