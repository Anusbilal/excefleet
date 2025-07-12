import React from "react";
import CardContainer from "./CardContainer";
import Image from "next/image";
import { SuccessfullImage } from "@/assets/images";
import { Button } from "../ui/button";

type TProps = {
	heading: string;
	children: React.ReactNode;
	secondaryButtonText?: string;
	primaryButtonText?: string;
	onSecondaryButtonClick?: () => void;
	onPrimaryButtonClick?: () => void;
};

const SuccessfullCard = ({
	heading,
	children,
	onPrimaryButtonClick,
	onSecondaryButtonClick,
	primaryButtonText,
	secondaryButtonText,
}: TProps) => {
	return (
		<CardContainer className='gap-10 py-16 px-6 justify-center items-center'>
			<div className='flex flex-col gap-[15px] justify-center items-center max-w-[500px]'>
				<Image
					src={SuccessfullImage}
					alt='SuccessfullImage'
					width={124}
					height={124}
					priority
				/>

				<div className='flex flex-col gap-4 justify-center items-center'>
					<span className='text-[22px] leading-[33px] font-bold text-neutral-1000 text-center'>
						{heading}
					</span>
					{children}
				</div>
			</div>

			<div className='flex flex-col lg:flex-row gap-6 w-full justify-center items-start'>
				{secondaryButtonText && (
					<Button
						onClick={onSecondaryButtonClick}
						variant='outline'
						size='sm'
						className='lg:max-w-[350px] w-full lg:w-[45%] p-6'
					>
						{secondaryButtonText}
					</Button>
				)}
				<Button
					onClick={onPrimaryButtonClick}
					className={`lg:max-w-[350px] w-full ${
						secondaryButtonText && "lg:w-[45%]"
					}  p-6`}
				>
					{primaryButtonText}
				</Button>
			</div>
		</CardContainer>
	);
};

export default SuccessfullCard;
